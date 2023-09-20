export interface BaseFieldSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
  label: string
  description?: string
  component?: string
}

export interface StringSchema extends BaseFieldSchema {
  type: 'string'
}

export interface IntegerSchema extends BaseFieldSchema {
  type: 'integer'
}

export interface FloatSchema extends BaseFieldSchema {
  type: 'float'
}

export interface BooleanSchema extends BaseFieldSchema {
  type: 'boolean'
}

export interface ObjectSchema extends BaseFieldSchema {
  type: 'object'
}

export interface ComplexSchema extends BaseFieldSchema {
  type: 'complex'
}

export interface ArrayOfStringsSchema extends BaseFieldSchema {
  type: 'array_of_strings'
}

export interface ArrayOfNumbersSchema extends BaseFieldSchema {
  type: 'array_of_numbers'
}

export interface ArrayOfObjectsSchema extends BaseFieldSchema {
  type: 'array_of_objects'
}

export type FieldSchema =
  StringSchema |
  IntegerSchema |
  FloatSchema |
  BooleanSchema |
  ObjectSchema |
  ComplexSchema |
  ArrayOfStringsSchema |
  ArrayOfNumbersSchema
