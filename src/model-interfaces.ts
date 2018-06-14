export interface Note {
  number: number // i.e. 84
  name: string // i.e. "C"
  octave: number // i.e. 5
}

export interface Chord {
  notes: Array<Note>
}
