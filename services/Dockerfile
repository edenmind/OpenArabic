#docker pull python:3.9-alpine
FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 3020

CMD ["gunicorn", "tashkeel:app", "--workers=1", "--threads=1", "--bind", "0.0.0.0:3020"]

