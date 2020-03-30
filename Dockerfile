FROM node:10.15.3-jessie-slim 

EXPOSE 3000

COPY package.json .
COPY index.js .
COPY public ./public
COPY routes ./routes
COPY views ./views

RUN npm install

CMD ["npm", "start"]

