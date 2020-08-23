FROM node:14
#app directory
WORKDIR /usr/src/app
#install
COPY package*.json ./
RUN npm install
#bundle
COPY . .
#expose port
EXPOSE 3000
#start
CMD ["npm" , "start"]