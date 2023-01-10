
import os
import subprocess
from flask import Flask, request

from prediction_to_fen import parseFen, repairFen, reverseFen
import field_crop.cv_chess
import requests
from concurrent.futures import ThreadPoolExecutor
import time

#NC_SCORE = -1
app = Flask(__name__)
app.secret_key = "206363ef77d567cc511ff5098395d2b85058952afd5e2b1eecd5aed983805e60"

session = requests.Session()

PROBABILITY_TRESHOLD=0.1


def post_url(args):
    with open("to_classify_data/"+str(args[0])+str(args[1])+".jpeg", 'rb') as f:
        image_data = f.read()
    #print("sending",args[0],args[1])
    req = session.post(url='https://northeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/55b1d1a6-2273-4f01-99bc-b1ebeb2c4f3c/classify/iterations/Iteration2/image',
                    data=image_data,
                    headers={'Prediction-Key':'6ebed8189f004ef5b22d15657b2444f0',
                            'Content-Type': 'application/octet-stream'})
    #print(req)
    return req


@app.route("/run", methods=["POST"])
def hello_world():

    file = request.files['file']
    whitePerspective = request.form['whitePerspective']

    file.save('sent_image/test.jpg')
    file.close()

    #DOCKER
    subprocess.run(["conda", "run", "-n", "python36", "python",  "main.py", "detect", "--input=sent_image/test.jpg", "--output=to_proceed/test.jpg"])
    
    #WINDOWS
    #subprocess.run(["C:/Users/PT/AppData/Local/Programs/Python/Python310/python.exe", "main.py", "detect", "--input=sent_image/test.jpg", "--output=to_proceed/test.jpg"])

    field_crop.cv_chess.crop_fields("to_proceed/test.jpg")

    columns=["A","B","C","D","E","F","G","H"]

    fen=""
    
    list_of_request_templates = []
    for row in range(8,0,-1):
        for col in columns:
                list_of_request_templates.append((str(col),str(row)))
    
    
    response_list=send_request_in_batches(list_of_request_templates)
    
    questionable_fields=[]
    for (res, i) in zip(response_list,range(1,65)):
        pred_piece_response=res.json().get('predictions')[0].get('tagName')
        #pred_piece_response2=res.json().get('predictions')[1].get('tagName')
        pred_piece_prob=res.json().get('predictions')[0].get('probability')
        pred_piece_prob2=res.json().get('predictions')[1].get('probability')

        prob_difference=abs(pred_piece_prob-pred_piece_prob2)

        #print(str(columns[int(((i-1)%8))])+str(8-(int((i-1)/8))))

        if(prob_difference<PROBABILITY_TRESHOLD or pred_piece_prob<PROBABILITY_TRESHOLD):
                questionable_field={
                    'col':str(int(((i-1)%8)+1)),
                    'row':str(8-(int((i-1)/8))),
                    'piece':str(pred_piece_response)
                }


                # questionable_fields.append(str(columns[int(((i-1)%8))])+str(8-(int((i-1)/8))))
                print("QUEST.: ",str(columns[int(((i-1)%8))])+str(8-(int((i-1)/8))))
                questionable_fields.append(questionable_field)


        print(f"{i}: {pred_piece_prob}")
        #print(f"-----{i}: {pred_piece_prob2}")
        #print(col,row,": ",pred_piece_response,res.json().get('predictions')[0].get('probability'))
        print((res, i))
        #if(pred_piece_prob<0.35):
        #    pred_piece_response='1'
        fen+=parseFen(pred_piece_response)
        if i % 8 == 0:
            fen+="/"
    fen=repairFen(fen)

    if whitePerspective!='true': fen=reverseFen(fen)

    any_errors=False

    if len(questionable_fields)>10:
        any_errors=True

    response = {
        'fen':fen,
        'any_errors': any_errors,
        'questionable_fields': questionable_fields
    }

    print(fen)

    return response,200


def send_request_in_batches(request_templates):
    list_of_request_lists = []
    batch_size=10
    for i in range(0,60,batch_size):
        with ThreadPoolExecutor(max_workers=batch_size) as pool:
            list_of_request_lists.extend(list(pool.map(post_url,request_templates[i:i+batch_size])))
        time.sleep(0.76)
        
    with ThreadPoolExecutor(max_workers=4) as pool:
        list_of_request_lists.extend(list(pool.map(post_url,request_templates[60:65])))
        
    return list_of_request_lists


if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
    