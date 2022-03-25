import React, { useEffect, useState } from 'react';
import { Button, Box, Select } from "@airtable/blocks/ui";
import RecordCard from './RecordCard'
import UserData from './UserData'

const SideBar = ({ setDraggedEl, options, recordProps, droppedRecords, dropBox, setDropBox, setDroppedRecords, quizRecords, recordActionData, setCurrentUser }) => {

    const [value, setValue] = useState("All");

    function handleSelectChange (event) {
        setValue(event);
    }

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
      handleRecordChange()
    }, [droppedRecords])

    useEffect(() => {
      handleRecordChange();
      setCurrentUser(userOptions.recordId);
    }, [userOptions])

    function handleRecordChange () {
      // handle no selection case
      if(userOptions.value == "noUser") {
        setFilteredOptions({label: "No customer selected", label: "No customer selected"})
        setFilteredRecords([]);
      }

      const droppedRecordsFilteredRecords = recordProps.filter((record) => !droppedRecords.includes(record));
      // user filtering
      let userOptionsFilteredRecords = [];

      if(userOptions.rooms) {
        recordProps.filter(record => {
            if(userOptions.rooms[0].substring(0,5) == "Other" && styleMatching(record)) {
              filterSpecificRoom(record)
              // activate again when using availability function
              // if(checkAvailability(record)) filterSpecificRoom(record);
              return;
            }
            if(roomMatching(record) && styleMatching(record)) {
              filterSpecificRoom(record)
              // activate again when using availability function
              // if(checkAvailability(record)) filterSpecificRoom(record); 
            }            

          function roomMatching (record) {
            let roomMatching = undefined;
            if(record.primaryRooms !== null) {
              roomMatching = record.primaryRooms.find(room => userOptions.rooms.includes(room.name));
            }
            if(roomMatching) return true;
          }

          function styleMatching (record) {
            let styleMatching = undefined;
            if(record.style !== null) {
              styleMatching = record.style.find(style => userOptions.primaryStyle.includes(style.name))
            }
            if(styleMatching) return true;
          }

          // Availability disabled for now (but works!)

          // function checkAvailability (record) {
          //   if(userOptions.availability == "I need my furniture yesterday") if(readyToShip(record)) return true;
          //   if(userOptions.availability == "I'm in no immediate rush") return true;
          //   if(userOptions.availability == "It's not dire, but I'd like to get my furniture by ______") if(inStock(record)) return true;
          // }

          //   function readyToShip (record) {
          //     if(record.readyToShip == true) {
          //       return true;
          //     } 
          //   }

          //   function inStock (record) {
          //     if(record.inStock == true) {
          //       return true;
          //     } 
          //   }

          function filterSpecificRoom (record) {
            if(userOptions.rooms.includes("Living room")) {
              // // check if sofa measurements are within 10 inches of uploaded measurements
              let sofaFits = false;
              if(record.width !== null && userOptions.sofaWidth !== null) {
                if((userOptions.sofaWidth > (record.width - 10)) && (userOptions.sofaWidth < (record.width + 10))) {
                  sofaFits = true;
                }
              }
              if(isNaN(userOptions.sofaWidth)) sofaFits = true;     

              // check sofa shape
              let sofaShapeFits = false;
              if(record.subType !== null) {
                const sofaShapeMatch = record.subType.filter(type => type.name.includes(`Sofa ${userOptions.sofaShape}`)); 
                if(sofaShapeMatch.length > 0) sofaShapeFits = true;
              }

              // check sofa materials
              let sofaMaterialFits = false;
              if(userOptions.sofaMaterial == "No preference") sofaMaterialFits = true;
              if(userOptions.sofaMaterial == "I'm only interested in fabric options") {
                if(record.materials === "Fabric") sofaMaterialFits = true;  
              }
              if(userOptions.sofaMaterial == "I'm only interested in leather options") {
                if(record.materials === "Leather") sofaMaterialFits = true; 
              }     
              
              // check sofa specifics

              let sofaSpecificsFits = false;
              let userOptionsArr = [];
              if(userOptions.sofaSpecifics !== null) {
                userOptionsArr = userOptions.sofaSpecifics.map(spec => spec.name);
              }
              let recordOptionsArr = null;
              if(record.sofaSpecifics !== null) {
                recordOptionsArr = record.sofaSpecifics.map(spec => spec.name);
              }
              
              if(userOptionsArr[0] === "No, whatever you think will work best" || userOptionsArr.length === 0) sofaSpecificsFits = true;    
                 
              if(record.sofaSpecifics !== null) {     
                const specificMatch = userOptionsArr.filter(option => recordOptionsArr.includes(option));
                if(specificMatch.length > 0) sofaSpecificsFits = true;  
              }      
              
              // check for chair type
              let loungeChairFits = false;
              if(userOptions.loungeChair !== null) {
                if(record.subType !== null) {
                  const subTypeNameArr = record.subType.map(type => type.name.substring(0,14));
                  if(subTypeNameArr.includes("Lounge chair " + userOptions.loungeChair.name)) loungeChairFits = true;
                }
              }

              // check for chair material
              let chairMaterialFits = false;
              
              if(userOptions.chairMaterial == "No preference") chairMaterialFits = true;
              if(userOptions.chairMaterial == "I'm only interested in fabric options") {
                if(record.materials === "Fabric") chairMaterialFits = true;  
              }
              if(userOptions.chairMaterial == "I'm only interested in leather options") {
                if(record.materials === "Leather") chairMaterialFits = true; 
              } 

              if(sofaFits && sofaShapeFits && sofaMaterialFits && sofaSpecificsFits) userOptionsFilteredRecords.push(record);
              if(loungeChairFits && chairMaterialFits) userOptionsFilteredRecords.push(record);
            } 

            if(userOptions.rooms.includes("Bedroom")) {
              // check for bed size
              let bedSizeFits = false;
              if(userOptions.bedSize == "") bedSizeFits = true;
              if(userOptions.bedSize == record.bedSize) bedSizeFits = true;

              // check bed type
              let favBedFits = false;
              if(userOptions.favBed !== null) {
                if(record.subType !== null) {
                  const recordSubTypeName = record.subType.map(type => type.name.substring(4,5));
                  if(recordSubTypeName.includes(userOptions.favBed) && record.typeOverview == "bed") {
                    favBedFits = true;
                  } 
                }
              } else {
                favBedFits = true;
              }

              // check dresser size
              let dresserFits = false;
              if(record.width !== null && userOptions.dresserWidth !== null) {
                if((userOptions.dresserWidth > (record.width - 10)) && (userOptions.dresserWidth < (record.width + 10)) && record.typeOverview == "dresser") {
                  dresserFits = true;
                }
              }
              if(isNaN(userOptions.dresserWidth) && record.typeOverview == "dresser") dresserFits = true;

              // check nightstand size
              let nightstandFits = false;
              if(record.width !== null && userOptions.nightstandWidth !== null) {
                if((userOptions.nightstandWidth > (record.width - 10)) && (userOptions.nightstandWidth < (record.width + 10)) && record.typeOverview == "nightstand") {
                  nightstandFits = true;
                }
              }
              if(isNaN(userOptions.dresserWidth) && record.typeOverview == "nightstand") nightstandFits = true;

              // // bedroom additional furniture
              // if(userOptions.bedroomAddFurniture !== null && userOptions.bedroomAddFurniture[0].name !== "No") {
              //   console.log(userOptions.bedroomAddFurniture)
              // }

              if(bedSizeFits && favBedFits) userOptionsFilteredRecords.push(record);
              if(dresserFits) userOptionsFilteredRecords.push(record);
              if(nightstandFits) userOptionsFilteredRecords.push(record);
            }
          } 
        })
      }
      // filter for final records
      const finalRecords = droppedRecordsFilteredRecords.filter(record => userOptionsFilteredRecords.includes(record))
      // check which options
      const newOptions = options.filter(option => {
        const hasRecord = finalRecords.find(record => record.recordType == option.value);
        if(hasRecord) return true;
      })
      // check & update how many items per option
      const finalOptions = newOptions.map(option => {
        const optionCount = finalRecords.filter(record => record.recordType == option.value).length;
        return {...option, label: option.value + " (" + optionCount + ")"}
      })
      // add all to final options
      finalOptions.unshift({value: "All", label: "All" + " (" + finalRecords.length + ")"});
      setFilteredOptions(finalOptions)
      setFilteredRecords(finalRecords)
    }

    function handleAutoPopulation () {
      const autoPopulateArr = [];   
      if(userOptions.rooms.includes("Living room")) {
        // then only select pieces for living room
        // sofa
        const sofa = filteredRecords.find(record => {
          if(record.recordType.substring(0,4) == "Sofa") {
            return true;
          }
        })
        if(sofa) autoPopulateArr.push(sofa);
        // rug...
      }
      if(autoPopulateArr.length > 0) {
        autoPopulateArr.forEach(record => {
          setDroppedRecords([...droppedRecords, record]);
          setDropBox([...dropBox, {...record, dropbox: 1}]);
        })
      }
    }

    return (
    <>
      <h3>Quiz user:</h3>
      <UserData quizRecords={quizRecords} recordActionData={recordActionData} setUserOptions={setUserOptions}></UserData> 
      <p>Room(s): {userOptions.rooms ? userOptions.rooms.map((room, i, arr) => {if(arr.length - 1 === i) {return room + ""} else {return room + ", "}}) : "No customer selected"}</p>
      <p>Pop of color: {userOptions.popOfColor ? userOptions.popOfColor + " (Scale: " + userOptions.popOfColorScale + ")" : "No pop of color given"}</p>
      <h3>Filtered furniture: {filteredRecords.length + " items"}</h3>
      <Button onClick={handleAutoPopulation} marginBottom="10px">Autopopulate</Button>
      <Select className='select-button' options={filteredOptions} value={value} onChange={handleSelectChange} width="100%"/>
      <Box overflowY="scroll" border="thick" backgroundColor="lightGray1">
        {value == "All" 
        ? filteredRecords.map(record => {
            return <RecordCard setDraggedEl={setDraggedEl} popOfColor={userOptions.popOfColor} key={record.recordId} record={record} />
        })
        : filteredRecords.map(record => {
          if(record.recordType == value) {
            return (
              <RecordCard setDraggedEl={setDraggedEl} popOfColor={userOptions.popOfColor} key={record.recordId} record={record} />
            )
          }
        })}
      </Box>
    </>
    )
  };

export default SideBar;
