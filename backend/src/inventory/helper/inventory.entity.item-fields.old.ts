import { EntitySchema } from 'typeorm';
import type { EntitySchemaColumnOptions } from 'typeorm';

type FieldType = StringConstructor | BooleanConstructor | NumberConstructor;

type Field = {
  name: string;
  type: FieldType;
};

const fields: Field[] = [
  { name: 'short_text', type: String },
  { name: 'long_text', type: String },
  { name: 'number', type: Number },
  { name: 'bool', type: Boolean },
  { name: 'doc_url', type: String },
];

function makeField(
  postfix: string,
  fieldType: FieldType,
): Record<string, EntitySchemaColumnOptions> {
  return {
    [`is_active_${postfix}`]: {
      type: 'boolean',
      default: false,
    },
    [`title_${postfix}`]: {
      type: fieldType,
      nullable: true,
    },
    [`description_${postfix}`]: {
      type: fieldType,
      nullable: true,
    },
    [`displayed_${postfix}`]: {
      type: 'boolean',
      default: false,
    },
  };
}

function repeatedFields(
  postfix: string,
  fieldType: FieldType,
  n_repeats: number,
) {
  const result: Record<string, EntitySchemaColumnOptions> = {};
  for (let i: number = 1; i <= n_repeats; i++) {
    Object.assign(result, makeField(`${postfix}${i}`, fieldType));
  }
  return result;
}

function fieldColumns(fields: Field[], n_repeats: number) {
  return Object.assign(
    {},
    ...fields.map(({ name, type }) => repeatedFields(name, type, 3)),
  );
}

export const ItemSchemaEntity = new EntitySchema({
  name: 'itemSchema',
  columns: fieldColumns(fields, 3),
});

console.log(ItemSchemaEntity);
