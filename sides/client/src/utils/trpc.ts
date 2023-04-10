import {createTRPCReact} from '@trpc/react-query';
import type {AppRouter} from 'api-server/src/server';

export const trpc = createTRPCReact<AppRouter>();
