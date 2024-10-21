# Use uma imagem oficial do Python como imagem base
FROM python:3.10-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo de requisitos para o contêiner
COPY requirements.txt /app/

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . /app/

# Copia o arquivo .env para dentro do contêiner
COPY .env /app/

# Expor a porta que o Django utilizará
EXPOSE 8000

# Comando para rodar o servidor Django no início
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
