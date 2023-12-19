import React from 'react'
import EntityGrid from './Components/EntityGrid';
import MyFeatures from './MyFeatures';
import ChatbotButton from './Components/ChatbotButton';
// import BarChart from './Components/BarChart';



export default function FeatureHomeDefault() {
  return (
    <>
    <div className="">
        <EntityGrid></EntityGrid>
        {/* <BarChart></BarChart> */}
        <div className="">
          <MyFeatures></MyFeatures>
        </div>
      </div>
      <ChatbotButton />
    </>
  )
}




