ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as deps

# Install runtime dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build

# Install build-time dependencies (including devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build:all

# Build API
# RUN npm run build

#Build worker
# RUN npm run build:worker

FROM base as final

ENV NODE_ENV production

COPY package.json .

# Copy runtiem dependencies from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy built application from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/templates ./templates

EXPOSE ${PORT}

# Start API server on production environment
CMD npm run start:api:prod
