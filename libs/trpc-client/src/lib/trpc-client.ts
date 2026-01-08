import { createTRPCClient, httpBatchLink, TRPCClient } from '@trpc/client';
import { AppRouter } from '@jobber-workspace/trpc-app-router';

export function trpcClient(url: string): TRPCClient<any> {
  return createTRPCClient({
    links: [
      httpBatchLink({
        //url: 'http://localhost:3300',
        url
      })
    ]
  });
}
