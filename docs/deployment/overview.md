---
sidebar_position: 1
---

# Deployment Overview

This guide covers deploying SB Agent Hub to production environments.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                         │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Frontend │   │ Backend  │   │ Backend  │
        │ (Next.js)│   │ (Express)│   │ (Replica)│
        └──────────┘   └──────────┘   └──────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   MongoDB       │
                    │   Atlas         │
                    └─────────────────┘
```

## Deployment Options

### 1. Coolify (Self-Hosted PaaS)

Recommended for self-hosted deployments:

- Docker-based deployments
- Git-triggered auto-deploy
- Built-in SSL/TLS
- Easy environment management

### 2. Docker Compose

For development or simple deployments:

```yaml
version: '3.8'
services:
  backend:
    build: ./sb-api-services-v2
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}

  frontend:
    build: ./sb-chat-ui
    ports:
      - "3001:3000"
    depends_on:
      - backend
```

### 3. Cloud Providers

Supported platforms:
- **Hetzner Cloud**: Cost-effective EU hosting
- **AWS/GCP/Azure**: Enterprise scalability
- **Vercel**: Frontend hosting
- **Railway**: Simple full-stack

## Server Requirements

### Minimum Specifications

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 4 GB | 8 GB |
| Storage | 40 GB SSD | 80 GB NVMe |

### Current Production Setup

- **Provider**: Hetzner Cloud (Germany)
- **Instance**: CX32 (4 vCPU Intel, 8GB RAM, 80GB NVMe)
- **Platform**: Coolify
- **Domain**: api.singularitybridge.net

## Database

### MongoDB Atlas

Requirements:
- MongoDB 6.0+ for vector search
- M10+ cluster for production
- Network access configured

Setup:
1. Create Atlas cluster
2. Configure network access
3. Create database user
4. Get connection string

### Vector Search Index

```bash
# Run after database setup
npm run create-search-index
```

## SSL/TLS

### Let's Encrypt (via Coolify)

Automatic SSL certificate management.

### Custom Certificates

For custom domains:
```bash
# Place certificates
/etc/ssl/certs/your-domain.crt
/etc/ssl/private/your-domain.key
```

## Monitoring

### Health Checks

```bash
# Backend health
GET /health

# Response
{ "status": "healthy", "timestamp": "..." }
```

### Recommended Tools

- **Logs**: Docker logs, Coolify dashboard
- **Metrics**: PM2 monitoring
- **Uptime**: UptimeRobot, Pingdom

## Quick Start Deployment

### 1. Prepare Environment

```bash
# Clone repository
git clone https://github.com/singularitybridge/sb-agent-hub.git
cd sb-agent-hub

# Configure environment
cp sb-api-services-v2/.env.example sb-api-services-v2/.env
# Edit .env with your values
```

### 2. Build and Deploy

```bash
# Using Docker
docker build -t sb-api-services ./sb-api-services-v2
docker run -d -p 3000:3000 sb-api-services
```

### 3. Verify Deployment

```bash
# Check health
curl https://your-domain.com/health

# Test API
curl https://your-domain.com/api/assistants
```

## Next Steps

- [Environment Variables](/deployment/environment-variables)
- [Docker Deployment](/deployment/docker)
- [API Reference](/api/overview)
