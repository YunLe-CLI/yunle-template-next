# Dockerfile.latest
FROM alinode/alinode-docker

# Create app directory
RUN mkdir -p /web
WORKDIR /web

# Bundle app source
COPY . /web

# Install app dependencies
# npm install -g cnpm --registry=https://registry.npm.taobao.org
# RUN npm install --production

# set app env
ENV APP_ID 3387
ENV APP_SECRET 4e0a682f5bb008f484bceba2634f1c95741c4cd7
ENV AGENTX_ERROR_LOG /web/.logs/pm2-err.log

VOLUME ["/web"]

# Expose port
EXPOSE 1337
CMD [ "npm", "start" ]
