FROM ubuntu:22.04

ENV TERM linux
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y  

RUN ["/bin/bash"]

RUN apt update
RUN apt-get install -y ffmpeg libglib2.0-0 libsm6 libxrender1 libxext6
RUN apt install curl -y
RUN cd /tmp


ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"
RUN apt-get update

RUN apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b \
    && rm -f Miniconda3-latest-Linux-x86_64.sh 
RUN conda --version 



#RUN curl –sSL https://repo.anaconda.com/archive/Anaconda3-2020.02-Linux-x86_64.sh | bash
#RUN eval "$(/root/anaconda3/bin/conda shell.bash hook)"

WORKDIR /home

#RUN cd /home
COPY . .
COPY requirements.txt .
RUN conda create -n python36 python=3.6.4

RUN conda run --no-capture-output -n python36 python -m pip install -r requirements.txt 

#["conda", "run", "--no", "capture-output", "-n", "python36" "python", "-m", "pip", "install", "-r", "requirements.txt"]

CMD export LC_ALL=C.UTF-8
CMD export LC_ALL=C.UTF-8
CMD export FLASK_RUN_PORT=2500
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "python36", "python", "app.py"]

#RUN export LC_ALL=C.UTF-8
#RUN export LANG=C.UTF-8

#CMD cd /home/neural-chessbard
#CMD export FLASK_RUN_PORT=2500
#CMD python -m flask run