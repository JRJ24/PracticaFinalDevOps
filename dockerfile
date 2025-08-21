# Multi-stage Dockerfile for a small Express + EJS app
FROM node:18-alpine AS deps
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Use a non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "src/app.js"]
