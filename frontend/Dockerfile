FROM node:16-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

COPY . /app/frontend/
EXPOSE 3200
CMD ["npm", "start"]