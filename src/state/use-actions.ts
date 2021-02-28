import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './cells';


export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
}


// export const useDeleteCellAction = () => {
//   const dispatch = useDispatch();
//   return bindActionCreators(deleteCell, dispatch);
// }
// export const useInsertCellBeforeAction = () => {
//   const dispatch = useDispatch();
//   return bindActionCreators(insertCellBefore, dispatch);
// }
// export const useMoveCellAction = () => {
//   const dispatch = useDispatch();
//   return bindActionCreators(moveCell, dispatch);
// }
// export const useUpdateCellAction = () => {
//   const dispatch = useDispatch();
//   return bindActionCreators(updateCell, dispatch);
// }
