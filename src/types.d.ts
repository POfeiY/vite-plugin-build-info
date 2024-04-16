export type Build_Info_To_Html = {
  showBuildUser?: boolean
  enableMeta?: boolean
  enableLog?: boolean
  enableGloabl?: boolean
}

export type Api = {
  name: string
  transformIndexHtml: () => any
}
