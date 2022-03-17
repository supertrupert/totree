import React, { useState } from 'react';
import { useBase, Button } from '@airtable/blocks/ui';

const Checkout = ({ dropBoxOne, dropBoxTwo, currentUser }) => {
    const [checkoutActive, setCheckoutActive] = useState(false);

    function handleClick () {
        setCheckoutActive(!checkoutActive);
    }

    const base = useBase();
    const setsTable = base.getTableByName("Client sets");

    function handleCheckout () {
        // load all records
        const sofaRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Sofa"));
        const sofaRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Sofa"));
        const chairRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Chair"));
        const chairRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Chair"));
        const rugRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Rug"));
        const rugRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Rug"));
        const coffeeTableRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Coffee table"));
        const coffeeTableRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Coffee table"));
        const dresserRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Dresser"));
        const dresserRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Dresser"));
        const nightstandRecordsOne = dropBoxOne.filter(record => record.recordType.includes("Nightstand"));
        const nightstandRecordsTwo = dropBoxTwo.filter(record => record.recordType.includes("Nightstand"));

        // create record for set a
        setsTable.createRecordAsync({
            "Set": {name: "a"},
            "Sofa": sofaRecordsOne.map(sofa => {return {id: sofa.recordId}}),
            "Chair": chairRecordsOne.map(chair => {return {id: chair.recordId}}),
            "Rug": rugRecordsOne.map(rug => {return {id: rug.recordId}}),
            "Coffee table": coffeeTableRecordsOne.map(coffeeTable => {return {id: coffeeTable.recordId}}),
            "Dresser": dresserRecordsOne.map(dresser => {return {id: dresser.recordId}}),
            "Nightstand": nightstandRecordsOne.map(nightstand => {return {id: nightstand.recordId}}),
            "QuizRecord": [{id: currentUser.current}],
        })

        // create record for set b
        setsTable.createRecordAsync({
            "Set": {name: "b"},
            "Sofa": sofaRecordsTwo.map(sofa => {return {id: sofa.recordId}}),
            "Chair": chairRecordsTwo.map(chair => {return {id: chair.recordId}}),
            "Rug": rugRecordsTwo.map(rug => {return {id: rug.recordId}}),
            "Coffee table": coffeeTableRecordsTwo.map(coffeeTable => {return {id: coffeeTable.recordId}}),
            "Dresser": dresserRecordsTwo.map(dresser => {return {id: dresser.recordId}}),
            "Nightstand": nightstandRecordsTwo.map(nightstand => {return {id: nightstand.recordId}}),
            "QuizRecord": [{id: currentUser.current}],
        })
    }

  return (
    <div className='checkout'>
        {!checkoutActive && <div onClick={handleClick} className='expand-checkout'>&#8593;</div>}
        {checkoutActive && <div onClick={handleClick} className='expand-checkout'>&#8595;</div>}
        {checkoutActive && 
        <div className='checkout-content'>
            <div className='set set1'>
                <h2>Set 1</h2>
                <ul>
                    {dropBoxOne && dropBoxOne.map(el => <li>{el.recordType}: {el.itemName}</li>)}
                </ul>  
            </div>
            <div className='set set2'>
                <h2>Set 2</h2>
                <ul>
                    {dropBoxTwo && dropBoxTwo.map(el => <li>{el.recordType}: {el.itemName}</li>)}
                </ul>  
            </div>
            <Button onClick={handleCheckout} variant="primary">Create Sets in Airtable</Button>
        </div>}
    </div>
  )
}

export default Checkout