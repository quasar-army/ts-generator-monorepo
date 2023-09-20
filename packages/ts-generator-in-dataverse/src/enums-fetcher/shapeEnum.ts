import { TsEnum, TsEnumOption } from '@quasar-army/ts-generator'
import { DataverseEnumDefinition } from '../types/Dataverse.js'
import { pascalCase } from 'change-case'

export async function shapeEnum (
  enumDefinition: DataverseEnumDefinition,
) {
  if (enumDefinition.Name === 'state') {
    console.log('-----------------')
    console.log('FOUND IT!')
    console.log('-----------------')
  }
  if (enumDefinition.OptionSetType === 'Picklist') {
    const options: TsEnumOption[] = enumDefinition.Options.map(option => {
      return {
        name: option.Label.LocalizedLabels[0].Label || '',
        uniqueIdentifier: option.Value,
      }
    })

    const result: TsEnum = {
      name: enumDefinition.Name,
      namePascal: pascalCase(enumDefinition.Name),
      options,
    }

    return result
  }

  const options: TsEnumOption[] = [
    {
      name: enumDefinition.TrueOption.Label.LocalizedLabels[0].Label,
      uniqueIdentifier: enumDefinition.TrueOption.Value,
    },
    {
      name: enumDefinition.FalseOption.Label.LocalizedLabels[0].Label,
      uniqueIdentifier: enumDefinition.FalseOption.Value,
    },
  ]

  const result: TsEnum = {
    name: enumDefinition.Name,
    namePascal: pascalCase(enumDefinition.Name),
    options,
  }

  return result
}
