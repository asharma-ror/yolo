import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SearchState, DurationRange } from "./searchTypes"

const { actions, reducer } = createSlice({
  name: "search",
  initialState: {} as SearchState,
  reducers: {
    setPassengers(state, action: PayloadAction<number | undefined>) {
      return {
        ...state,
        totAdults: action.payload,
        initialized: true,
      }
    },
    setDuration(state, action: PayloadAction<DurationRange | undefined>) {
      return {
        ...state,
        selectedDuration: action.payload,
        initialized: true,
      }
    },
    setDate(state, action: PayloadAction<Date | undefined>) {
      return {
        ...state,
        selectedDate: action.payload,
        initialized: true,
      }
    },
    initialize(state, action: PayloadAction<SearchState>) {
      return action.payload
    },
  },
})

export const { setPassengers, setDuration, setDate, initialize } = actions

export default reducer
