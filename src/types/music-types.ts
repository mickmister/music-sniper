import { TimeInterval } from "rxjs/internal/operators/timeInterval";

export type Comment = {
  id: number,
  user_id: number,
  audio_file_id: number,
  created_at: string,
  text: string,
}

export type AudioFile = {
  id: number,
  url: string,
  file_name: string,
  loading?: boolean,
  playing?: boolean,
  howl?: Howl,
  comments: Comment[],
  clip_ids: number[]
}

export type Clip = {
  id: number,
  name: string,
  audio_file_id: number,
  user_id: number,
  start: number,
  end: number,
}

export type Project = {
  id?: number
  name: string
  project_attachments: [{id: number, item_type: string, item_id: number}]
}

export interface SongData {
  songs: Song[]
}

export interface Song {
  length:   number
  sections: Section[]
}

export interface Segment {
  start: Seconds
  end: Seconds
}

export interface Section {
  name:  string
  start: number
  end:   number
}

export type SpriteInformation = {
  songPosition: Seconds,
  spritePosition: Seconds,
  spriteProgress: Percentage,
  length: Seconds,
  segment: Segment,
  playing: boolean,
  section: Section,
}

export type TimeInterval = [number, number]
export type TimeIntervalMilliseconds = [Milliseconds, Milliseconds]

export type Seconds = number
export type Milliseconds = number
export type Percentage = number
