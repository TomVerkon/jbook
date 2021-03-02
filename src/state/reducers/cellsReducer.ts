import { Cell } from '../cell';
import { ActionType } from '../action-types';
import { produce } from 'immer';
import { Action } from '../actions';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      }
      // add the new cell to the state data
      state.data[cell.id] = cell;

      // now update the order array with the new cellId
      const idx = state.order.findIndex(id => id === action.payload.id);
      if (idx === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(idx + 1, 0, cell.id);
      }

      return state;
    default:
      return state;
  }

});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;