FROM python:slim-buster

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
ADD . /app

RUN useradd appuser && chown -R appuser /app
USER appuser

EXPOSE 5002

CMD ["gunicorn", "tashkeel:app", "--workers=1", "--threads=1", "--bind", "0.0.0.0:5002"]

