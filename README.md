# Sound Palette

Describe a scene or a feeling, and Sound Palette turns it into five words that capture its rhythm, tempo and energy, each paired with a colour. The colours fill the screen as a backdrop, and if you create an account you can save palettes and come back to them.

> **This is a demo.** It's a personal learning project, not a production service. AI generation is rate-limited and capped per day, the database may be reset at any time, and there's no password reset. Please don't reuse a password you use anywhere else.

This repo is the **frontend** (React + TypeScript + Vite). The backend is a Go API in a separate repo: [sound-palette-api](https://github.com/nicodann/sound-palette-api).

## Using it

1. **Describe something.** Type a scene or feeling (up to 500 characters), e.g. _"A misty lake full of poison fishies..."_, and submit.
2. **See your palette.** The background fills with five colours, and the matching words slide in, then tuck away into a drawer. Use the **words** button to bring them back.
3. **Save it (optional).** Click **save palette**. If you're not logged in, you'll be asked to log in or register first, and the palette is saved once you are.
4. **Browse your palettes.** When logged in, **my palettes** opens a gallery of everything you've saved. Click one to load it, or delete it.
5. **Start again.** **Reset Palette** clears the current palette so you can write a new prompt.

You don't need an account to generate palettes, only to save them.

### Limits

To keep the demo affordable, palette generation is limited per visitor (a few a minute and a daily allowance) and in total per day. If you hit a limit, you'll see a message telling you to slow down or come back tomorrow.

## Running it locally

You'll need [Node.js](https://nodejs.org/) and the [API](https://github.com/nicodann/sound-palette-api) running locally (see its README).

```sh
git clone https://github.com/nicodann/sound-palette.git
cd sound-palette
npm install
```

Copy the example env. It already contains the url of the local API (http://localhost:8080):

```sh
cp .env.example .env
```

Then start the dev server:

```sh
npm run dev
```

and open <http://localhost:5173>. The API's `ALLOWED_ORIGIN` must match this address, or the browser will block its requests.

### Scripts

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | start the dev server with hot reload             |
| `npm run build`   | type-check and build for production into `dist/` |
| `npm run preview` | serve the production build locally               |
| `npm run lint`    | run ESLint                                       |

`VITE_API_URL` is read at **build time**, so set it to the deployed API's URL before running `npm run build` for production.

## How it works

- The frontend sends your prompt to the API, which asks Claude (Anthropic's model) for five `{ adjective, colour }` pairs and checks the reply before returning it.
- Logging in sets an `HttpOnly` cookie, so the page's JavaScript never handles the login token.
- Saved palettes are stored in Postgres by the API.
