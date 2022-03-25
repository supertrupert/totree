import { useBase, initializeBlock, loadCSSFromString, useRecordActionData } from '@airtable/blocks/ui';
import React, { useRef, useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import styles from './styles';
import DropBox from './components/DropBox';

loadCSSFromString(styles);

function Main() {
    const base = useBase();

    const recordActionData = useRecordActionData();
    const [recordProps, setRecordProps] = useState([]);
    const [quizRecords, setQuizRecords] = useState([]);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        async function loadEverything() {
            const furnitureTable = base.getTableByName("Furniture");
            const quizTable = base.getTableByName("BETATEST D")
            const queryResult = furnitureTable.selectRecords();
            const quizQueryResult = quizTable.selectRecords();
            await queryResult.loadDataAsync();
            await quizQueryResult.loadDataAsync();
            const recordsToFilter = queryResult.records;
            const records = recordsToFilter.filter(record => (record.getCellValue("Type") !== null && record.getCellValue("Vendor") !== null && record.getCellValue("type-overview") !== null));
            const quizRecords = quizQueryResult.records;
            // default image + name festlegen 
            const recordProps = records.map(record => {
                const recordUrl = record.url;
                const recordId = record.id;
                const recordType = record.getCellValue("Type")[0].name;
                const primaryRooms = record.getCellValue("Primary room setting");
                const style = record.getCellValue("Style");
                const img = record.getCellValue("Images");
                const size = record.getCellValue("Size (WxLxH)");
                const description = record.getCellValue("Client description");
                const vendor = record.getCellValue("Vendor")[0].name;
                const price = record.getCellValue("Client cost");
                const stock = record.getCellValue("In stock");
                let popOfColor = null;
                if(record.getCellValue("Pop of color") !== null) {
                    popOfColor = record.getCellValue("Pop of color")[0].name;
                }
                const readyToShip = record.getCellValue("Ready to ship");
                const subType = record.getCellValue("Sub-type");
                const width = parseInt(record.getCellValue("width"));
                const typeOverview = record.getCellValue("type-overview").name;
                let materials = null;
                if(record.getCellValue("Materials") !== null) {
                    materials = record.getCellValue("Materials").name;
                }
                let sofaSpecifics = null;
                if(record.getCellValue("Sofa specifics") !== null) {
                    sofaSpecifics = record.getCellValue("Sofa specifics");
                }
                let imgSrc = "";
                if(img) {
                    const thumbnail = img[0].thumbnails;
                    if(thumbnail) {
                    imgSrc = thumbnail.large.url;
                    }
                }
                let itemName = record.getCellValue("Name");
                if(itemName) {
                    itemName = itemName.trim();
                }
                return {imgSrc, itemName, recordUrl, recordId, recordType, primaryRooms, style, size, description, vendor, price, stock, popOfColor, readyToShip, subType, width, typeOverview, materials, sofaSpecifics};
            })
            
            const typeField = furnitureTable.getFieldByName("Type");  
            let options = [{value: "All", label: "All"}]; 
            typeField.options.choices.forEach(item => {
                // calculate array length to display amount of furniture items per type
                const allTypeRecords = records.filter(record => (record.getCellValue("Type")[0].name == item.name));
                const recordsArrayLength = allTypeRecords.length;
                const itemName = item.name + " ("+ recordsArrayLength + ") ";
                if(recordsArrayLength > 0) {
                    options.push({value: item.name, label: itemName})
                }
            });

            setQuizRecords(quizRecords);
            setRecordProps(recordProps);
            setOptions(options);
        };
        loadEverything();      
    }, []);

    const draggedEl = useRef(null);
    
    const setDraggedEl = (el) => {
        draggedEl.current = el;
    }

    const [droppedRecords, setDroppedRecords] = useState([]);

    const [dropBox, setDropBox] = useState([]);

    const currentUser = useRef(null);

    const setCurrentUser = (recordId) => {
        currentUser.current = recordId;
    }

    return (
    <>
        <div className="container">
            <div className="sidebar">
                <SideBar 
                    setDraggedEl={setDraggedEl} 
                    setCurrentUser={setCurrentUser}
                    options={options}
                    setOptions={setOptions}
                    recordProps={recordProps}
                    droppedRecords={droppedRecords}
                    setDroppedRecords={setDroppedRecords}
                    dropBox={dropBox}
                    setDropBox={setDropBox}
                    quizRecords={quizRecords}
                    recordActionData={recordActionData}>
                </SideBar>
            </div>
            <div className="content">
                <DropBox 
                    recordProps={recordProps} 
                    draggedEl={draggedEl}
                    recordProps={recordProps}
                    setDroppedRecords={setDroppedRecords}
                    droppedRecords={droppedRecords}
                    currentUser={currentUser}
                    dropBox={dropBox}
                    setDropBox={setDropBox}>
                </DropBox>
            </div>
        </div>  
    </>
    
    )
}

initializeBlock(() => <Main />)
