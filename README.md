# Node.js CI/CD Pipeline on AWS ECS Fargate

![CI/CD](https://img.shields.io/github/actions/workflow/status/linuka22/nodejs-ecs-cicd-pipeline/deploy.yml?label=CI%2FCD&style=flat-square)
![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?style=flat-square&logo=docker)
![AWS ECS](https://img.shields.io/badge/AWS-ECS%20Fargate-FF9900?style=flat-square&logo=amazonaws)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

A Node.js REST API fully containerized with Docker and deployed to AWS ECS Fargate with a zero-touch CI/CD pipeline. Every `git push` to main automatically builds, pushes, and deploys — no manual steps.

---

## Architecture

```
Developer
    │
    │  git push
    ▼
GitHub Repository
    │
    │  triggers
    ▼
GitHub Actions CI/CD Pipeline
    ├── Build Docker image
    ├── Push to Amazon ECR
    └── Deploy to ECS Fargate
            │
            ▼
  Application Load Balancer
            │
            ▼
     ECS Fargate Task
    (Node.js container)
```

---

## Tech Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Runtime        | Node.js + Express                 |
| Containerization | Docker                          |
| Image Registry | Amazon ECR                        |
| Orchestration  | AWS ECS Fargate (serverless)      |
| Load Balancing | AWS Application Load Balancer     |
| CI/CD          | GitHub Actions                    |
| IAM            | Least-privilege AWS IAM roles     |
| Frontend       | HTML dashboard (system info UI)   |

---

## Features

- REST API exposing system information endpoints
- HTML dashboard frontend for visualizing API responses
- Fully automated CI/CD — push to main, live in minutes
- Serverless container orchestration via ECS Fargate (no EC2 to manage)
- Private image registry on Amazon ECR
- Traffic routed through an Application Load Balancer

---

## CI/CD Pipeline Flow

```
git push origin main
        │
        ▼
  GitHub Actions
        │
        ├── 1. Checkout code
        ├── 2. Configure AWS credentials
        ├── 3. Login to Amazon ECR
        ├── 4. Build Docker image
        ├── 5. Tag & push image to ECR
        └── 6. Update ECS service → rolling deploy
```

---

## API Endpoints

| Method | Endpoint      | Description                  |
|--------|---------------|------------------------------|
| GET    | `/`           | HTML dashboard               |
| GET    | `/api/info`   | System information (JSON)    |
| GET    | `/api/health` | Health check                 |

---

## Local Setup

### Prerequisites
- Docker installed
- Node.js 20+

### Run locally

```bash
git clone https://github.com/linuka22/nodejs-ecs-cicd-pipeline
cd nodejs-ecs-cicd-pipeline
npm install
npm start
```

Visit `http://localhost:3000`

### Run with Docker

```bash
docker build -t nodejs-ecs-app .
docker run -p 3000:3000 nodejs-ecs-app
```

---

## AWS Deployment

### Prerequisites
- AWS account
- ECR repository created
- ECS cluster and service configured
- GitHub Actions secrets set

### GitHub Actions Secrets Required

| Secret                  | Description                        |
|-------------------------|------------------------------------|
| `AWS_ACCESS_KEY_ID`     | IAM user access key                |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key                |
| `AWS_REGION`            | e.g. `us-east-1`                   |
| `ECR_REPOSITORY`        | ECR repository name                |
| `ECS_CLUSTER`           | ECS cluster name                   |
| `ECS_SERVICE`           | ECS service name                   |
| `CONTAINER_NAME`        | Container name in task definition  |

Once secrets are set, every push to `main` triggers a full deploy automatically.

---

## What I Learned

- How to containerize a Node.js app and manage images with Amazon ECR
- How ECS Fargate works — task definitions, services, and rolling deployments
- How to wire GitHub Actions into AWS using IAM least-privilege credentials
- Why an Application Load Balancer is needed in front of ECS tasks
- How to replace AWS CodeCommit with GitHub Actions as the more industry-standard choice

---

## Author

**Linuka Bineth Alles**
[GitHub](https://github.com/linuka22) · [LinkedIn](https://linkedin.com/in/linuka-alles) · [linuka.me](https://linuka.me)
