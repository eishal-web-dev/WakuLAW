# Deployment Diagram

```text
                    Internet
                        │
                        ▼
               +------------------+
               |   Client Browser |
               +------------------+
                        │
                     HTTPS
                        │
                        ▼
               +------------------+
               |      NGINX       |
               | Reverse Proxy    |
               +--------+---------+
                        │
          +-------------+-------------+
          │                           │
          ▼                           ▼
 +------------------+         +------------------+
 |  React Frontend  |         | Spring Boot API  |
 +------------------+         +--------+---------+
                                       │
                                       ▼
                            +----------------------+
                            |   FastAPI AI Layer   |
                            +----+-----------+-----+
                                 │           │
                                 ▼           ▼
                         +------------+ +------------+
                         | MongoDB    | |  Qdrant    |
                         +------------+ +------------+
```

## Description

The deployment architecture isolates each major service while exposing only Nginx to the public internet.