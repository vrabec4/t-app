# Docker Setup for Next.js Application

This document provides instructions for using Docker with this Next.js application.

## Prerequisites

- Docker and Docker Compose installed on your system
- Basic knowledge of Docker commands

## Simple Docker Commands

For basic usage, you can use these simple commands:

```bash
# Build the application image
docker build -t t-app .

# Run the application container
docker run -p 3000:3000 t-app
```

This will build a production-ready container and run it on port 3000.

## Development with Docker Compose

The `docker-compose.yml` file defines a service with different profiles:

1. **nextapp**: Complete development environment with Orval client generation, linting, formatting, and hot-reload
2. **build**: Profile for running production builds using the same container

### Starting Development Environment

For development with hot-reloading, Orval API generation, and code formatting:

```bash
docker compose up
```

This will:

1. Generate API clients with Orval from your OpenAPI schema
2. Run ESLint for linting
3. Run Prettier for formatting
4. Start the Next.js development server with hot-reload

The application will be available at http://localhost:3000 with hot-reloading enabled.

### Building the Application

To run a production build without starting a server:

```bash
docker compose --profile build run build
```

This will build an optimized version of the application.

You can build specific stages from the Dockerfile:

```bash
# Build the development image
docker build --target=development -t t-app:dev .

# Build the production image
docker build --target=production -t t-app:prod .

# Build for code generation only
docker build --target=codegen -t t-app:codegen .
```

## Docker Image Structure

The Dockerfile uses a multi-stage build approach:

1. **base**: Base Node.js Alpine image with pnpm
2. **deps**: Installs all dependencies
3. **codegen**: Generates API clients using Orval
4. **lint-and-format**: Runs ESLint and Prettier
5. **builder**: Builds the Next.js application
6. **development**: Development image with hot-reload
7. **production**: Production-ready image (default)

## Environment Variables

- `NODE_ENV`: Set to "development" or "production"
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry
- `WATCHPACK_POLLING`: Enables file system polling for hot-reload in containerized environments

## Customizing the Docker Setup

You can customize the Docker setup by modifying:

- `Dockerfile`: Change build stages, dependencies, or runtime configuration
- `docker-compose.yml`: Modify services, volumes, or environment variables
- `.dockerignore`: Control which files are sent to the Docker build context
