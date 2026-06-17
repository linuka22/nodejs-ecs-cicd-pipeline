# Node.js System Info API

A simple REST API built with Node.js and Express that returns real-time system information.

## Endpoints

- `GET /` — Returns system info (hostname, memory, uptime, platform, Node version)
- `GET /health` — Health check endpoint used by AWS ECS

## Run Locally

```bash
npm install
node index.js
```

## Tech Stack

- Node.js
- Express
- Docker
- AWS ECS
- CI/CD Pipeline

## Purpose

Built to learn Docker containerization and AWS ECS deployment with a CI/CD pipeline.
