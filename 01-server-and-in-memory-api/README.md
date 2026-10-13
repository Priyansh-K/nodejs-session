# First server and in-memory API

## Includes

- Node HTTP server
- Express server
- CORS and JSON request handling
- In-memory transaction CRUD API
- Route parameters, query parameters and request bodies
- HTTP status codes
- Summary calculations with array methods
- Browser frontend using `fetch()`
- REST Client examples

## Setup

From this folder:

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3000`. To try the raw Node server instead, stop the Express server and run:

```bash
npm run raw
```

The raw server uses port `3001` so the two examples can be compared without changing code.

## Frontend

Serve `frontend/` from another terminal so it has a different origin:

```bash
npx serve frontend -l 5500
```

Then open `http://localhost:5500`. The frontend demonstrates `fetch`, JSON request bodies, `Promise.all`, DOM updates and DELETE requests. CORS is enabled in `server.js` so the browser can call the API.

Use `requests.http` with the VS Code REST Client extension, curl or Postman to try every request.
