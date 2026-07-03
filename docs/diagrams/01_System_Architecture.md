# High-Level System Architecture

```text
                                +----------------------+
                                |      End Users       |
                                +----------+-----------+
                                           |
                                           |
                                    HTTPS Requests
                                           |
                                           v
                              +--------------------------+
                              |          NGINX           |
                              |     Reverse Proxy        |
                              +------------+-------------+
                                           |
                                           |
                              +------------v-------------+
                              |     Spring Boot API      |
                              |        Gateway           |
                              +------------+-------------+
                                           |
                    +----------------------+----------------------+
                    |                      |                      |
                    |                      |                      |
                    v                      v                      v
          +----------------+    +----------------+    +----------------+
          | Authentication |    | Business Logic |    | Report Service |
          +----------------+    +----------------+    +----------------+
                                           |
                                           |
                                           v
                              +--------------------------+
                              |     FastAPI AI Layer     |
                              +------------+-------------+
                                           |
             +-----------------------------+-----------------------------+
             |               |               |              |            |
             v               v               v              v            v
     Prediction      Summarization   Similar Cases   Timeline AI   Strategy AI
       Engine            Engine          Engine         Engine        Engine
             |               |               |              |            |
             +---------------+---------------+--------------+------------+
                                             |
                                             |
                       +---------------------+----------------------+
                       |                                            |
                       v                                            v
               +-------------------+                    +------------------+
               |     MongoDB       |                    |     Qdrant       |
               | Application Data  |                    | Vector Database  |
               +-------------------+                    +------------------+
```

## Description

The WakuLaw platform follows a layered architecture.

- React communicates only with Spring Boot.
- Spring Boot acts as the API Gateway.
- FastAPI executes AI workloads.
- MongoDB stores application data.
- Qdrant stores vector embeddings for semantic search.