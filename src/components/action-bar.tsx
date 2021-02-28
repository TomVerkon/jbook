import './action-bar.css';
import React from 'react';
import { useActions } from '../state/use-actions';
import ActionButton from './action-button';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action-bar'>
      <ActionButton onClick={() => moveCell(id, 'up')} iconName='fa-arrow-up' />
      <ActionButton
        onClick={() => moveCell(id, 'down')}
        iconName='fa-arrow-down'
      />
      <ActionButton onClick={() => deleteCell(id)} iconName='fa-times' />
    </div>
  );
};

export default ActionBar;
