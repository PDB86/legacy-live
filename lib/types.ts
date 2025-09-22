export type Era = "50s" | "60s" | "70s" | "80s" | "90s" | "2000s" | "2010s" | "2020s"
export type Tempo = "Chill" | "Mid" | "High"

export type Song = {
  id: string // slug ("uptown-funk")
  title: string // "Uptown Funk"
  artist: string // "Mark Ronson ft. Bruno Mars"
  era?: Era // infer when obvious; leave undefined if unknown
  genres: string[] // infer from section name + heuristics
  moments: string[] // e.g., ["Party"], ["First Dance"], etc.
  tempo?: Tempo // optional heuristic (e.g., Ballads => "Chill")
  language?: "English" | "Spanish" | "Bilingual" // infer for Latin list when clear
  notes?: string // optional
  popularity?: number // default 3; bump iconic songs to 4–5
}

export type FilterState = {
  search: string
  eras: Era[]
  genres: string[]
  moments: string[]
  tempo?: Tempo
  sort: "popularity" | "alphabetical" | "decade" | "newest"
}
