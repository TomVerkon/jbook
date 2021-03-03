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
store.dispatch(insertCellAfter(id, 'text'));
store.dispatch(insertCellAfter(id, 'code'));
store.dispatch(updateCell(id, 'document.querySelector(\'#root\').innerHTML = \'<div>Hello World!</div>\''));
//store.dispatch(updateCell(id, 'console.log(1234)'));
id = store.getState().cells.order[3];
store.dispatch(moveCell(id, 'up'));
id = store.getState().cells.order[3];
store.dispatch(updateCell(id, `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div className="container has-text-black">Hey! How you doin?</div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`));

// store.dispatch(actionCreators.deleteCell(icbId));

