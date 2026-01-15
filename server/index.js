import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sqlite3 from 'sqlite3'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, '..', 'db.sqlite')

const PORT = process.env.PORT || 5174
const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASS || 'change-me'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  )
  db.run(
    `CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      story TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  )
  db.run(
    `CREATE TABLE IF NOT EXISTS music (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      mood TEXT NOT NULL,
      embed_url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  )
})

const signToken = () =>
  jwt.sign({ sub: ADMIN_USER }, JWT_SECRET, { expiresIn: '7d' })

const auth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) {
    return res.status(401).json({ error: 'Missing token' })
  }
  try {
    jwt.verify(token, JWT_SECRET)
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  return res.json({ token: signToken() })
})

app.get('/api/stories', (_req, res) => {
  db.all(
    `SELECT id, title, body, created_at
     FROM stories
     ORDER BY datetime(created_at) DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load stories' })
      }
      return res.json(rows)
    }
  )
})

app.post('/api/stories', auth, (req, res) => {
  const { title, body } = req.body || {}
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' })
  }
  db.run(
    `INSERT INTO stories (title, body) VALUES (?, ?)`,
    [title, body],
    function onInsert(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save story' })
      }
      return res.status(201).json({ id: this.lastID })
    }
  )
})

app.get('/api/photos', (_req, res) => {
  db.all(
    `SELECT id, title, story, image_url, created_at
     FROM photos
     ORDER BY datetime(created_at) DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load photos' })
      }
      return res.json(rows)
    }
  )
})

app.post('/api/photos', auth, (req, res) => {
  const { title, story, image_url } = req.body || {}
  if (!title || !story || !image_url) {
    return res.status(400).json({ error: 'Title, story, and image URL are required' })
  }
  db.run(
    `INSERT INTO photos (title, story, image_url) VALUES (?, ?, ?)`,
    [title, story, image_url],
    function onInsert(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save photo' })
      }
      return res.status(201).json({ id: this.lastID })
    }
  )
})

app.get('/api/music', (_req, res) => {
  db.all(
    `SELECT id, title, artist, mood, embed_url, created_at
     FROM music
     ORDER BY datetime(created_at) DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load music' })
      }
      return res.json(rows)
    }
  )
})

app.post('/api/music', auth, (req, res) => {
  const { title, artist, mood, embed_url } = req.body || {}
  if (!title || !artist || !mood) {
    return res.status(400).json({ error: 'Title, artist, and mood are required' })
  }
  db.run(
    `INSERT INTO music (title, artist, mood, embed_url) VALUES (?, ?, ?, ?)`,
    [title, artist, mood, embed_url || null],
    function onInsert(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save music' })
      }
      return res.status(201).json({ id: this.lastID })
    }
  )
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
