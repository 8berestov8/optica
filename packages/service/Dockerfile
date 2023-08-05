FROM node:16-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
#RUN apt-get update && apt-get install -y libvips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/app
COPY package.json yarn.lock tsconfig.json schemas.d.ts ./
RUN yarn config set network-timeout 600000 -g && yarn install
ENV PATH /srv/app/node_modules/.bin:$PATH

#WORKDIR /srv/app
COPY ./ .
RUN chown -R node:node /srv/app
USER node
RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "develop"]
