# MusicStream

Sistema de streaming de música com Java Spring Boot + React e 3 bancos de dados.

## Tecnologias

- **Backend:** Java 21 + Spring Boot 4.0.5
- **Bancos:**
  - **PostgreSQL** — catálogo de músicas (`musics`) e usuários (`users`)
  - **Cassandra** — logs de reprodução (`music_plays`) e ranking
  - **MongoDB** — playlists dos usuários (`playlists`)
- **Frontend:** React.js
- **Infra:** Docker Compose

## Como rodar

```bash
docker compose up --build -d
```

Acessar em http://localhost:3000

## Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login (email + senha) |
| POST | `/api/auth/registro` | Cadastro (nome + email + senha) |

### Músicas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/musicas` | Lista todas as músicas |
| GET | `/api/musicas/{id}` | Detalhes de uma música |
| POST | `/api/musicas` | Cadastra nova música |
| DELETE | `/api/musicas/{id}` | Remove música |
| GET | `/api/musicas/top?limit=10&userId=` | Top mais ouvidas (por usuário ou global) |
| GET | `/api/musicas/search?artist=` | Busca por artista |
| GET | `/api/musicas/genre/{genre}` | Filtra por gênero |
| POST | `/api/musicas/{id}/play?userId=` | Registra reprodução |
| DELETE | `/api/musicas/plays` | Reseta todas as contagens de play |

### Playlists
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/playlists/{userId}` | Lista playlists do usuário |
| POST | `/api/playlists` | Cria nova playlist |
| PATCH | `/api/playlists/{id}/musicas/{musicaId}` | Adiciona música à playlist |
| DELETE | `/api/playlists/{id}` | Deleta playlist |
| DELETE | `/api/playlists/{id}/musicas/{musicaId}` | Remove música da playlist |
| GET | `/api/playlists/{id}/shuffle` | Ordem aleatória ponderada |

## Arquitetura dos Bancos

| Banco | Dados | Motivo |
|-------|-------|--------|
| **PostgreSQL** | `musics` (catálogo), `users` (contas) | Dados relacionais, ACID, consultas por artista/gênero |
| **Cassandra** | `music_plays` (logs de play) | Escrita massiva, escalabilidade horizontal |
| **MongoDB** | `playlists` (documentos flexíveis) | Schema flexível, array de músicas aninhado |

## Comandos para visualizar os bancos

### PostgreSQL
```bash
docker exec -it music_postgres psql -U admin -d musicdb -c "SELECT id, title, artist, genre FROM musics LIMIT 10;"
docker exec -it music_postgres psql -U admin -d musicdb -c "SELECT id, nome, email FROM users;"
```

### Cassandra
```bash
docker exec -it music_cassandra cqlsh -e "SELECT * FROM music_keyspace.music_plays LIMIT 10;"
```

### MongoDB
```bash
docker exec -it music_mongodb mongosh musicdb --eval "db.playlists.find().pretty()"
```

## Páginas (Frontend)

| Rota | Página |
|------|--------|
| `/home` | Home com top do usuário e playlists |
| `/minhas-musicas` | Catálogo completo de músicas |
| `/minhas-playlists` | Gerenciar playlists |
| `/playlist/:id` | Detalhes da playlist |
| `/player` | Player com fila de reprodução |
