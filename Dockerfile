# Build lane
FROM node:10.16.0-alpine as builder

RUN apk update && apk add -q build-base python make g++ gcc

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD package.json /usr/src/app/package.json

RUN npm install --silent

ADD . /usr/src/app

RUN npm run build

# Production lane
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]