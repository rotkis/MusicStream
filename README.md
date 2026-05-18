# 🎵 Music System

Sistema de streaming de música para aprender backend Java com Spring Boot.

## Tecnologias
- **Backend:** Java 21 + Spring Boot 3.3
- **Bancos:** PostgreSQL (músicas) · Cassandra (plays/ranking) · MongoDB (playlists)
- **Frontend:** React.js
- **Infra:** Docker Compose

## Como rodar
```bash

docker compose up --build -d

```

## Endpoints principais
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/musicas | Lista todas as músicas |
| GET | /api/musicas/top | Top mais ouvidas |
| POST | /api/musicas/{id}/play | Registra uma reprodução |
| GET | /api/playlists/{userId} | Playlists do usuário |
| GET | /api/playlists/{id}/shuffle | Reprodução aleatória ponderada |