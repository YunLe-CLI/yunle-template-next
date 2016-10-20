# Dockerfile.latest
FROM node:latest

# Create app directory
RUN mkdir -p /www
WORKDIR /www

# Install app dependencies
# COPY package.json /www
# RUN npm install --production

# Bundle app source
COPY . /www

# Expose port
EXPOSE 8080
CMD [ "npm", "start" ]
