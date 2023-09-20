export function flattenEntityHierarchy (bareEntity, bareEntitiesKeyed) {
  const filledEntity = Object.assign({}, bareEntity)
  const baseTypeKey = bareEntity._attributes?.BaseType
    ?.replaceAll('graph.', '')

  if (baseTypeKey) {
    const baseEntity = bareEntitiesKeyed[baseTypeKey]
    baseEntity.Property = Array.isArray(baseEntity.Property) ? baseEntity.Property : (baseEntity.Property ? [baseEntity.Property] : [])
    baseEntity.NavigationProperty = Array.isArray(baseEntity.NavigationProperty) ? baseEntity.NavigationProperty : (baseEntity.NavigationProperty ? [baseEntity.NavigationProperty] : [])
    filledEntity.Property = [
      ...(Array.isArray(filledEntity.Property) ? filledEntity.Property : (filledEntity.Property ? [filledEntity.Property] : [])),
      ...flattenEntityHierarchy(baseEntity, bareEntitiesKeyed).Property,
    ]
    filledEntity.NavigationProperty = [
      ...(Array.isArray(filledEntity.NavigationProperty) ? filledEntity.NavigationProperty : (filledEntity.NavigationProperty ? [filledEntity.NavigationProperty] : [])),
      ...flattenEntityHierarchy(baseEntity, bareEntitiesKeyed).NavigationProperty,
    ]
  }

  return filledEntity
}
