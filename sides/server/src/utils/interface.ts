import {CreateNoteInput, FilterQueryInput, ParamsInput, UpdateNoteInput} from '../note.schema';

export type asyncStatus = 'success' | 'error';

export interface AsyncResponse {
  status: asyncStatus;
  message?: string;
  data?: {};
}

export interface CreateNoteControllerInput {
  input: CreateNoteInput;
}

export interface UpdateNoteControllerInput {
  paramsInput: ParamsInput;
  input: UpdateNoteInput['body'];
}

export interface FindNoteControllerInput {
  paramsInput: ParamsInput;
}

export interface FindAllNotesControllerInput {
  filterQuery: FilterQueryInput;
}

export interface DeleteNoteControllerInput extends FindNoteControllerInput {
}

