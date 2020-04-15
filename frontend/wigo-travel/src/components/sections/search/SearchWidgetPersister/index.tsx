import React from "react"
import { SearchState } from "../../../../features/search/searchTypes"
import {
  writeObject,
  readObject,
} from "../../../../services/deviceStorageService"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../state/rootReducer"
import { initialize } from "../../../../features/search/searchSlice"

const searchStateKey = "search.search_params"
const persistState = (state: SearchState) => writeObject(searchStateKey, state)
const loadState = () => {
  const state = readObject<SearchState>(searchStateKey)
  if (!state) {
    return
  }
  // JSON.parse erroneously parse the Date object as a string
  state.selectedDate = state.selectedDate
    ? new Date(state.selectedDate as any)
    : undefined
  return state
}

const SearchWidgetPersister = ({}) => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search)

  if (!search.initialized) {
    const savedState = loadState()
    if (savedState) {
      dispatch(initialize(savedState))
    }
  }

  if (search.initialized) {
    persistState(search)
  }

  return <></>
}

export default SearchWidgetPersister
