import type { UUID } from 'crypto';

export class UserPayload {
  userId: UUID;
  username: string;
  email: string;
  isAdmin: boolean;
}
