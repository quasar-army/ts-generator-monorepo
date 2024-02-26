import { shapeStringAttribute } from './shapeStringAttribute.js'
import { shapeBooleanAttribute } from './shapeBooleanAttribute.js'
import { shapeFloatAttribute } from './shapeFloatAttribute.js'
import { shapeObjectAttribute } from './shapeObjectAttribute.js'
import { shapeComplexAttribute } from './shapeComplexAttribute.js'
import { shapeArrayOfStringsAttribute } from './shapeArrayOfStringsAttribute.js'
import { shapeArrayOfNumbersAttribute } from './shapeArrayOfNumbersAttribute.js'
import { shapeArrayOfObjectsAttribute } from './shapeArrayOfObjectsAttribute.js'
import { shapeIntegerAttribute } from './shapeIntegerAttribute.js'
import { shapeHasManyAttribute } from './shapeHasManyAttribute.js'
import { shapeHasOneAttribute } from './shapeHasOneAttribute.js'
import { shapeBelongsToAttribute } from './shapeBelongsToAttribute.js'
import { shapeNumberAttribute } from './shapeNumberAttribute.js'

export const typeShapersMap = {
  string: shapeStringAttribute,
  number: shapeNumberAttribute,
  integer: shapeIntegerAttribute,
  float: shapeFloatAttribute,
  boolean: shapeBooleanAttribute,
  object: shapeObjectAttribute,
  complex: shapeComplexAttribute,
  array_of_strings: shapeArrayOfStringsAttribute,
  array_of_numbers: shapeArrayOfNumbersAttribute,
  array_of_objects: shapeArrayOfObjectsAttribute,
  has_many: shapeHasManyAttribute,
  has_one: shapeHasOneAttribute,
  belongs_to: shapeBelongsToAttribute,
}
