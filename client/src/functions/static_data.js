export const getTypeName = (value) => {
  var arr = ['Administrador', 'Gerente', 'Redator']
  return arr[value - 1]
}
export const getTypeNameLabel = (value) => {
  var arr = ['primary', 'default', 'secondary']
  return arr[value - 1]
}
