import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const RecordCard = ({ record, setDraggedEl, popOfColor }) => {
        
  const [hovering, setHovering] = useState(false);

  function handleDragStart (event) {
    setDraggedEl(record.recordId);
  }

  function handleMouseOver () {
    setHovering(true);
  }
  function handleMouseLeave () {
    setHovering(false);
  }

  return (
      // <a target="_blank" className='record-link' href={recordProp.recordUrl}>
        <div draggable="true"className='record-card' onDragStart={handleDragStart} onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave}>
          <p className='record-title'>{record.itemName}</p>
          <img draggable="false" className='record-card-thumbnail' src={record.imgSrc}/>
          {record.popOfColor == popOfColor && <div style={{backgroundColor: popOfColor}} className='pop-of-color-overlay'></div>}
          {hovering && 
          <div className='recordcard-overlay-div'>
            <div>
              <p><span>Name:</span> {record.itemName}</p>
              <p><span>Size:</span> {record.size}</p>
              <p><span>Description:</span> {record.description}</p>
            </div>
            <div>
              <p><span>Vendor:</span> {record.vendor}</p>
              <p><span>Price:</span> {record.price}$</p>
              <p><span>Stock:</span> {record.stock}</p>
            </div>         
          </div>}
        </div>
      // </a>
  )
};

export default RecordCard;
