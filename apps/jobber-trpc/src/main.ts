import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { appRouter as router } from './app/app.router';

const PORT: number = 3300;

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createHTTPServer({
  middleware: cors(),
  router
});

server.listen(PORT, (): void => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
