#Install dependencies and build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm install @css-inline/css-inline-linux-x64-musl

COPY . .

RUN npm run build

# Stage 2: Create the final image
FROM node:18-alpine

WORKDIR /app

RUN addgroup -S userTemp && adduser -S userTemp -G userTemp

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN chown -R userTemp:userTemp /app

USER userTemp

EXPOSE 8000

CMD ["npm", "run", "start:prod"]