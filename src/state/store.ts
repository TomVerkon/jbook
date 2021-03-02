import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";
import reducers from './reducers';
import { insertCellAfter, updateCell, moveCell } from "./action-creators";

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(insertCellAfter(null, 'code'));
store.dispatch(insertCellAfter(null, 'text'));
let id = store.getState().cells.order[1];
store.dispatch(insertCellAfter(id, 'code'));
store.dispatch(insertCellAfter(id, 'text'));
store.dispatch(updateCell(id, '<div>Hello World!</div>'));
id = store.getState().cells.order[3];
store.dispatch(moveCell(id, 'up'));
// store.dispatch(actionCreators.deleteCell(icbId));

