# Chem Lab

A minimal full-stack setup with a React client and an Express server.
The backend is prepared for future MongoDB integration and falls back to
in-memory storage when a database connection is not available.

## Client

```bash
cd client
npm install
npm run dev
```

## Server

```bash
cd server
npm install
npm start
```

Set `MONGO_URI` in a `.env` file to connect to MongoDB. Without it, the
server serves and stores items in memory.
