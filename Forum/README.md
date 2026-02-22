# Dorkbin

A pastebin-style forum built with static HTML/JS and serverless API endpoints.

## Features
- User registration and login
- View and manage personal pastes
- Search pastes
- Dynamic stats

## Setup
1. Install Vercel CLI (optional for local dev):

```bash
npm i -g vercel
```

2. Run locally with `vercel dev` or deploy with `vercel`.

## Backend
Serverless functions are in `api/` and read/write JSON under `data/` for this demo. For production use a proper database (Supabase, Postgres, etc.).