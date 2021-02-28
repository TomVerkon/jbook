import {
  ActionType,
  Cell,
  CellTypes,
  CellsState,
  DeleteCellAction,
  DirectionTypes,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction
} from './types';
import { produce } from 'immer';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: { id, content, },
  }
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  }
};

export const moveCell = (id: string, direction: DirectionTypes): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  }
};

export const insertCellBefore = (id: string | null, cellType: CellTypes): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: { id, type: cellType }
  }
};

export const actionCreators = { deleteCell, moveCell, insertCellBefore, updateCell };

type Action =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellBeforeAction;

/* Example Data:
  data: {
    '123456': {
      id: '123456',
      type: 'code',
      content: 'some content'
    }
  }
*/
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
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      }
      state.data[cell.id] = cell;
      const idx = state.order.findIndex(id => id === action.payload.id);
      if (idx === -1) {
        state.order.push(cell.id);
      } else {
        state.order.splice(idx, 0, cell.id);
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