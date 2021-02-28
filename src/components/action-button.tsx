import React from 'react';

interface ActionButtonProps {
  onClick(): any;
  iconName: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, iconName }) => {
  const icon = `fas ${iconName}`;
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={icon} />
      </span>
    </button>
  );
};

export default ActionButton;
