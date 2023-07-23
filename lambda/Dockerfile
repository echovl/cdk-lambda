FROM public.ecr.aws/lambda/python:3.11

COPY requirements.txt ./

RUN python3.11 -m pip install -r requirements.txt

RUN mkdir /tmp/data

COPY fetch_models.py ./

RUN python3.11 fetch_models.py

COPY app.py whisper.py ./

CMD ["app.lambda_handler"]
