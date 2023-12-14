// // NestableComponent.js
// 'use client'
// import React, { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const ItemType = 'NestableItem';

// const DraggableItem = ({ id, text, index, moveItem }) => {
//   const [, ref] = useDrag({
//     type: ItemType,
//     item: { id, index },
//   });

//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveItem(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   return (
//     <div ref={(node) => ref(drop(node))} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px' }}>
//       {text}
//     </div>
//   );
// };

// const Nestable = ({ items, setItems }) => {
//   const moveItem = (fromIndex, toIndex) => {
//     const newItems = [...items];
//     const [movedItem] = newItems.splice(fromIndex, 1);
//     newItems.splice(toIndex, 0, movedItem);
//     setItems(newItems);
//   };

//   return (
//     <div>
//       {items.map((item, index) => (
//         <DraggableItem key={item.id} id={item.id} text={item.text} index={index} moveItem={moveItem} />
//       ))}
//     </div>
//   );
// };

// const NestableComponent = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: 'Item 1' },
//     { id: 2, text: 'Item 2', children: [{ id: 3, text: 'Item 3' }, { id: 4, text: 'Item 4' }] },
//     { id: 5, text: 'Item 5', children: [{ id: 6, text: 'Item 6' }, { id: 7, text: 'Item 7' }] },
//   ]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <h1>Nestable</h1>
//         <p>Drag &amp; drop hierarchical list with mouse and touch compatibility (React component)</p>

//         <Nestable items={items} setItems={setItems} />
//       </div>
//     </DndProvider>
//   );
// };

// export default NestableComponent;

'use client'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'NestableItem';

const CustomDropdown = ({ options, onSelect }) => {
  return (
    <div>
      {/* Your custom dropdown implementation */}
      {/* For simplicity, you can use a simple select element as a placeholder */}
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const DraggableItem = ({ id, text, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [isSectionOpen, setSectionOpen] = useState(false);

  const handleDropdownSelect = (selectedOption) => {
    // Handle the selected option here
    console.log('Selected Option:', selectedOption);
  };

  return (
    <div ref={(node) => drag(drop(node))} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px', opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setSectionOpen(!isSectionOpen)}>
        <div>{text}</div>
        <div>{isSectionOpen ? '[-]' : '[+]'}</div>
      </div>
      {isSectionOpen && (
        <div style={{ marginLeft: '20px', marginTop: '8px' }}>
          <label>Dropdown 1:</label>
          <CustomDropdown options={['Option 1', 'Option 2', 'Option 3']} onSelect={handleDropdownSelect} />

          <label>Dropdown 2:</label>
          <CustomDropdown options={['Option A', 'Option B', 'Option C']} onSelect={handleDropdownSelect} />
        </div>
      )}
    </div>
  );
};

const Nestable = ({ items, setItems }) => {
  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem key={item.id} id={item.id} text={item.text} index={index} moveItem={moveItem} />
      ))}
    </div>
  );
};

const NestableComponent = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2', children: [{ id: 3, text: 'Item 3' }, { id: 4, text: 'Item 4' }] },
    { id: 5, text: 'Item 5', children: [{ id: 6, text: 'Item 6' }, { id: 7, text: 'Item 7' }] },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Nestable</h1>
        <p>Drag &amp; drop hierarchical list with mouse and touch compatibility (React component)</p>

        <Nestable items={items} setItems={setItems} />
      </div>
    </DndProvider>
  );
};

export default NestableComponent;


