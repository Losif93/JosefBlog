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

const defaultPhotos = [
  {
    title: 'Coffee Window',
    story: 'Steam fades on the glass, but the morning stays.',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Warm Street',
    story: 'A late sun turns every step into amber.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Quiet Room',
    story: 'Books open, air still, time unhurried.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Soft Shore',
    story: 'Waves reach, retreat, and leave the day polished.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Evening Walk',
    story: 'The city exhales as lights begin to bloom.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Rain Notes',
    story: 'Pavement writes back everything the sky says.',
    image:
      'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Green Pause',
    story: 'Leaves hold a silence that feels like shelter.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Golden Field',
    story: 'Wind moves through grasses like a slow song.',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Late Light',
    story: 'A last glow settles on the day with grace.',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80'
  }
]

const defaultMusic = [
  {
    title: 'Warm Dawn',
    artist: 'Elara & Co.',
    mood: 'Slow, amber, morning.'
  },
  {
    title: 'Sultans of Swing',
    artist: 'Dire Straits',
    mood: 'A clean guitar line that never leaves.',
    embed: 'https://www.youtube.com/embed/0fAQhSRLQnM'
  },
  {
    title: 'City Rain',
    artist: 'Iones',
    mood: 'Muted streets, soft synths.'
  },
  {
    title: 'Golden Hour Notes',
    artist: 'Plainview',
    mood: 'Guitar sketches and brass.'
  }
]

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Home({ stories, photos, music }) {
  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">Josef&apos;sThoughts</div>
        <nav className="nav">
          <a href="#thoughts">Thoughts</a>
          <a href="#photos">Photos</a>
          <a href="#music">Music</a>
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
              <figure className="photo-tile" key={photo.title}>
                <img src={photo.image || photo.image_url} alt={photo.title} />
                <figcaption className="photo-overlay">
                  <span>{photo.title}</span>
                  <p>{photo.story}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="music" className="section">
          <div className="section-head">
            <h2>Music embeds</h2>
            <p>Small sets to play while reading or wandering.</p>
          </div>
          <div className="music-grid">
            {music.map((track) => (
              <article className="music-card" key={track.title}>
                <div className="music-top">
                  <div>
                    <h3>{track.title}</h3>
                    <p className="music-artist">{track.artist}</p>
                  </div>
                  <button className="play">Play</button>
                </div>
                <p className="music-mood">{track.mood}</p>
                {track.embed ? (
                  <div className="music-embed">
                    <iframe
                      src={track.embed}
                      title={`${track.title} by ${track.artist}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : null}
                <div className="progress">
                  <span />
                </div>
              </article>
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
  const [photos, setPhotos] = useState(defaultPhotos)
  const [music, setMusic] = useState(defaultMusic)
  const [token, setToken] = useState('')

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
        const [storyRes, photoRes, musicRes] = await Promise.all([
          fetch(`${API_BASE}/api/stories`),
          fetch(`${API_BASE}/api/photos`),
          fetch(`${API_BASE}/api/music`)
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
          }
        }
        if (musicRes.ok) {
          const data = await musicRes.json()
          if (data.length) {
            setMusic(
              data.map((item) => ({
                title: item.title,
                artist: item.artist,
                mood: item.mood,
                embed: item.embed_url || ''
              }))
            )
          }
        }
      } catch {
        // Keep defaults if API is unavailable.
      }
    }
    load()
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home stories={stories} photos={photos} music={music} />}
      />
      <Route
        path="/admin"
        element={<Admin token={token} onTokenChange={setToken} />}
      />
    </Routes>
  )
}

export default App
