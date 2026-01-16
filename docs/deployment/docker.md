---
sidebar_position: 3
---

# Docker Deployment

Deploy SB Agent Hub using Docker for consistent, reproducible deployments.

## Dockerfile

The backend uses a multi-stage Dockerfile for optimized builds:

```dockerfile
# Build stage
FROM node:21-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:21-slim AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]
```

## Building the Image

### Local Build

```bash
cd sb-api-services-v2
docker build -t sb-agent-hub:latest .
```

### With Build Args

```bash
docker build \
  --build-arg NODE_OPTIONS="--max-old-space-size=2048" \
  -t sb-agent-hub:latest .
```

## Running the Container

### Basic Run

```bash
docker run -d \
  --name sb-agent-hub \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://..." \
  -e JWT_SECRET="your-secret" \
  -e OPENAI_API_KEY="sk-..." \
  sb-agent-hub:latest
```

### With Environment File

```bash
docker run -d \
  --name sb-agent-hub \
  -p 3000:3000 \
  --env-file .env \
  sb-agent-hub:latest
```

## Docker Compose

### Full Stack Setup

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./sb-api-services-v2
      dockerfile: Dockerfile
    container_name: sb-backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./sb-chat-ui
      dockerfile: Dockerfile
    container_name: sb-frontend
    ports:
      - "3001:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3000
    depends_on:
      - backend
    restart: unless-stopped

networks:
  default:
    name: sb-network
```

### Running with Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Production Considerations

### Memory Management

TypeScript compilation can be memory-intensive:

```dockerfile
# In Dockerfile
ENV NODE_OPTIONS="--max-old-space-size=2048"
```

### Health Checks

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Resource Limits

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

## Coolify Deployment

### Configuration

1. Connect GitHub repository
2. Set Dockerfile path: `sb-api-services-v2/Dockerfile`
3. Configure environment variables
4. Enable auto-deploy on push

### Important Notes

- Use capital 'D' in `Dockerfile` (not `dockerfile`)
- Set build command if needed
- Configure health check endpoint

## Troubleshooting

### Build Failures

**Out of memory:**
```bash
# Increase memory limit
docker build --memory=4g -t sb-agent-hub .
```

**Slow builds:**
```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build -t sb-agent-hub .
```

### Runtime Issues

**Container exits immediately:**
```bash
# Check logs
docker logs sb-agent-hub

# Common causes:
# - Missing environment variables
# - Database connection failed
# - Port already in use
```

**High memory usage:**
```bash
# Monitor resources
docker stats sb-agent-hub

# Set memory limits
docker run --memory=4g ...
```

## Commands Reference

```bash
# Build
docker build -t sb-agent-hub:latest .

# Run
docker run -d --name sb-agent-hub -p 3000:3000 --env-file .env sb-agent-hub:latest

# Logs
docker logs -f sb-agent-hub

# Shell access
docker exec -it sb-agent-hub /bin/sh

# Stop
docker stop sb-agent-hub

# Remove
docker rm sb-agent-hub

# Clean build cache
docker builder prune
```

## Related

- [Deployment Overview](/deployment/overview)
- [Environment Variables](/deployment/environment-variables)
