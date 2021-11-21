FROM node:16-alpine AS base

FROM base AS dev

RUN apk update && apk add --no-cache \
    postgresql-client \
    git

# Actual UID, GID on Linux if not the default 1000
ARG USERUID=1000
ARG USERGID=$USERUID

RUN deluser --remove-home node \
  && addgroup -S node -g $USERGID \
  && adduser -s /bin/sh -S -G node -u $USERUID node