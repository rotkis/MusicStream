# MusicStream

Sistema de streaming de música com Java Spring Boot + React.

## Tecnologias

- **Backend:** Java 21 + Spring Boot 3.3
- **Bancos:** PostgreSQL (músicas) · Cassandra (plays/ranking) · MongoDB (playlists)
- **Frontend:** React.js
- **Infra:** Docker Compose

## Como rodar

```bash
docker compose up --build -d
```

Acessar em http://localhost:3000

## Endpoints da API

### Músicas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/musicas` | Lista todas as músicas |
| GET | `/api/musicas/top?limit=10` | Top músicas mais ouvidas |
| GET | `/api/musicas/search?artist=` | Busca por artista |
| GET | `/api/musicas/genre/{genre}` | Filtra por gênero |
| POST | `/api/musicas/{id}/play?userId=` | Registra reprodução |

### Playlists
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/playlists/{userId}` | Lista playlists do usuário |
| POST | `/api/playlists` | Cria nova playlist |
| PATCH | `/api/playlists/{id}/musicas/{musicaId}` | Adiciona música à playlist |
| DELETE | `/api/playlists/{id}` | Deleta playlist |
| DELETE | `/api/playlists/{id}/musicas/{musicaId}` | Remove música da playlist |
| GET | `/api/playlists/{id}/shuffle` | Ordem aleatória ponderada (mais ouvidas primeiro) |

## Páginas (Frontend)

| Rota | Página |
|------|--------|
| `/home` | Home com top músicas e playlists |
| `/minhas-musicas` | Catálogo completo de músicas |
| `/minhas-playlists` | Gerenciar playlists |
| `/playlist/:id` | Detalhes da playlist |
| `/player` | Player com fila de reprodução |

