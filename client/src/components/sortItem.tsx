import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dropdown, IconButton } from 'rsuite';
import { AiFillDelete } from 'react-icons/ai'
import { theme } from '../style';

interface IProps {
  children: React.ReactNode;
  id: string;
  removeItem: (id: string) => void;
}

export function SortableItem(props: IProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    width: 400,
    height: 420,
    padding: 20,
    margin: 20,
    border: '1px solid',
    backgroundColor: 'white',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <AiFillDelete onClick={() => props.removeItem(props.id)} style={{
          cursor: 'pointer',
          marginLeft: '-17px',
          marginTop: '-30px'
        }} size={30} color={theme.red} />
        {props.children}
      </div>
    </>
  );
}
