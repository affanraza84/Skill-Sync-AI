# Skill-Sync-AI

An AI-powered skill development platform built as a full-stack monorepo. Skill-Sync-AI helps users identify skill gaps, get personalised learning recommendations, and track their growth — all powered by Google Gemini AI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, Next.js API Routes |
| Database | PostgreSQL (via Docker) |
| ORM | Prisma |
| AI | Google Gemini API |
| Auth | NextAuth.js, JWT, Google OAuth |
| Monorepo | Turborepo, pnpm workspaces |
| DevOps | Docker, Docker Compose, GitHub Actions |

---

## Project Structure

```
skill-sync-ai/
├── apps/                   # Application packages
├── packages/               # Shared packages (UI, config, etc.)
├── infra/
│   └── docker/             # Docker configuration files
├── .github/
│   └── workflows/          # CI/CD GitHub Actions
├── docker-compose.yml      # PostgreSQL local dev setup
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml     # pnpm workspace definition
└── .env.example            # Environment variable template
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9.1.1+
- [Docker](https://www.docker.com/) (for local PostgreSQL)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/affanraza84/Skill-Sync-AI.git
cd Skill-Sync-AI
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Set up environment variables**

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5433/skillsync_ai"

# Authentication
JWT_ACCESS_SECRET="your_secure_access_secret"
JWT_REFRESH_SECRET="your_secure_refresh_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_URL="http://localhost:3000"

# AI
GEMINI_API_KEY="your_gemini_api_key_here"
```

**4. Start the database**

```bash
docker-compose up -d
```

This spins up a PostgreSQL instance on port `5433`.

**5. Push the database schema**

```bash
pnpm db:push
```

**6. Run the development server**

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all files with Prettier |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema changes to the database |
| `pnpm start` | Start Docker services (`docker-compose up -d`) |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | Base URL for NextAuth (e.g. `http://localhost:3000`) |
| `GEMINI_API_KEY` | API key for Google Gemini AI |

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'add: your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## Author

**Mohammad Affan Raza**
- GitHub: [@affanraza84](https://github.com/affanraza84)
- LinkedIn: [Mohammad Affan Raza](https://www.linkedin.com/in/mohammad-affan-raza-b6039b288)

---

## License

This project is private and not licensed for public use.
