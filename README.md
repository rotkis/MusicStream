# 🎵 MusicStream — Sistema de Música com Spring Boot

> Projeto de estudo full-stack explorando arquitetura multi-banco com Spring Boot, React e Docker.

---

## Visão geral

MusicStream é uma API REST de streaming de músicas construída com Spring Boot, utilizando três bancos de dados com propósitos distintos:

- **PostgreSQL** — catálogo de músicas, artistas, álbuns e gêneros
- **Cassandra** — métricas de reprodução e ranking das mais ouvidas
- **MongoDB** — listas de reprodução com estrutura flexível

O projeto usa **JavaFaker** para popular automaticamente os bancos com dados fictícios na inicialização, e **React.js** como interface web.

---

## Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    React.js (Frontend)               │
└─────────────────────────┬───────────────────────────┘
                          │ HTTP REST
┌─────────────────────────▼───────────────────────────┐
│              Spring Boot — API REST                  │
│    Controller → Service → Repository                 │
└──────┬──────────────────┬──────────────────┬────────┘
       │                  │                  │
┌──────▼──────┐  ┌────────▼───────┐  ┌──────▼──────┐
│ PostgreSQL  │  │   Cassandra    │  │   MongoDB   │
│  Catálogo  │  │   Métricas     │  │  Playlists  │
└─────────────┘  └────────────────┘  └─────────────┘
```

### Por que três bancos?

| Banco       | Responsabilidade              | Por quê?                                                              |
|-------------|-------------------------------|-----------------------------------------------------------------------|
| PostgreSQL  | Músicas, artistas, álbuns     | Dados relacionais bem definidos, integridade referencial              |
| Cassandra   | Contagem de plays, ranking    | Alta performance em escritas e leituras de counters em grande escala  |
| MongoDB     | Listas de reprodução          | Estrutura de documento flexível para playlists aninhadas              |

---

## Funcionalidades

- [x] Catálogo de músicas com artista, álbum e gênero
- [x] Seed automático com dados fictícios via JavaFaker
- [x] Registro de plays por música
- [x] Ranking das músicas mais ouvidas (Cassandra)
- [x] Shuffle ponderado — músicas menos ouvidas têm mais chance de tocar
- [x] Criação e gestão de playlists (MongoDB)
- [x] Documentação interativa via Swagger UI
- [ ] Autenticação com JWT *(planejado)*
- [ ] Recomendação de músicas por gênero *(planejado)*

---

## Tecnologias

**Backend**
- Java 21
- Spring Boot 3.x
- Spring Data JPA (PostgreSQL)
- Spring Data Cassandra
- Spring Data MongoDB
- Datafaker (seed de dados)
- Springdoc OpenAPI (Swagger)
- Lombok
- Maven

**Frontend**
- React.js 18
- Axios

**Infraestrutura**
- Docker + Docker Compose
- PostgreSQL 16
- Apache Cassandra 4
- MongoDB 7

---

## Como rodar localmente

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados
- Java 21+ (para rodar fora do Docker)
- Node.js 18+ (para o frontend)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/musicstream.git
cd musicstream
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

O `.env.example` contém:

```env
# PostgreSQL
POSTGRES_DB=musicstream
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Cassandra
CASSANDRA_KEYSPACE=musicstream

# MongoDB
MONGO_INITDB_DATABASE=musicstream
```

### 3. Suba os bancos de dados

```bash
docker compose up -d
```

Aguarde todos os serviços ficarem saudáveis:

```bash
docker compose ps
```

### 4. Rode o backend

```bash
cd backend
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.  
O Swagger UI estará em `http://localhost:8080/swagger-ui.html`.

> Na primeira inicialização, o DataSeeder popula automaticamente os três bancos com dados fictícios.

### 5. Rode o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## Endpoints principais

| Método | Rota                        | Descrição                                 | Banco         |
|--------|-----------------------------|-------------------------------------------|---------------|
| GET    | `/musicas`                  | Lista todas as músicas                    | PostgreSQL    |
| GET    | `/musicas/{id}`             | Busca uma música por ID                   | PostgreSQL    |
| GET    | `/musicas/genero/{genero}`  | Filtra músicas por gênero                 | PostgreSQL    |
| POST   | `/musicas/{id}/ouvir`       | Registra um play                          | Cassandra     |
| GET    | `/musicas/mais-ouvidas`     | Ranking das 50 mais ouvidas               | Cassandra     |
| GET    | `/musicas/shuffle`          | Gera fila ponderada pela contagem de plays| Cassandra     |
| GET    | `/playlists`                | Lista as playlists do usuário             | MongoDB       |
| POST   | `/playlists`                | Cria uma nova playlist                    | MongoDB       |
| POST   | `/playlists/{id}/musicas`   | Adiciona uma música à playlist            | MongoDB       |

Para a documentação completa e interativa, acesse `/swagger-ui.html` com a aplicação rodando.

---

## Estrutura do projeto

```
musicstream/
├── backend/
│   ├── src/main/java/com/musicstream/
│   │   ├── music/               # Domínio: músicas
│   │   │   ├── MusicaController.java
│   │   │   ├── MusicaService.java
│   │   │   ├── MusicaRepository.java
│   │   │   ├── Musica.java      # Entidade JPA
│   │   │   └── MusicaDTO.java
│   │   ├── metrics/             # Domínio: métricas (Cassandra)
│   │   ├── playlist/            # Domínio: playlists (MongoDB)
│   │   ├── config/              # Configurações de DataSource
│   │   └── seed/                # DataSeeder com Faker
│   ├── src/main/resources/
│   │   └── application.yml
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/            # Chamadas à API
│   └── package.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Algoritmo de shuffle ponderado

O shuffle usa **peso inverso à contagem de plays**: músicas menos ouvidas têm mais chance de aparecer na fila, garantindo variedade.

```
peso(música) = 1 / (plays + 1)
probabilidade(música) = peso(música) / soma(todos os pesos)
```

Isso evita que as mesmas músicas dominem a fila apenas por já terem sido escolhidas antes.

---

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit com mensagem semântica (`git commit -m 'feat: adiciona filtro por BPM'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Padrão de commits

| Prefixo  | Uso                                      |
|----------|------------------------------------------|
| `feat:`  | Nova funcionalidade                      |
| `fix:`   | Correção de bug                          |
| `docs:`  | Alterações na documentação               |
| `chore:` | Configurações, dependências, scripts     |
| `refactor:` | Refatoração sem mudança de comportamento |

---

## Aprendizados e decisões de design

Este projeto foi desenvolvido como estudo de caso para explorar:

- **Arquitetura multi-banco** — como integrar bancos com paradigmas diferentes no mesmo projeto Spring Boot
- **Spring Data** — abstração unificada de acesso a dados (JPA, Cassandra, MongoDB)
- **Padrão de camadas** — separação estrita entre Controller, Service e Repository
- **Docker Compose** — orquestração de múltiplos serviços em ambiente de desenvolvimento

---

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
