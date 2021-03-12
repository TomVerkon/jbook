export enum ActionType {
  UPDATE_CELL = 'jbook/cells/update_cell',
  MOVE_CELL = 'jbook/cells/move_cell',
  DELETE_CELL = 'jbook/cells/delete_cell',
  INSERT_CELL_AFTER = 'jbook/cells/insert_cell_after',
  BUNDLE_START = 'jbook/bundles/bundle_start',
  BUNDLE_COMPLETE = 'jbook/bundles/bundle_complete',
  FETCH_CELLS = 'jbook/cells/fetch_cells',
  FETCH_CELLS_COMPLETE = 'jbook/cells/fetch_cells_complete',
  FETCH_CELLS_ERROR = 'jbook/cells/fetch_cells_error',
  SAVE_CELLS_ERROR = 'jboook/cells/save_cells_error',
}
