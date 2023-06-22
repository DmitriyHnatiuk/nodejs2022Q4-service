FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8080
CMD [ "yarn", "run", "build:container" ]
