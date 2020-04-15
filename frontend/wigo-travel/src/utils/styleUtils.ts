export const leftSpacing = (value: string | number) => `0 0 0 ${value}`
export const rightSpacing = (value: string | number) => `0 ${value} 0 0`
export const xSpacing = (value: string | number) => `0 ${value} 0 ${value}`

export const important = (value: string) => `${value} !important`

const sizeUnits = ["rem", "px", "%"]

const parseStrSize = (value: string, unit: string): Size => {
  return {
    value: parseFloat(value.replace(unit, "").trim()),
    unit,
  }
}

const parseSize = (value: string | number): Size => {
  if (typeof value === "number") {
    return {
      value,
    }
  }

  for (const unit of sizeUnits) {
    const strValue = value as string
    if (strValue.indexOf(unit) >= 0) {
      return parseStrSize(strValue, unit)
    }
  }

  throw new Error(`Cannot parse size value ${value}`)
}

const toStr = (size: Size) => `${size.value}${size.unit}`

export const addSizes = (value1: string | number, value2: string | number) => {
  const size1 = parseSize(value1)
  const size2 = parseSize(value2)
  if (size1.unit !== size2.unit) {
    throw new Error("Operants should have the same size unit")
  }

  const result = {
    value: size1.value + size2.value,
    unit: size1.unit,
  }

  return !result.unit ? result.value : toStr(result)
}

export const subtractSizes = (
  value1: string | number,
  value2: string | number
) => {
  const size1 = parseSize(value1)
  const size2 = parseSize(value2)
  if (size1.unit !== size2.unit) {
    throw new Error("Operants should have the same size unit")
  }

  const result = {
    value: size1.value - size2.value,
    unit: size1.unit,
  }
  return !result.unit ? result.value : toStr(result)
}

export const divideSize = (value: string | number, dividend: number) => {
  const size = parseSize(value)
  const result = {
    value: size.value / dividend,
    unit: size.unit,
  }

  return !result.unit ? result.value : toStr(result)
}

export const multiplySize = (value: string | number, multiplier: number) => {
  const size = parseSize(value)
  const result = {
    value: size.value * multiplier,
    unit: size.unit,
  }
  return !result.unit ? result.value : toStr(result)
}

interface Size {
  value: number
  unit?: string
}
