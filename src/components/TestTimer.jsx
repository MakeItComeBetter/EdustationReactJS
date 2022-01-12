import React, { useEffect, useState } from 'react';

const TestTimer = () => {

  const [clockTime, setClockTime] = useState(10);
  console.log("render")
  useEffect(() => {
    if(clockTime === 0){
      setClockTime(10);
      console.log("Done")
    }
    const timer = setInterval(() => setClockTime(() => clockTime - 1), 1000);
    console.log("working")
    return () => {
      console.log("clear")
      clearInterval(timer);
    };
  }, [clockTime])

  return (
    <div>
      {clockTime}
    </div>
  )
}

export default TestTimer
