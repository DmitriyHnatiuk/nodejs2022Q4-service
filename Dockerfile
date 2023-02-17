FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate 
EXPOSE 8080
RUN npm run build
CMD [ "node", "dist/main.js" ]
