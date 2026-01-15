import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5174'

const defaultStories = [
  {
    title: 'A window left open',
    date: 'Jan 15',
    text: 'The city is quieter when you notice the birds before the traffic.'
  },
  {
    title: 'Soft light, soft choices',
    date: 'Jan 14',
    text: 'I said no to the rush and yes to the slow walk home.'
  },
  {
    title: 'A song on repeat',
    date: 'Jan 13',
    text: 'The same chorus can feel new if you listen with different ears.'
  }
]

const buildDefaultPhotos = () => {
  const seed = Date.now()
  const topics = [
    ['Coffee Window', 'coffee', 'Steam fades on the glass, but the morning stays.'],
    ['Warm Street', 'street', 'A late sun turns every step into amber.'],
    ['Quiet Room', 'interior', 'Books open, air still, time unhurried.'],
    ['Soft Shore', 'ocean', 'Waves reach, retreat, and leave the day polished.'],
    ['Evening Walk', 'city,night', 'The city exhales as lights begin to bloom.'],
    ['Rain Notes', 'rain', 'Pavement writes back everything the sky says.'],
    ['Green Pause', 'forest', 'Leaves hold a silence that feels like shelter.'],
    ['Golden Field', 'field', 'Wind moves through grasses like a slow song.'],
    ['Late Light', 'sunset', 'A last glow settles on the day with grace.']
  ]
  return topics.map(([title, topic, story], index) => ({
    title,
    story,
    image: `https://source.unsplash.com/featured/800x1000?${topic}&sig=${seed + index}`
  }))
}

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Home({ stories, photos }) {
  const [activePhoto, setActivePhoto] = useState(null)

  const closePhoto = () => setActivePhoto(null)

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">Josef&apos;sThoughts</div>
        <nav className="nav">
          <a href="#thoughts">Thoughts</a>
          <a href="#photos">Photos</a>
          <a href="#about">About</a>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">Personal journal</p>
            <h1>Quiet stories, warm light, and the sound of today.</h1>
            <p className="lede">
              A small corner for daily reflections, imperfect photos, and
              playlists that match the mood.
            </p>
            <div className="hero-actions">
              <button className="primary">Read today&apos;s note</button>
              <button className="ghost">Browse the archive</button>
            </div>
          </div>
          <div className="hero-card">
            <p className="card-label">Today</p>
            <h3>January 15, 2026</h3>
            <p>
              Late coffee, early light, and a reminder that most days are
              already enough.
            </p>
            <div className="chip-row">
              <span className="chip">6 min read</span>
              <span className="chip">Stillness</span>
            </div>
          </div>
        </section>

        <section id="thoughts" className="section">
          <div className="section-head">
            <h2>Thoughts of the day</h2>
            <p>Short entries that catch the day in motion.</p>
          </div>
          <div className="thought-grid">
            {stories.map((item) => (
              <article className="thought-card" key={item.title}>
                <div className="thought-meta">
                  {item.date || formatDate(item.created_at)}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text || item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="photos" className="section">
          <div className="section-head">
            <h2>Photo grid</h2>
            <p>Fragments of places, people, and pauses.</p>
          </div>
          <div className="photo-grid">
            {photos.map((photo) => (
              <button
                className="photo-tile"
                key={photo.title}
                type="button"
                onClick={() =>
                  setActivePhoto({
                    title: photo.title,
                    story: photo.story,
                    image: photo.image || photo.image_url
                  })
                }
              >
                <img src={photo.image || photo.image_url} alt={photo.title} />
                <figcaption className="photo-overlay">
                  <span>{photo.title}</span>
                  <p>{photo.story}</p>
                </figcaption>
              </button>
            ))}
          </div>
        </section>

      </main>

      <footer id="about" className="footer">
        <div>
          <h3>About Josef</h3>
          <p>
            I collect quiet stories, shoot the light I love, and build playlists
            for in-between moments.
          </p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@josefsthoughts.com">hello@josefsthoughts.com</a>
          <a href="#">Instagram</a>
          <a href="#">Spotify</a>
        </div>
      </footer>

      {activePhoto ? (
        <div className="photo-modal" onClick={closePhoto}>
          <div className="photo-modal-card" onClick={(event) => event.stopPropagation()}>
            <img src={activePhoto.image} alt={activePhoto.title} />
            <div className="photo-modal-body">
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.story}</p>
              <button className="ghost" type="button" onClick={closePhoto}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Admin({ token, onTokenChange }) {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const [storyForm, setStoryForm] = useState({ title: '', body: '' })
  const [photoForm, setPhotoForm] = useState({
    title: '',
    story: '',
    imageUrl: ''
  })
  const [musicForm, setMusicForm] = useState({
    title: '',
    artist: '',
    mood: '',
    embedUrl: ''
  })
  const [status, setStatus] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setStatus('')
    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      if (!response.ok) {
        setStatus('Login failed. Check your credentials.')
        return
      }
      const data = await response.json()
      onTokenChange(data.token)
    } catch {
      setStatus('Login failed. Is the server running?')
    }
  }

  const handleLogout = () => {
    onTokenChange('')
  }

  const authHeaders = useMemo(() => {
    if (!token) return {}
    return { Authorization: `Bearer ${token}` }
  }, [token])

  const submitStory = async (event) => {
    event.preventDefault()
    setStatus('')
    try {
      const response = await fetch(`${API_BASE}/api/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(storyForm)
      })
      if (!response.ok) {
        setStatus('Story save failed.')
        return
      }
      setStatus('Story saved.')
      setStoryForm({ title: '', body: '' })
    } catch {
      setStatus('Story save failed.')
    }
  }

  const submitPhoto = async (event) => {
    event.preventDefault()
    setStatus('')
    try {
      const response = await fetch(`${API_BASE}/api/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          title: photoForm.title,
          story: photoForm.story,
          image_url: photoForm.imageUrl
        })
      })
      if (!response.ok) {
        setStatus('Photo save failed.')
        return
      }
      setStatus('Photo saved.')
      setPhotoForm({ title: '', story: '', imageUrl: '' })
    } catch {
      setStatus('Photo save failed.')
    }
  }

  const submitMusic = async (event) => {
    event.preventDefault()
    setStatus('')
    try {
      const response = await fetch(`${API_BASE}/api/music`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          title: musicForm.title,
          artist: musicForm.artist,
          mood: musicForm.mood,
          embed_url: musicForm.embedUrl
        })
      })
      if (!response.ok) {
        setStatus('Music save failed.')
        return
      }
      setStatus('Music saved.')
      setMusicForm({ title: '', artist: '', mood: '', embedUrl: '' })
    } catch {
      setStatus('Music save failed.')
    }
  }

  return (
    <div className="page admin">
      <header className="site-header">
        <div className="brand">Josef&apos;sThoughts</div>
        <nav className="nav">
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main className="admin-main">
        <section className="section-head">
          <h2>Admin</h2>
          <p>Add stories, photos, and music to your blog.</p>
        </section>

        {!token ? (
          <form className="admin-card" onSubmit={handleLogin}>
            <h3>Sign in</h3>
            <div className="form-grid">
              <label>
                Username
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, username: event.target.value })
                  }
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, password: event.target.value })
                  }
                />
              </label>
              <button className="primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="admin-card admin-status">
              <p>Signed in.</p>
              <button className="ghost" type="button" onClick={handleLogout}>
                Sign out
              </button>
            </div>

            <form className="admin-card" onSubmit={submitStory}>
              <h3>New story</h3>
              <div className="form-grid">
                <label>
                  Title
                  <input
                    type="text"
                    value={storyForm.title}
                    onChange={(event) =>
                      setStoryForm({ ...storyForm, title: event.target.value })
                    }
                  />
                </label>
                <label>
                  Body
                  <textarea
                    rows="5"
                    value={storyForm.body}
                    onChange={(event) =>
                      setStoryForm({ ...storyForm, body: event.target.value })
                    }
                  />
                </label>
                <button className="primary" type="submit">
                  Save story
                </button>
              </div>
            </form>

            <form className="admin-card" onSubmit={submitPhoto}>
              <h3>New photo</h3>
              <div className="form-grid">
                <label>
                  Title
                  <input
                    type="text"
                    value={photoForm.title}
                    onChange={(event) =>
                      setPhotoForm({ ...photoForm, title: event.target.value })
                    }
                  />
                </label>
                <label>
                  Story
                  <textarea
                    rows="3"
                    value={photoForm.story}
                    onChange={(event) =>
                      setPhotoForm({ ...photoForm, story: event.target.value })
                    }
                  />
                </label>
                <label>
                  Image URL
                  <input
                    type="text"
                    value={photoForm.imageUrl}
                    onChange={(event) =>
                      setPhotoForm({
                        ...photoForm,
                        imageUrl: event.target.value
                      })
                    }
                  />
                </label>
                <button className="primary" type="submit">
                  Save photo
                </button>
              </div>
            </form>

            <form className="admin-card" onSubmit={submitMusic}>
              <h3>New music</h3>
              <div className="form-grid">
                <label>
                  Title
                  <input
                    type="text"
                    value={musicForm.title}
                    onChange={(event) =>
                      setMusicForm({ ...musicForm, title: event.target.value })
                    }
                  />
                </label>
                <label>
                  Artist
                  <input
                    type="text"
                    value={musicForm.artist}
                    onChange={(event) =>
                      setMusicForm({ ...musicForm, artist: event.target.value })
                    }
                  />
                </label>
                <label>
                  Mood
                  <input
                    type="text"
                    value={musicForm.mood}
                    onChange={(event) =>
                      setMusicForm({ ...musicForm, mood: event.target.value })
                    }
                  />
                </label>
                <label>
                  Embed URL (optional)
                  <input
                    type="text"
                    value={musicForm.embedUrl}
                    onChange={(event) =>
                      setMusicForm({
                        ...musicForm,
                        embedUrl: event.target.value
                      })
                    }
                  />
                </label>
                <button className="primary" type="submit">
                  Save music
                </button>
              </div>
            </form>
          </>
        )}

        {status ? <p className="admin-status-text">{status}</p> : null}
      </main>
    </div>
  )
}

