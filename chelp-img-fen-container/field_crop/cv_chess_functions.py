import math
import cv2


# Read image and do lite image processing
def read_img(file):
    img = cv2.imread(str(file))
    gray = cv2.imread(cv2.samples.findFile(file), cv2.IMREAD_GRAYSCALE)
    #gray_blur = cv2.blur(gray, (5, 5))

    # czy na pewno kwadratowe zdjecie
    if(img.shape[1]>img.shape[0]):
        img=cv2.resize(img,(img.shape[0],img.shape[0]))
    elif (img.shape[1]<img.shape[0]):
        img=cv2.resize(img,(img.shape[1],img.shape[1]))

    return img, gray
#
#
## Canny edge detection
#def canny_edge(img, sigma=0.33):
#    v = np.median(img)
#    lower = int(max(0, (1.0 - sigma) * v))
#    upper = int(min(255, (1.0 + sigma) * v))
#    edges = cv2.Canny(img, 400, 200, None, 3)
#
#    print("lower: ",lower," upper: ",upper)
#    
#
#    #edges = cv2.Canny(img, 400, 200, None, 3)
#
#    # cv2.imshow('Canny',edges)
#    # cv2.waitKey()
#
#    return edges
#
#
## Hough line detection
#def hough_line(edges, min_line_length=20, max_line_gap=30):
#    lines = cv2.HoughLines(edges, 1, np.pi / 180, 150,None,100,10)
#
#    f = open("jego_hugh.txt", "w")
#    f.write(str(lines))
#    f.close()
#
#
#    cdst = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
#    cdstP = np.copy(cdst)
#
#
#    # if lines is not None:
#    #     for i in range(0, len(lines)):
#    #         l = lines[i][0]
#    #         cv2.line(cdstP, (l[0], l[1]), (l[2], l[3]), (0,0,255), 3, cv2.LINE_AA)
#
#    lines = np.reshape(lines, (-1, 2))
#
#        
#
#    # Copy edges to the images that will display the results in BGR
#    
#    
#
#    #cv2.imshow("Hough lines",cdstP)
#    #cv2.waitKey()
#
#    return lines
#
#
## Separate line into horizontal and vertical
#def h_v_lines(lines):
#    h_lines, v_lines = [], []
#    for rho, theta in lines:
#        if theta < np.pi / 4 or theta > np.pi - np.pi / 4:
#            v_lines.append([rho, theta])
#        else:
#            h_lines.append([rho, theta])
#
#    print("h_lines: ",h_lines)
#    print("v_lines:", v_lines)
#
#    return h_lines, v_lines
#
#
## Find the intersections of the lines
#def line_intersections(h_lines, v_lines):
#    points = []
#    img = cv2.imread(cv2.samples.findFile("test_photos\\chesscom_res.jpg"), cv2.IMREAD_GRAYSCALE)
#
#    for r_h, t_h in h_lines:
#        for r_v, t_v in v_lines:
#            a = np.array([[np.cos(t_h), np.sin(t_h)], [np.cos(t_v), np.sin(t_v)]])
#            b = np.array([r_h, r_v])
#            inter_point = np.linalg.solve(a, b)
#
#            
#            x=int(inter_point[0].item())
#            y=int(inter_point[1].item())
#
#            # print("PKT: ",x)
#            # print("PKT item: ",y)
#
#            points.append(inter_point)
#            cv2.circle(img, (x,y), radius=5, color=(0, 0, 255), thickness=-1)
#
#
#    print("DL POINTS: ",len(points))
#    cv2.imshow("img with points",img)
#    cv2.waitKey()
#
#    return np.array(points)
#
#
## Hierarchical cluster (by euclidean distance) intersection points
#def cluster_points(points):
#
#    img = cv2.imread(cv2.samples.findFile("test_photos\\chesscom_res.jpg"), cv2.IMREAD_GRAYSCALE)
#
#
#    dists = spatial.distance.pdist(points)
#    single_linkage = cluster.hierarchy.single(dists)
#    flat_clusters = cluster.hierarchy.fcluster(single_linkage, 15, 'distance')
#    cluster_dict = defaultdict(list)
#    for i in range(len(flat_clusters)):
#        cluster_dict[flat_clusters[i]].append(points[i])
#    cluster_values = cluster_dict.values()
#    clusters = map(lambda arr: (np.mean(np.array(arr)[:, 0]), np.mean(np.array(arr)[:, 1])), cluster_values)
#
#    blabla=sorted(list(clusters), key=lambda k: [k[1], k[0]])
#    print("CLUSTERS:",blabla)
#    print("CLUSTERS LEN:",len(blabla))
#
#    for point in blabla:
#        x=int(point[0].item())
#        y=int(point[1].item())
#
#        # print("PKT: ",x)
#        # print("PKT item: ",y)
#
#        cv2.circle(img, (x,y), radius=5, color=(0, 0, 255), thickness=-1)
#
#
#    cv2.imshow("clusters",img)
#    cv2.waitKey()
#
#    return blabla
#
#
## Average the y value in each row and augment original points
#def augment_points(points):
#
#    img = cv2.imread(cv2.samples.findFile("test_photos\\chesscom_res.jpg"), cv2.IMREAD_GRAYSCALE)
#
#    points_shape = list(np.shape(points))
#    augmented_points = []
#
#    print("TERA PRINT ROW")
#    print(points_shape)
#
#    for row in range(int(points_shape[0] / 11)):
#
#        
#
#        start = row * 11
#        end = (row * 11) + 10
#        rw_points = points[start:end + 1]
#        rw_y = []
#        rw_x = []
#        print(row)
#        print(rw_points)
#
#
#        for point in rw_points:
#            x, y = point
#            rw_y.append(y)
#            rw_x.append(x)
#        #y_mean = mean(rw_y)
#        for i in range(len(rw_x)):
#            point = (rw_x[i], rw_y[i])
#            augmented_points.append(point)
#
#            x=int(point[0].item())
#            y=int(point[1].item())
#
#            # print("PKT: ",x)
#            # print("PKT item: ",y)
#
#            cv2.circle(img, (x,y), radius=5, color=(0, 0, 255), thickness=-1)
#
#    cv2.imshow("AUGMENTED",img)
#    cv2.waitKey()
#
#    augmented_points = sorted(augmented_points, key=lambda k: [k[1], k[0]])
#
#    print("AUG PKT LEN:",len(augmented_points))
#
#    return augmented_points
#
#
## Crop board into separate images and write to folder
#def write_crop_images(img, points, img_count=0, folder_path='./Data/raw_data/'):
#    num_list = []
#    shape = list(np.shape(points))
#    start_point = shape[0] - 14
#
#    if int(shape[0] / 11) >= 8:
#        range_num = 8
#    else:
#        range_num = int((shape[0] / 11) - 2)
#
#    for row in range(range_num):
#        start = start_point - (row * 11)
#        end = (start_point - 8) - (row * 11)
#        num_list.append(range(start, end, -1))
#
#    for row in num_list:
#
#        print("ROW",row)
#
#        for s in row:
#            # ratio_h = 2
#            # ratio_w = 1
#            base_len = math.dist(points[s], points[s + 1])
#            bot_left, bot_right = points[s], points[s + 1]
#            start_x, start_y = int(bot_left[0]), int(bot_left[1] - (base_len * 2))
#            end_x, end_y = int(bot_right[0]), int(bot_right[1])
#            if start_y < 0:
#                start_y = 0
#
#            #print(img)
#
#            cropped = img[start_y: end_y, start_x: end_x]
#
#            #print(cropped)
#
        #    img_count += 1
