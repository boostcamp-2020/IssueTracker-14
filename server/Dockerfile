FROM node:14

WORKDIR ./

COPY .server/package*.json ./

RUN npm install --production

COPY . . 

EXPOSE 3000
CMD ["npm", "start"]