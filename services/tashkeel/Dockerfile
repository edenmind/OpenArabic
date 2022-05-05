FROM python:slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN useradd appuser && chown -R appuser /app
USER appuser

EXPOSE 5002

CMD ["gunicorn", "tashkeel:app", "--workers=1", "--threads=1", "--bind", "0.0.0.0:5002"]

