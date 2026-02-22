# Dorkbin

A pastebin-style forum built with static HTML/JS and Netlify serverless functions.

## Features
- User registration and login
- View and manage personal pastes
- Search pastes
- Dynamic stats

## Setup
1. Install Netlify CLI (optional for local dev):

```bash
npm i -g netlify-cli
```

2. Run locally with `netlify dev` or deploy by connecting to a Netlify site.

## Backend
Serverless functions are in `netlify/functions/` and use Netlify Blobs for data storage. For production, ensure Netlify Blobs are enabled in your site settings.