// TaskFilter.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const TaskFilter = ({ onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState('All');

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setSelectedValue(selectedStatus); // Update selected value
    onFilterChange(selectedStatus);
  };

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{marginTop:'30px',marginBottom:'20px'}}>
      <Grid item>
        <Typography style={{ fontSize: '26px', textAlign: 'center' }}>Filter Tasks - {selectedValue}</Typography> {/* Display selected value */}
      </Grid>
      <Grid item > 
        <Select
          value={selectedValue} // Use selectedValue state variable
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Completed</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default TaskFilter;
