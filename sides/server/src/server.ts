import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {initTRPC} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import {PrismaClient} from '@prisma/client';
import {createNoteSchema, filterQuery, params, updateNoteSchema,} from './note.schema';
import {createNoteController, deleteNoteController, findAllNotesController, findNoteController, updateNoteController,} from './note.controller';

export const prisma = new PrismaClient();
const trpc          = initTRPC.create();

const appRouter = trpc.router({
  createNote: trpc.procedure
    .input(createNoteSchema)
    .mutation(({input}) => createNoteController({input})),
  updateNote: trpc.procedure
    .input(updateNoteSchema)
    .mutation(({input}) => updateNoteController({paramsInput: input.params, input: input.body})),
  deleteNote: trpc.procedure
    .input(params)
    .mutation(({input}) => deleteNoteController({paramsInput: input})),
  getNote: trpc.procedure
    .input(params)
    .query(({input}) => findNoteController({paramsInput: input})),
  getNotes: trpc.procedure
    .input(filterQuery)
    .query(({input}) => findAllNotesController({filterQuery: input})),
});

export type AppRouter = typeof appRouter;

const allowedOrigin = process.env.VITE_SERVER_URL || 'http://localhost:3000';
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static('sides/client/dist'));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || (allowedOrigin === origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.listen(port, () => {
  console.log(`🚀 Server is NOW listening on port ${port}`);
});

