# ArchetypeConnect

A personality quiz and archetype-based meeting platform where users discover their creator identity, join compatible groups, and schedule meetings with like-minded creators.

## Features

- **Personality Quiz** — 12-question quiz with 1-5 rating scale that maps to 12 creator archetypes
- **Identity System** — Generates unique identity names (e.g., "Framework Rebel") based on your Core, Balance, and Inverse archetypes
- **Archetype Groups** — Automatic placement into groups based on Core archetype (Teacher, Strategist, Builder, etc.)
- **Meeting System** — Create and join Peer, Collaboration, and Mastermind meetings
- **Matching Algorithm** — Cosine similarity + complementary archetype pairing for compatibility scores
- **User Profiles** — Identity card, archetype chord, groups, and meeting history
- **Statistics Dashboard** — Platform-wide analytics and archetype distribution

## 12 Creator Archetypes

Pirate, Guide, Connector, Builder, Reporter, Comedian, Storyteller, Artist, Strategist, Philosopher, Teacher, Systems Thinker

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via Prisma ORM
- **State Management:** Zustand
- **Design:** Modern 2026 web design — glassmorphism, soft gradients, micro-interactions

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/page.tsx         # Quiz flow
│   ├── results/[id]/page.tsx # Results display
│   ├── groups/               # Group listing & detail
│   ├── meetings/             # Meeting listing & creation
│   ├── profile/[id]/page.tsx # User profiles
│   ├── dashboard/page.tsx    # Stats dashboard
│   └── api/                  # REST API routes
├── components/               # Reusable UI components
├── lib/                      # Core logic (archetypes, quiz, identity, matching)
├── store/                    # Zustand state management
└── types/                    # TypeScript type definitions
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/quiz/submit` | Submit quiz answers, create user |
| GET | `/api/quiz/[id]` | Get quiz result by ID |
| GET | `/api/meetings` | List all meetings |
| POST | `/api/meetings` | Create a new meeting |
| POST | `/api/meetings/[id]/join` | Join a meeting |
| GET | `/api/stats` | Platform statistics |

## Deployment

The app is ready for deployment on Vercel:

```bash
npm run build
```

Set `DATABASE_URL` environment variable for production database.

## License

MIT