function App() {
  const [stories, setStories] = useState(defaultStories)
  const [photos, setPhotos] = useState(() => buildDefaultPhotos())
  const [token, setToken] = useState('')
  const [useDefaultPhotos, setUseDefaultPhotos] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
    } else {
      localStorage.removeItem('adminToken')
    }
  }, [token])

  useEffect(() => {
    const load = async () => {
      try {
        const [storyRes, photoRes] = await Promise.all([
          fetch(`${API_BASE}/api/stories`),
          fetch(`${API_BASE}/api/photos`)
        ])
        if (storyRes.ok) {
          const data = await storyRes.json()
          if (data.length) {
            setStories(data)
          }
        }
        if (photoRes.ok) {
          const data = await photoRes.json()
          if (data.length) {
            setPhotos(
              data.map((item) => ({
                title: item.title,
                story: item.story,
                image_url: item.image_url
              }))
            )
            setUseDefaultPhotos(false)
          }
        }
      } catch {
        // Keep defaults if API is unavailable.
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!useDefaultPhotos) return
    const interval = setInterval(() => {
      setPhotos(buildDefaultPhotos())
    }, 30000)
    return () => clearInterval(interval)
  }, [useDefaultPhotos])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home stories={stories} photos={photos} />}
      />
      <Route
        path="/admin"
        element={<Admin token={token} onTokenChange={setToken} />}
      />
    </Routes>
  )
}

export default App
