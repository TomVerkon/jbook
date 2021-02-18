import React, { FC } from 'react';
import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
}

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;