import React, { useEffect, useState } from 'react';
import DropBoxElement from './DropBoxElement';
import Checkout from './Checkout';

const DropBox = ({recordProps, draggedEl, setDroppedRecords, droppedRecords, currentUser, dropBox, setDropBox}) => {

    const handleDrop = event => {
        event.stopPropagation();
        event.preventDefault();
        const draggedRecord = recordProps.filter(record => record.recordId == draggedEl.current);
        if(event.target.getAttribute("data-id") == 1) {
            // 1= magic value
            setDropBox([...dropBox, {...draggedRecord[0], dropbox: 1}]);
        }
        if(event.target.getAttribute("data-id") == 2) {
            setDropBox([...dropBox, {...draggedRecord[0], dropbox: 2}]);
        }
        setDroppedRecords([...droppedRecords, draggedRecord[0]]);
        event.target.classList.remove("active");
    }    

    const handleDragLeave = event => {
        event.stopPropagation();
        event.preventDefault();
        event.target.classList.remove("active");
    };

    const handleDragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleDragEnter = event => {
        event.stopPropagation();
        event.preventDefault();
        event.target.classList.add("active");  
    };
    
    const dropBoxOne = dropBox.filter(el => el.dropbox == 1);
    const dropBoxTwo = dropBox.filter(el => el.dropbox == 2);
  
  return (<>
        <div 
            className="drop-box"
            onDragEnter={handleDragEnter} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop}
            data-id="1">
            {dropBox && dropBoxOne.map((el, i) => {
                return <DropBoxElement key={i} el={el} dropBox={dropBox} setDropBox={setDropBox} droppedRecords={droppedRecords} setDroppedRecords={setDroppedRecords}></DropBoxElement>
            })}          
        </div>
        <div className="drop-box"
            onDragEnter={handleDragEnter} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop}
            data-id="2">
            {dropBox && dropBoxTwo.map((el, i) => {
                return <DropBoxElement key={i} el={el} dropBox={dropBox} setDropBox={setDropBox} droppedRecords={droppedRecords} setDroppedRecords={setDroppedRecords}></DropBoxElement>
            })}
        </div>
        <Checkout currentUser={currentUser} dropBoxOne={dropBoxOne} dropBoxTwo={dropBoxTwo}></Checkout>
    </>
  )
}

export default DropBox