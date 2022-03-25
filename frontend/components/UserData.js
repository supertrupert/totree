import React, { useState, useEffect } from 'react'
import { Select } from '@airtable/blocks/ui'

const UserData = ({ quizRecords, recordActionData, setUserOptions }) => {

    const [quizRecordOptions, setQuizRecordOptions] = useState([]);
    const [quizRecordSelected, setQuizRecordSelected] = useState("");
    
    useEffect(() => {
        const quizRecordOptions = quizRecords.map(record => {
            const recordName = record.getCellValue("Name");
            const recordId = record.id;
            return {value: recordId, label: recordName}
        });
        quizRecordOptions.unshift({value: "noUser", label: "Please select a customer"})
        if(quizRecordOptions.length >= 1) {
            setQuizRecordOptions(quizRecordOptions);
            setQuizRecordSelected(quizRecordOptions[0].value)          
        }
    }, [quizRecords])

    // let record = null;

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
        })
    }
    return <Select options={quizRecordOptions} value={quizRecordSelected} onChange={handleChange}></Select>
}

export default UserData