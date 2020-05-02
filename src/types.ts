// export interface Post {
//   body: string
//   id: number
//   title: string
// }
export interface Episode {
  frontmatter: FMType
  body: any
}
export type FMType = {
  title: string
  mp3URL: string
  libsynURL?: string
  date: string
  hosts?: string
  description: string
  episodeimage?: string
  episodeType?: 'full' | 'trailer' | 'bonus'
  episode?: number
  season?: number
  slug?: string
} 
