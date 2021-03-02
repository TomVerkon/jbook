import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  BundleCompleteAction,
  BundleStartAction
} from '../actions';
import { CellTypes } from '../cell';
import bundle from '../../bundler'

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

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  }
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: { id, type: cellType }
  }
};

const bundleStart = (cellId: string): BundleStartAction => {
  return { type: ActionType.BUNDLE_START, payload: { cellId }, }
};

const bundleComplete = (cellId: string, code: string, err: string | null): BundleCompleteAction => {
  return { type: ActionType.BUNDLE_COMPLETE, payload: { cellId, bundle: { code, err }, } }
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(bundleStart(cellId));
    const bundledOutput = await bundle(input);
    dispatch(bundleComplete(cellId, bundledOutput.code, bundledOutput.err));

  };
};