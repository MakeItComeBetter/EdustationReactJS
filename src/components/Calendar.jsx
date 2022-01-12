import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const Calendar = () => {
  const [value, setValue] = React.useState(new Date());


  const changeDate = (e) => {
    console.log(e)
  }

  return (
    <div style={{width: 320, border: '1px solid black'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        className="timer_picker"
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </div>
  )
}

export default Calendar
