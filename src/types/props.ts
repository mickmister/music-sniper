export interface SongData {
    songs: Song[]
}

export interface Song {
    filePath: string
    length: number
    sections: Section[]
}

export type Segment = {
    start: number
    end: number
}

export type Section = {
    name: string
} & Segment
