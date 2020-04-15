export interface DurationRange {
  minNights: number
  maxNights: number
}

export interface SearchState {
  totAdults?: number
  selectedDate?: Date
  selectedDuration?: DurationRange
  initialized: boolean
}
