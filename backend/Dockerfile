FROM node:20-bullseye
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y openssl
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
