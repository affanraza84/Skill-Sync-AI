FROM node:20-alpine AS base

# This Dockerfile is intended for full Turborepo builds
# It can be extended for deploying Next.js and API separately

WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install

CMD ["pnpm", "dev"]