#            #cv2.imwrite('dane//costam'+str(img_count)+'.jpeg', cropped)
#            # print(folder_path + 'data' + str(img_count) + '.jpeg')
#
#
#            print("CROP: ",img_count)
#    print("IMG_COUNT: ",img_count)
#    return img_count


# Crop board into separate images and shows
def x_crop_images(img, points):

    print("dfzialam?")

    num_list = []
    img_list = []


    print("SIZE IMAGE szer: ", img.shape[1])
    print("SIZE IMAGE wys: ", img.shape[0])

    # ^ z tego wynika że pojedyncze pole to [img.shape[0] / 8] x [img.shape[0] / 8]


    dimension_size= img.shape[0]
    iteration_step = math.floor(img.shape[0]/8)

    cropped_items=[]

    for y in range(0,dimension_size,iteration_step):
        for x in range(0,dimension_size,iteration_step):
            to_crop = img[x:x+iteration_step , y:y+iteration_step]
            cropped_items.append(to_crop)
            if(x+iteration_step>dimension_size):
                break
        if(y+iteration_step>dimension_size):
            break
        
    fields_list=["A","B","C","D","E","F","G","H"]

    local_counter=0

    for crop in cropped_items:
        try:
            print("nr: ",local_counter)
            cv2.imwrite('to_classify_data\\'+str(fields_list[int(local_counter/8)])+str(8-(local_counter%8))+'.jpeg', crop)
        except Exception as e:
            print("Blad ze zdj nr:",local_counter)
            print(e)
        local_counter+=1

    print("===> CROPPED ITEMS <===")
    print(len(cropped_items))
        

    print("img_list_len:",len(cropped_items))
    return cropped_items

