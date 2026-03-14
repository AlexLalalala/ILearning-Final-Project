import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import type { UUID } from 'crypto';

export const Messages = {
  FORBIDDEN: 'You do NOT have permission to do this action',
  GENERAL_ERROR: 'Something went wrong',
  alreadyExists: (object: string, duplicated_field) =>
    `${object} with this ${duplicated_field} already exists`,
  notFound: (object: string, id: string | number | UUID) =>
    `${object} with id: ${id} can not be found`,
};
