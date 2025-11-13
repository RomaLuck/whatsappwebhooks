# Node WhatsApp Webhooks (TypeScript)

A minimal WhatsApp Cloud API webhook server built with Node.js, Express, and TypeScript. It demonstrates how to:
- Verify the WhatsApp webhook handshake (GET /webhook)
- Receive and process incoming updates (POST /webhook)
- Route messages by type and content via a simple Bot + Router abstraction
- Send replies: text, images, and interactive messages (buttons and lists)

This project is intended as a starting point for building WhatsApp chatbots and automation using the WhatsApp Cloud API.

## Features
- Express server with CORS and JSON parsing
- Webhook verification using VERIFY_TOKEN
- Message processing with a pluggable router (text matchers, commands, media, interactive)
- Typed services for sending text, image, and interactive messages via Axios
- Example handlers for common flows (start/help/list/fallback)
- TypeScript configuration and nodemon-based dev workflow

## Requirements
- Node.js 18+ (recommended)
- A WhatsApp Cloud API app with a configured Webhook URL
- A public HTTPS endpoint for receiving webhooks (use a tunneling tool like ngrok for local dev)

## Quick Start

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables. Copy `.env.example` to `.env` and fill values:

   - `PORT`: Port your server will listen on (e.g., `3001`)
   - `VERIFY_TOKEN`: A secret token you choose to verify the webhook setup with Meta
   - `WHATSAPP_API_URL`: Base WhatsApp Cloud API URL for your phone number ID, e.g. `https://graph.facebook.com/v20.0/<PHONE_NUMBER_ID>/messages`
   - `WHATSAPP_API_TOKEN`: Your WhatsApp Cloud API access token

3. Run in development mode:

   ```bash
   npm run dev
   ```

   This compiles TypeScript and starts `node ./dist/index.js` via nodemon.

4. Expose your server to the internet for webhook delivery (local dev):

   ```bash
   ngrok http http://localhost:3001
   ```

5. In Meta Developer dashboard, set your webhook URL to your public URL (e.g., `https://<random>.ngrok.io/webhook`) and set the Verify Token to the same value as `VERIFY_TOKEN` in your `.env`.

## Project Structure
```
src/
  index.ts                 # Express app entrypoint
  routes/index.ts          # HTTP routes: GET /, GET/POST /webhook
  controllers/index.ts     # ping, subscribe (verify), process (handle webhook)
  router.ts                # Example bot routes/handlers registration
  services/
    api-client.ts          # Axios client configured with WhatsApp API base URL and token
    bot.ts                 # Bot class; routes messages by type/text/commands
    message-types.ts       # Enum of message types (text/image/interactive/...)
    messages-sender.ts     # Helpers to send text, images, interactive messages
    service-router.ts      # Router abstraction for registering handlers
  handlers/
    hello-world-handler.ts # Example: "start" text handler
  dto/                     # Interactive messages DTOs (buttons, lists, etc.)
  types.ts                 # WhatsApp message shape typings (not shown here)
.env.example               # Template environment variables
```

## Environment Variables
Defined in `src/secrets.ts` and `.env.example`:
- `PORT`: Express listening port (default `3001`)
- `VERIFY_TOKEN`: Token used to verify the webhook subscription
- `WHATSAPP_API_URL`: Base URL for WhatsApp Cloud API messages endpoint
- `WHATSAPP_API_TOKEN`: Bearer token for WhatsApp API requests

Example `.env`:
```
PORT=3001
VERIFY_TOKEN=your-verify-token
WHATSAPP_API_URL=https://graph.facebook.com/v20.0/<PHONE_NUMBER_ID>/messages
WHATSAPP_API_TOKEN=EAAB...<snip>
```

## Running
- Development (auto-compile and restart):
  ```bash
  npm run dev
  ```

- Production (example):
  ```bash
  npm run build
  node dist/index.js
  ```

Note: The provided `package.json` uses nodemon to compile on the fly with `tsc` and run the compiled output. You can add a dedicated `build` script if you prefer a separate compile step.

## HTTP Endpoints

- GET `/` — Health check
  - Response: `{ "message": "Hello from the server!" }`

- GET `/webhook` — Webhook verification
  - Query params required by Meta: `hub.mode`, `hub.verify_token`, `hub.challenge`
  - If `hub.mode === 'subscribe'` and `hub.verify_token === VERIFY_TOKEN`, responds with the `hub.challenge` string (HTTP 200). Otherwise returns HTTP 403.

- POST `/webhook` — Webhook event receiver
  - Expects a WhatsApp Cloud API payload. Validates structure and processes first message or status update if present.
  - Returns `200 Webhook processed` when handled, or `200 No actionable data` if neither message nor status present.

## Handlers and Router
Handlers are registered in `src/router.ts` using a `serviceRouter` instance. Examples:

- Text matchers:
  ```ts
  serviceRouter.onText('start', helloWorldHandler);
  serviceRouter.onText('help', async (bot) => { /* send image */ });
  serviceRouter.onText('list', async (bot) => { /* send interactive list */ });
  ```

- Commands (`/start` etc.):
  ```ts
  serviceRouter.onCommand('start', async (bot) => { /* send interactive buttons */ });
  ```

- Media:
  ```ts
  serviceRouter.onImage(async (bot) => { /* reply to images */ });
  ```

- Fallback:
  ```ts
  serviceRouter.fallback(async (bot) => {
    await sendTextMessage(bot.getMessage().from, "I don't understand your message");
  });
  ```

## Sending Messages
`src/services/messages-sender.ts` encapsulates WhatsApp API calls using `axios` client from `src/services/api-client.ts`.

- Send text:
  ```ts
  await sendTextMessage(to, 'Hello!');
  ```

- Reply to a specific message:
  ```ts
  await replyMessage(to, 'Thanks!', messageId);
  ```

- Send image:
  ```ts
  await sendImageMessage(to, { link: 'https://example.com/cat.jpg', caption: 'Cute!' });
  ```

- Send interactive (buttons or list):
  ```ts
  await sendInteractiveMessage(to, interactivePayload);
  ```

The base URL and token are injected via `WHATSAPP_API_URL` and `WHATSAPP_API_TOKEN`.

## License
This project is provided as-is for educational purposes. Add your preferred license if needed.
