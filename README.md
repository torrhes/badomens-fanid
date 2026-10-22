# BAD OMENS — FAN ID (React + Vite)
An independent fan project by Nayara Ferreira · @pearlygates404. Not affiliated with Bad Omens.

    npm install
    npm run dev      # http://localhost:5173
    npm run build

## X profile photo lookup
This app uses Unavatar directly in the browser:
`https://unavatar.io/x/{username}?fallback=false&ttl=1d`

No API key, no server config, and no `.env` variables are required. If the avatar is missing, the app falls back to showing only the @ inside the photo frame.

The service is free but may rate limit anonymous requests. If a request is blocked by CORS in your deployment, the fallback is to move the fetch to a server-side endpoint.

## Songs
Edit `src/data/songs.js` (real titles only).
# badomens-fanid
