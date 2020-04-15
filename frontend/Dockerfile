FROM node:13-alpine as development_build

# Get the necessary build tools
# RUN apk add build-base autoconf automake libtool pkgconfig nasm

# Add the package.json file and build the node_modules folder
WORKDIR /app
COPY package.json yarn.lock .yarnclean ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Get a clean image with gatsby-cli and the pre-built node modules
#FROM node:13-alpine as development_build

RUN npm install --global gatsby-cli && npm cache clean --force && gatsby telemetry --disable

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY . /app

# COPY --from=builder /app/node_modules /app/node_modules


# build files to serve in production
FROM development_build as production_build

RUN yarn build
