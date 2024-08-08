import { TsRawFieldDefinition } from '@quasar-army/ts-generator'

export default function(field: TsRawFieldDefinition) {
    return field.fieldName === 'date' ||
      field.fieldName === 'datetime' ||
      field.fieldName.includes('_date')
  }