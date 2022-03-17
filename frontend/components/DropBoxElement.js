import React, { useRef, useEffect, useState } from 'react';

  const DropBoxElement = ({el, droppedRecords, setDroppedRecords, dropBox, setDropBox}) => {

  const [translate, setTranslate] = useState({
    x: 100,
    y: 100
  });

  const [isDragging, setIsDragging] = useState(false); 

  const handleDragMove = (e) => {
      setTranslate({
        x: translate.x + e.nativeEvent.offsetX - e.target.clientWidth / 2,
        y: translate.y + e.nativeEvent.offsetY - e.target.clientHeight / 2
      });
  };
  
  const handlePointerDown = (e) => {
    setIsDragging(true);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if(isDragging) {
        onDragMove(e);
    }
  };

  const onDragMove = (e) => {
    handleDragMove(e);
  };
  
  const [hovering, setHovering] = useState(false);

  const handleOnPointerOver = () => {
    setHovering(true);
  }

  const handleOnPointerLeave = () => {
    setHovering(false);
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
    window.removeEventListener('pointerup', handlePointerUp);
    }
  }, []);
  
  // handle resizing
  const [width, setWidth] = useState("200px");
  const isResizing = useRef();

  const startX = useRef();

  const handleResizing = (e) => {
    setIsDragging(false);
    if(isResizing.current) {
      const pixelNumber = width.match(/\d+/);
      if(e.clientX > startX.current) setWidth((parseInt(pixelNumber) + e.nativeEvent.offsetX) + "px");
      if(e.clientX < startX.current) setWidth((parseInt(pixelNumber) - e.nativeEvent.offsetX) + "px");
    }
  }

  const handleResizePointerDown = (e)  => {
    isResizing.current = true;
    startX.current = e.clientX;
  }

  const handleResizePointerUp = (e) => {
    isResizing.current = false;
  }

  useEffect(() => {
    window.addEventListener('pointerup', handleResizePointerUp);
    return () => {
    window.removeEventListener('pointerup', handleResizePointerUp);
    }
  }, []);
  

  const deleteItem = (event) => {
    const delRecord = droppedRecords.find(record => record.imgSrc == event.target.parentElement.firstChild.src)
    const newDroppedRecords = droppedRecords.filter(record => record !== delRecord)
    const newDropBox = dropBox.filter(record  => record.recordId !== delRecord.recordId)
    setDroppedRecords(newDroppedRecords)
    setDropBox(newDropBox)
  }

  function getItem(event) {
    const item = droppedRecords.find(record => record.recordId == event);
    return {name: item.itemName, size: item.size, description: item.description, vendor: item.vendor, stock: item.stock, price: item.price};
  }

  return (
    <div 
        className="img-wrap"    
        style={{ left: translate.x, top: translate.y }} 
        draggable="false" 
        onPointerDown={handlePointerDown} 
        onPointerMove={handlePointerMove} 
        onPointerOver={handleOnPointerOver}
        onPointerLeave={handleOnPointerLeave}
        key={el.recordId}
        >
          <img style={{ width: width }} draggable="false" className='dropped-image' src={el.imgSrc}></img>
          {hovering && <span draggable="false" className="close" onClick={deleteItem}>&times;</span>}
          {hovering && <span draggable="false" className="resize-active" onPointerDown={handleResizePointerDown} onPointerMove={handleResizing}>&harr;</span>}
          {hovering && 
          <div className='overlay-div'>
            <p className='overlay-p'><span className='overlay-title'>Name:</span> {getItem(el.recordId).name}</p>
            <p className='overlay-p'><span className='overlay-title'>Size:</span> {getItem(el.recordId).size}</p>
            <p className='overlay-p'><span className='overlay-title'>Description:</span> {getItem(el.recordId).description}</p>
            <p className='overlay-p'><span className='overlay-title'>Vendor:</span> {getItem(el.recordId).vendor}</p>
            <p className='overlay-p'><span className='overlay-title'>Price:</span> {getItem(el.recordId).price}$</p>
            <p className='overlay-p'><span className='overlay-title'>Stock:</span> {getItem(el.recordId).stock}</p>
          </div>}
    </div>
  
  )
}

export default DropBoxElement