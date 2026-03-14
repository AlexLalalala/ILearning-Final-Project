import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Inventory } from 'src/inventory/inventory.entity';
import { User } from 'src/user/user.entity';
import { Action } from '../casl.action';
import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/auth.user-payload';

type Subjects = InferSubjects<typeof Inventory | typeof UserPayload> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserPayload): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[Action, Subjects]>
    >(createMongoAbility);

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
      can(Action.Create, 'all');
    }

    can(Action.Update, Inventory, { createdById: user.userId });
    can(Action.Delete, Inventory, { createdById: user.userId });

    can(Action.Update, Inventory, {
      editAccessIds: { $in: [user.userId] },
    });

    return build({
      detectSubjectType: (item) => {
        return item.constructor as ExtractSubjectType<Subjects>;
      },
    });
  }
}
