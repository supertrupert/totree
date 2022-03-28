import React, { useState, useEffect } from 'react'
import { Select } from '@airtable/blocks/ui'

const UserData = ({ quizRecords, recordActionData, setUserOptions }) => {

    const [quizRecordOptions, setQuizRecordOptions] = useState([]);
    const [quizRecordSelected, setQuizRecordSelected] = useState("");

    useEffect(() => {
        const quizRecordOptions = quizRecords.map(record => {
            let recordName = null;
            if(record.getCellValue("Name") == null) {
                recordName = "Entry has no name"
            } else {
                recordName = record.getCellValue("Name")
            };
            const recordId = record.id;
            return {value: recordId, label: recordName}
        });
        quizRecordOptions.unshift({value: "noUser", label: "Please select a customer"})
        if(quizRecordOptions.length >= 1) {
            setQuizRecordOptions(quizRecordOptions);
            setQuizRecordSelected(quizRecordOptions[0].value)          
        }
    }, [quizRecords])

    useEffect(() => {
        if(recordActionData !== null) {
            const recordId = recordActionData.recordId;
            const record = quizRecords.find(record => record.id == recordId);
            const recordName = record.getCellValue("Name");
            const option = quizRecordOptions.find(option => option.label == recordName);
            if(record !== undefined) {
                setQuizRecordSelected(option.value);
                loadQuizAnswers(record);
            }
        }
    }, [recordActionData]) 

    function handleChange (event) {
        setQuizRecordSelected(event);
        if(event == "noUser") {
            setUserOptions({value: "noUser"})
            return;
        }
        // find record by name
        const record = quizRecords.find(record => record.id == event)
        loadQuizAnswers(record)
    }

    function loadQuizAnswers (record) {
        const roomsbyName = record.getCellValue("Rooms").map(room => room.name);
        const primaryStylePref = record.getCellValue("#1 style survey").name;
        let popOfColor = null;
        let popOfColorScale = null;
        if(record.getCellValue("Pop of color family") !== null) {
            popOfColor = record.getCellValue("Pop of color family")[0].name;
            popOfColorScale = record.getCellValue("Pop of color scale");
        }
        const availability = record.getCellValue("When do you need your furniture?").name;
        let sofaShape = null;
        if(record.getCellValue("Favorite sofa") !== null) {
            sofaShape = record.getCellValue("Favorite sofa").name;
        }
        const sofaWidth = record.getCellValue("Sofa width");
        let sofaMaterial = null;
        if(record.getCellValue("Sofa material") !== null) {
            sofaMaterial = record.getCellValue("Sofa material").name;
        }
        
        let sofaSpecifics = null;
        if(record.getCellValue("Specifics for sofa") !== null) {
            sofaSpecifics = record.getCellValue("Specifics for sofa");
        }
        let loungeChair = null;
        if(record.getCellValue("Favorite lounge chair") !== null) {
            loungeChair = record.getCellValue("Favorite lounge chair");
        }
        let chairMaterial = null;
        if(record.getCellValue("Chair material") !== null) {
            chairMaterial = record.getCellValue("Chair material").name;
        }
        let bedSize = null;
        if(record.getCellValue("Bed size") !== null) {
            bedSize = record.getCellValue("Bed size").name;
        }
        const dresserWidth = record.getCellValue("Dresser width");
        const nightstandWidth = record.getCellValue("nightstand width");
        let favBed = null;
        if(record.getCellValue("fav bed") !== null) {
            favBed = record.getCellValue("fav bed").name;
        }
        let bedroomAddFurniture = null;
        if(record.getCellValue("Bedroom additional furniture")) {
            bedroomAddFurniture = record.getCellValue("Bedroom additional furniture")
        }
        setUserOptions({
            recordId: record.id, 
            rooms: roomsbyName, 
            primaryStyle: primaryStylePref, 
            popOfColor: popOfColor, 
            popOfColorScale:popOfColorScale, 
            availability: availability, 
            sofaShape: sofaShape,
            sofaWidth: parseInt(sofaWidth),
            sofaMaterial: sofaMaterial,
            sofaSpecifics: sofaSpecifics,
            loungeChair: loungeChair,
            chairMaterial: chairMaterial,
            bedSize: bedSize,
            dresserWidth: parseInt(dresserWidth),
            nightstandWidth: parseInt(nightstandWidth),
            favBed: favBed,
            bedroomAddFurniture: bedroomAddFurniture,
        })
    }
    return <Select style={{minHeight: "32px"}} options={quizRecordOptions} value={quizRecordSelected} onChange={handleChange}></Select>
}

export default UserData