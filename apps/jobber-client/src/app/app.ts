import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createTRPCClient, httpBatchLink } from '@trpc/client';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@jobber-workspace/trpc-app-router';

import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'jobber-client';

  constructor() {
    const trpc = createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3300',
        }),
      ],
    });


    const user = trpc.userById.query('1');
    user.then(console.info)
  }
}
