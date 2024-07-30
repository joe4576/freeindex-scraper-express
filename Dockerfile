FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile

FROM install AS build
COPY . .

FROM base AS prod
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/package.json ./package.json

USER bun
EXPOSE 3000
CMD ["bun", "run", "start"]