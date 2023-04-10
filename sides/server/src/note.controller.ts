import {TRPCError} from '@trpc/server';
import {prisma} from './server';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import {Note} from '@prisma/client';
import {AsyncResponse, CreateNoteControllerInput, DeleteNoteControllerInput, FindAllNotesControllerInput, FindNoteControllerInput, UpdateNoteControllerInput} from './utils/interface';


export const createNoteController = async ({input}: CreateNoteControllerInput): Promise<AsyncResponse> => {

  try {
    const note: Note = await prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        category: input.category,
        published: input.published,
      },
    });

    return {
      status: 'success',
      data: {note},
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Note with that title already exists',
        });
      }
    }
    throw error;
  }

};

export const updateNoteController = async ({paramsInput, input}: UpdateNoteControllerInput): Promise<AsyncResponse> => {

  try {
    const updatedNote = await prisma.note.update({
      where: {id: paramsInput.noteId},
      data: input,
    });

    return {
      status: 'success',
      data: {updatedNote},
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Note with that title already exists',
        });
      }
    }
    throw error;
  }

};

export const findNoteController = async ({paramsInput}: FindNoteControllerInput): Promise<AsyncResponse> => {

  try {
    const note = await prisma.note.findFirst({
      where: {id: paramsInput.noteId},
    });

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Note with that ID not found',
      });
    }

    return {
      status: 'success',
      data: {note},
    };
  } catch (error) {
    throw error;
  }

};

export const findAllNotesController = async ({filterQuery}: FindAllNotesControllerInput) => {

  try {
    const page  = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip  = (page - 1) * limit;

    const notes = await prisma.note.findMany({skip, take: limit});

    return {
      status: 'success',
      data: {
        results: notes.length,
        notes: notes
      }
    };
  } catch (error) {
    throw error;
  }

};


export const deleteNoteController = async ({paramsInput}: DeleteNoteControllerInput): Promise<AsyncResponse> => {

  try {
    await prisma.note.delete({where: {id: paramsInput.noteId}});

    return {
      status: 'success',
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Note with that ID not found',
        });
      }
    }
    throw error;
  }

};
