import { createStore } from "redux";
import rootReducer from './store/reducers';
let store = createStore(rootReducer);
export default store;