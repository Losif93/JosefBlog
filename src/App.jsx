import './App.css'

function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">Josef&apos;sThoughts</div>
        <nav className="nav">
          <a href="#thoughts">Thoughts</a>
          <a href="#photos">Photos</a>
          <a href="#music">Music</a>
          <a href="#about">About</a>
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
            {[
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
            ].map((item) => (
              <article className="thought-card" key={item.title}>
                <div className="thought-meta">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
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
            {[
              {
                title: 'Coffee Window',
                story: 'Steam fades on the glass, but the morning stays.',
                image:
                  'https://source.unsplash.com/featured/600x800?coffee&sig=1'
              },
              {
                title: 'Warm Street',
                story: 'A late sun turns every step into amber.',
                image:
                  'https://source.unsplash.com/featured/600x800?street&sig=2'
              },
              {
                title: 'Quiet Room',
                story: 'Books open, air still, time unhurried.',
                image:
                  'https://source.unsplash.com/featured/600x800?interior&sig=3'
              },
              {
                title: 'Soft Shore',
                story: 'Waves reach, retreat, and leave the day polished.',
                image:
                  'https://source.unsplash.com/featured/600x800?ocean&sig=4'
              },
              {
                title: 'Evening Walk',
                story: 'The city exhales as lights begin to bloom.',
                image:
                  'https://source.unsplash.com/featured/600x800?city,night&sig=5'
              },
              {
                title: 'Rain Notes',
                story: 'Pavement writes back everything the sky says.',
                image:
                  'https://source.unsplash.com/featured/600x800?rain&sig=6'
              },
              {
                title: 'Green Pause',
                story: 'Leaves hold a silence that feels like shelter.',
                image:
                  'https://source.unsplash.com/featured/600x800?forest&sig=7'
              },
              {
                title: 'Golden Field',
                story: 'Wind moves through grasses like a slow song.',
                image:
                  'https://source.unsplash.com/featured/600x800?field&sig=8'
              },
              {
                title: 'Late Light',
                story: 'A last glow settles on the day with grace.',
                image:
                  'https://source.unsplash.com/featured/600x800?sunset&sig=9'
              }
            ].map((photo) => (
              <figure className="photo-tile" key={photo.title}>
                <img src={photo.image} alt={photo.title} />
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
            {[
              {
                title: 'Warm Dawn',
                artist: 'Elara & Co.',
                mood: 'Slow, amber, morning.'
              },
              {
                title: 'Sultans of Swing',
                artist: 'Dire Straits',
                mood: 'A clean guitar line that never leaves.'
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
            ].map((track) => (
              <article className="music-card" key={track.title}>
                <div className="music-top">
                  <div>
                    <h3>{track.title}</h3>
                    <p className="music-artist">{track.artist}</p>
                  </div>
                  <button className="play">Play</button>
                </div>
                <p className="music-mood">{track.mood}</p>
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

export default App
