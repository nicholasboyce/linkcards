FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . .
WORKDIR /frontend
RUN --mount=type=cache,id=s/<railway-service-id>-/pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS prod-deps
COPY . .
WORKDIR /server
RUN --mount=type=cache,id=s/<railway-service-id>-/pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS server
ENV NODE_ENV=production
COPY ./server ./server
COPY --from=prod-deps /server/node_modules /server/node_modules
COPY --from=build /server/dist /server/dist
WORKDIR /server
CMD [ "pnpm", "start" ]