# RCM Assistant UI

This project is the Angular front-end for an RCM (Revenue Cycle Management) denial assistance chatbot. It provides a chat experience where users can ask about denial codes, appeal guidance, and denial-related documentation, and it sends those requests to a backend API for processing.

## Overview

The application includes a single chat screen with:

- a welcome prompt for denial-related questions
- a message history for user + assistant exchanges
- a textarea input for submitting questions
- auto-scrolling as new messages are added
- a session-based request payload to the backend

The UI is built with Angular 21 and communicates with a locally running API on `http://localhost:8000/chat`.

## Tech stack

- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular Forms
- Vitest (available in the project tooling)

## Prerequisites

Before running the project, make sure you have:

- Node.js 20 or newer
- npm 10 or newer

## Installation

```bash
npm install
```

## Running the app

Start the Angular development server:

```bash
npm start
```

Then open:

```text
http://localhost:4200/
```

The app expects the backend assistant API to be running locally on port 8000.

## Backend contract

The UI posts chat messages using this payload shape:

```json
{
  "session_id": "<generated-uuid>",
  "message": "What does CO-97 mean?"
}
```

The request is sent to:

```text
http://localhost:8000/chat
```

The response is expected to include:

```json
{
  "reply": "<assistant response text>"
}
```

## Available scripts

```bash
npm start
npm run build
npm test
```

### Common commands

Start development server:

```bash
npm start
```

Build production bundle:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project structure

```text
rcm-assistant-ui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── chat-component/
│   │   ├── services/
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
├── README.md
└── public/
```

## Notes

- The app is designed as a front-end only repository and depends on a separate backend assistant service.
- If the backend is not running on port 8000, the chat will show an error message instead of a response.
- The frontend uses a single route with the chat component as the default landing page.

## License

This project does not currently declare a project license.
