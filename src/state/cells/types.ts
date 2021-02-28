export type CellTypes = 'code' | 'text';

export type DirectionTypes = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
};

export enum ActionType {
  UPDATE_CELL = 'jbook/cells/update_cell',
  MOVE_CELL = 'jbook/cells/move_cell',
  DELETE_CELL = 'jbook/cells/delete_cell',
  INSERT_CELL_BEFORE = 'jbook/cells/insert_cell_before',
}

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string,
    direction: DirectionTypes,
  }
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string,
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string,
    content: string,
  }
}

// If id is null append to the end of the order array
export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null,
    type: CellTypes,
  }
}