FROM node:22-alpine

WORKDIR /app

COPY package.json server.js index.html ./
COPY uploads ./uploads

ENV PORT=8080
ENV DATA_DIR=/app/data

EXPOSE 8080

CMD ["npm", "start"]
