import { TimeInterval } from "rxjs/internal/operators/timeInterval";

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
}

export type TimeInterval = [number, number]
export type TimeIntervalMilliseconds = [Milliseconds, Milliseconds]

export type Seconds = number
export type Milliseconds = number
export type Percentage = number
