import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";
import cellsReducer, { actionCreators } from "./cells";

const reducers = combineReducers({
  cells: cellsReducer
})

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// typescript type definition
export type RootState = ReturnType<typeof reducers>;

store.dispatch(actionCreators.insertCellBefore(null, 'text'));
store.dispatch(actionCreators.insertCellBefore(null, 'code'));
let id = store.getState().cells.order[1];
store.dispatch(actionCreators.insertCellBefore(null, 'code'));
store.dispatch(actionCreators.insertCellBefore(null, 'text'));
// console.log(store.getState());
store.dispatch(actionCreators.updateCell(id, '<div>Hello World!</div>'));
id = store.getState().cells.order[3];
// console.log(store.getState());
store.dispatch(actionCreators.moveCell(id, 'up'));
// console.log(store.getState());
// store.dispatch(actionCreators.deleteCell(icbId));
// console.log(store.getState());

// store.dispatch({ type: cTypes.ActionType.INSERT_CELL_BEFORE, payload: { id: '123', type: 'code' } });
// console.log(store.getState());
// const icbId = store.getState().cells.order[0];
// store.dispatch({ type: cTypes.ActionType.INSERT_CELL_BEFORE, payload: { id: icbId, type: 'text' } });
// console.log(store.getState());
// store.dispatch({ type: cTypes.ActionType.INSERT_CELL_BEFORE, payload: { id: icbId, type: 'code' } });
// console.log(store.getState());
// store.dispatch({ type: cTypes.ActionType.UPDATE_CELL, payload: { id: icbId, content: 'Hello World!' } });
// console.log(store.getState());
// store.dispatch({ type: cTypes.ActionType.MOVE_CELL, payload: { id: icbId, direction: 'up' } });
// console.log(store.getState());
// store.dispatch({ type: cTypes.ActionType.DELETE_CELL, payload: icbId });
// console.log(store.getState());
