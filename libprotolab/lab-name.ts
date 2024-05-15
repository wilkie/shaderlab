export const DEFAULT_LAB_NAME = 'Protolab'
let labName = DEFAULT_LAB_NAME

export function setLabName(name: string) {
  labName = name
}

export function getLabName() {
  return labName
}

export function labNameIsDefault() {
  return labName === DEFAULT_LAB_NAME
}