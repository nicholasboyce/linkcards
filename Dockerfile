FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app/frontend
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm run build

FROM base AS prod-deps
COPY . /app
WORKDIR /app/server
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS server
ENV NODE_ENV=production
COPY ./server ./server
COPY --from=prod-deps /app/server/node_modules /server/node_modules
COPY --from=build /app/server/dist /server/dist
WORKDIR /server
EXPOSE 8000
CMD [ "pnpm", "start" ]