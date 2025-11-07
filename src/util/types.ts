export type PrimitiveType = string | number | boolean | null
export type JsonDict = { [key: string]: JsonDict | JsonDict[] | PrimitiveType | PrimitiveType[] }