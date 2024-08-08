import { ComplexTypeOutput, EnumOutput, TsEntity, TsEnum } from '@quasar-army/ts-generator'

export async function noOp (
    entityDefinition: TsEntity & TsEnum & TsEntity[] & TsEnum[],
  ): Promise<EnumOutput & ComplexTypeOutput & EnumOutput[] & ComplexTypeOutput[]> {
    return
  }