import {AudioFile, Entity} from './music-types'

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

export type AttachProps = {
    title: string
    onSubmit: (items: Entity[]) => void
    items: (Entity & {name?: string, file_name?: string})[]
}
