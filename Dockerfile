FROM node:lts-alpine AS builder
USER root
WORKDIR /tmp/
RUN apk update && \
    apk add --update git && \
    apk add --update openssh
COPY ./package.json /tmp/
RUN npm config set registry https://registry.npm.taobao.org && npm install

FROM node:lts-alpine
USER root
WORKDIR /home/node

ENV NODE_ENV build

COPY --from=builder /tmp/node_modules ./node_modules

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]


# 构建镜像
# docker rmi yunle-cli/next:1.0.0 ; docker build --rm -f "Dockerfile" -t yunle-cli/next:1.0.0 .

# 删档测试
# docker run --rm -it -p 3000:3000 yunle-cli/next:1.0.0 bash

# 单独测试
# docker run --name next-demo -d -p 3000:3000 yunle-cli/next:1.0.0