#
# Convert image from RGB to BGR
#ef convert_image_to_bgr_numpy_array(image_path, size=(224, 224)):
#   image = PIL.Image.open(image_path).resize(size)
#   img_data = np.array(image.getdata(), np.float32).reshape(*size, -1)
#   # swap R and B channels
#   img_data = np.flip(img_data, axis=2)
#   return img_data
#
#
# Adjust image into (1, 224, 224, 3)
#ef prepare_image(image_path):
#   im = convert_image_to_bgr_numpy_array(image_path)
#
#   im[:, :, 0] -= 103.939
#   im[:, :, 1] -= 116.779
#   im[:, :, 2] -= 123.68
#
#   im = np.expand_dims(im, axis=0)
#   return im
#
#
# Changes digits in text to ints
#ef atoi(text):
#   return int(text) if text.isdigit() else text
#
#
# Finds the digits in a string
#ef natural_keys(text):
#   return [atoi(c) for c in re.split('(\d+)', text)]
#
#
# Reads in the cropped images to a list
#ef grab_cell_files(folder_name='to_c'):
#   img_filename_list = []
#
#   onlyfiles = [f for f in listdir(folder_name) if isfile(join(folder_name, f))]
#
#   #print("onlyfiles:",onlyfiles)
#
#   for p in onlyfiles:
#       img_filename_list.append(folder_name+str(p))
#
#   # for path_name in glob.glob(folder_name):
#   #     print(path_name)
#   #     img_filename_list.append(path_name)
#   # img_filename_list = img_filename_list.sort(key=natural_keys)
#   #print(img_filename_list)
#   return img_filename_list
#
#
# Classifies each square and outputs the list in Forsyth-Edwards Notation (FEN)
#ef classify_cells(model, img_filename_list):
#   category_reference = {0: 'b', 1: 'k', 2: 'n', 3: 'p', 4: 'q', 5: 'r', 6: '1', 7: 'B', 8: 'K', 9: 'N', 10: 'P',
#                         11: 'Q', 12: 'R'}
#   pred_list = []
#   for filename in img_filename_list:
#       img = prepare_image(filename)
#       out = model.predict(img)
#
#       #print("OUT:",out)
#
#       test_cntr=0
#
#       # for v in out:
#       #     #print(v)
#       #     for x in v:
#       #         for z in x:
#       #             print(z)
#           # for x in v:
#           #     if x>0:
#           #         test_cntr+=1
#
#      # print(test_cntr)
#       top_pred = np.argmax(out)
#
#       print("TOPPRED: ",top_pred)
#
#       pred = category_reference[6] #top_pred
#       pred_list.append(pred)
#
#   fen = ''.join(pred_list)
#   fen = fen[::-1]
#   fen = '/'.join(fen[i:i + 8] for i in range(0, len(fen), 8))
#   sum_digits = 0
#   for i, p in enumerate(fen):
#       if p.isdigit():
#           sum_digits += 1
#       elif p.isdigit() is False and (fen[i - 1].isdigit() or i == len(fen)):
#           fen = fen[:(i - sum_digits)] + str(sum_digits) + ('D' * (sum_digits - 1)) + fen[i:]
#           sum_digits = 0
#   if sum_digits > 1:
#       fen = fen[:(len(fen) - sum_digits)] + str(sum_digits) + ('D' * (sum_digits - 1))
#   fen = fen.replace('D', '')
#   return fen
#
#
# Converts the FEN into a PNG file
#ef fen_to_image(fen):
#   #board = chess.Board(fen)
#   #current_board = chess.svg.board(board=board)
#
#   #output_file = open('current_board.svg', "w")
#   #output_file.write(current_board)
#  # output_file.close()
#
#   #svg = svg2rlg('current_board.svg')
#   #renderPM.drawToFile(svg, 'current_board.png', fmt="PNG")
#   return "board"
#