# MusicStream

API de streaming de música com arquitetura **polyglot persistence** (3 bancos de dados), construída com Java 21 + Spring Boot e frontend em React.

Projeto desenvolvido com foco em decisões reais de arquitetura de dados: cada banco foi escolhido de acordo com o padrão de acesso e o tipo de dado.

---

## Destaques Técnicos

- **Arquitetura multi-banco (Polyglot Persistence)**
  - PostgreSQL → dados relacionais e transacionais (usuários + catálogo de músicas)
  - Cassandra → escrita massiva de logs de reprodução e ranking
  - MongoDB → documentos flexíveis de playlists
- Autenticação de usuários (login + registro)
- Ranking de músicas mais ouvidas (global e por usuário)
- Sistema de playlists com shuffle ponderado
- Containerizado com Docker Compose (sobe tudo com um comando)
- Documentação de endpoints via Postman

---

## Stack

| Camada       | Tecnologia              |
|--------------|-------------------------|
| Backend      | Java 21 + Spring Boot   |
| Frontend     | React.js                |
| Bancos       | PostgreSQL, Cassandra, MongoDB |
| Infra        | Docker Compose          |

---

## Por que 3 bancos diferentes?

| Banco          | Responsabilidade                  | Motivo da escolha                              |
|----------------|-----------------------------------|------------------------------------------------|
| **PostgreSQL** | Catálogo de músicas + usuários    | ACID, consultas por artista/gênero, relacionamentos |
| **Cassandra**  | Logs de reprodução + ranking      | Alta taxa de escrita, escalabilidade horizontal |
| **MongoDB**    | Playlists dos usuários            | Schema flexível, arrays aninhados de músicas   |

Essa decisão foi tomada para praticar o conceito de **polyglot persistence** — usar o banco certo para cada tipo de carga.

---

## Como rodar

```bash
docker compose up --build -d
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Principais Endpoints

### Autenticação
| Método | Rota                  | Descrição                     |
|--------|-----------------------|-------------------------------|
| POST   | `/api/auth/login`     | Login (email + senha)         |
| POST   | `/api/auth/registro`  | Cadastro de novo usuário      |

### Músicas
| Método | Rota                              | Descrição                              |
|--------|-----------------------------------|----------------------------------------|
| GET    | `/api/musicas`                    | Lista todas as músicas                 |
| GET    | `/api/musicas/{id}`               | Detalhes de uma música                 |
| POST   | `/api/musicas`                    | Cadastra nova música                   |
| DELETE | `/api/musicas/{id}`               | Remove música                          |
| GET    | `/api/musicas/top`                | Top mais ouvidas (global ou por user)  |
| GET    | `/api/musicas/search?artist=`     | Busca por artista                      |
| GET    | `/api/musicas/genre/{genre}`      | Filtra por gênero                      |
| POST   | `/api/musicas/{id}/play`          | Registra uma reprodução                |

### Playlists
| Método | Rota                                      | Descrição                        |
|--------|-------------------------------------------|----------------------------------|
| GET    | `/api/playlists/{userId}`                 | Lista playlists do usuário       |
| POST   | `/api/playlists`                          | Cria nova playlist               |
| PATCH  | `/api/playlists/{id}/musicas/{musicaId}`  | Adiciona música à playlist       |
| DELETE | `/api/playlists/{id}`                     | Remove playlist                  |
| GET    | `/api/playlists/{id}/shuffle`             | Ordem aleatória ponderada        |

---

## Estrutura do Projeto

```
MusicStream/
├── backend/                 # Spring Boot (Java 21)
├── frontend/                # React.js
├── docker-compose.yml       # Sobe PostgreSQL + Cassandra + MongoDB + apps
├── .postman/                # Collection de testes da API
└── README.md
```

---

## Decisões de Arquitetura

- **Cassandra** para `music_plays`: logs de reprodução têm alta taxa de escrita e não precisam de joins complexos. Ideal para ranking e histórico.
- **MongoDB** para playlists: cada playlist é um documento com array de músicas — modelo natural para esse tipo de dado.
- **PostgreSQL** para o restante: integridade referencial e consultas relacionais clássicas.

---

## Autor

Desenvolvido por [Arthur Carvalho Rotkis](https://github.com/rotkis)

- LinkedIn: [linkedin.com/in/arthurrotkis](https://www.linkedin.com/in/arthurrotkis/)
