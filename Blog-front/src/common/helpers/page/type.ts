export type PageMeta = { text: string; url: string }
type PageMetaFunc = (...args: (string | number)[]) => PageMeta

export type PageStaticList = {
  [key: string]: PageMeta
}
export type PageDynamicList = {
  [key: string]: PageMetaFunc
}
