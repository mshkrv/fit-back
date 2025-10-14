FROM node:20-alpine AS build-image
LABEL author="mshkrv" version="1.0"
ENV APP_HOME="/app"
WORKDIR $APP_HOME

COPY . .

RUN apk update && \
    apk add --no-cache git jq && \
    export PNPM_VERSION=$(jq -r 'engines.pnpm' package.json) && \
    corepack enable && corepack prepare --activate pnpm@$PNPM_VERSION

RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --prod --frozen-lockfile && \
    mkdir /deps && cp -R ./node_modules /deps/node_modules_prod && \
    pnpm install --frozen-lockfile --ignore-scripts && \
    apk del git && \
    pnpm build fit-gateway

FROM node:20-alpine AS prod-image
LABEL author="mshkrv" version="1.0"
ENV APP_HOME="/app"
WORKDIR $APP_HOME

RUN addgroup -g 1001 -S gateway && \
    adduser -S gateway -u 1001 -G gateway && \
    chown gateway:gateway /app

USER gateway

COPY --from=build-image --chown=gateway:gateway /deps/node_modules_prod ./node_modules
COPY --from=build-image --chown=gateway:gateway /app/dist/apps/fit-gateway .
COPY --from=build-image --chown=gateway:gateway /app/package.json .

CMD ["node", "main.js"]