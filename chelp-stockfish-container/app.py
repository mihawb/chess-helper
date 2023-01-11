from flask import Flask, request
from stockfish import Stockfish


app = Flask(__name__)

app.secret_key = "206363ef77d567ff511df5098695d2b85058952afd5e223eacd5aed98180c65"


#stockfish = Stockfish(path="C:/stockfish.exe")

@app.route("/", methods=["POST"])
def getBestMove():
    fen_raw=request.form.get('fen')
    current_side_turn = request.form.get('side') 
    stockfish = Stockfish(path="/usr/games/stockfish")

    full_fen = f"{fen_raw} {current_side_turn} - - 0 1"
    print(full_fen)
    print(stockfish.is_fen_valid(full_fen))
    stockfish.set_fen_position(full_fen)
    best_move = stockfish.get_best_move()
    evaluation = stockfish.get_evaluation()
    response = {
        "best_move": best_move,
        "evaluation": evaluation
    }
    return response,200
@app.route("/aaa", methods=["POST"])
def aaaa():
    return "aaa"
if __name__ =="__main__":
    app.run("0.0.0.0")