# Use uma imagem oficial do Python como imagem base
FROM python:3.10-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

COPY .env /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
