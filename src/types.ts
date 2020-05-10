export interface Episode {
  frontmatter: FMType
  body: any
}
export type FMType = {
  title: string
  audiourl?: string
  date: string
  hosts?: string
  description: string
  episodeimage?: string
  episode?: number
  slug?: string
}
