FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY .npmrc pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

EXPOSE 1337

CMD ["pnpm", "run", "start"]
