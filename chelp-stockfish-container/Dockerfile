FROM ubuntu:20.04
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip
RUN apt update; apt install -qy stockfish
COPY . .
RUN pip install -r requirements.txt

ENV PATH="${PATH}:/usr/games"


WORKDIR /root
COPY . .
CMD [ "python3", "app.py" ]