import { initTRPC } from '@trpc/server';

const trpcRootObject = initTRPC.create();

export const router = trpcRootObject.router;

export const publicProcedure = trpcRootObject.procedure;
