/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form/immutable"
import { combineReducers } from "redux-immutable"
// import languageProviderReducer from "../../containers/LanguageProvider/reducer"
import login from "./modules/login"
import uiReducer from "./modules/ui"
import initval from "./modules/initForm"
// import { connectRouter } from 'connected-react-router/immutable';
// import history from '../../utils/history';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  // Wrap the root reducer and return a new root reducer with router state
  // const mergeWithRouterState = connectRouter(history);
  // return mergeWithRouterState(rootReducer);
  return combineReducers({
    form,
    login,
    ui: uiReducer,
    initval,
    // language: languageProviderReducer,
    // router: connectRouter(history),
    ...injectedReducers,
  })
}