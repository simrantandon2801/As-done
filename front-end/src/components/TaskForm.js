// TaskForm.js
import React, { useState } from 'react';
import api from '../services/api';
import { Typography, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from '@mui/material';
import IM from './Create.png';
const TaskForm = ({ onTaskCreated }) => {
	const mobile=useMediaQuery('(max-width:600px)');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');

  const handleCreateTask = async () => {
    // Check if title is empty
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      const newTask = await api.createTask({ title, description, status });
      onTaskCreated(newTask);
      // Clear form fields
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <Typography style={{ fontSize: '36px', textAlign: 'center' }}>Task Management App</Typography>
      <Grid container alignItems="center" justifyContent="center" spacing={2} style={{marginTop:'20px',marginBottom:'20px'}}>
			  <Grid item lg={6} sx={{ justifyContent: 'center' }}>
				  <Grid item lg={12} xs={12}>
				  <Typography style={{ fontSize: '26px', textAlign: 'center' }}>Create Task:-</Typography>
					  
				  </Grid>
				  <Grid item lg={12} xs={12} style={{justifyContent:'center',display:'flex'}}>
				  <img src={IM} style={{width:"200px",height:"200px"}} />	  
					  </Grid>
				   </Grid>
			  <Grid item lg={6}>
				    <Grid item lg={12}>
				  <TextField
            label="Task"
            variant="filled"
            value={title}
            error={!!error}
            helperText={error}
            sx={{ backgroundColor: 'white', borderRadius: '2px', marginBottom: '10px',width: mobile?'100%':'30%' }}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(''); // Clear error when user starts typing
            }}
					  />
				  </Grid>
				  <Grid item lg={12}>
          <TextField
            label="Description"
            variant="filled"
            value={description}
            sx={{ backgroundColor: 'white', borderRadius: '2px', marginBottom: '10px',width: mobile?'100%':'30%' }}
            onChange={(e) => setDescription(e.target.value)}
					  />
				  </Grid>
				  <Grid item lg={12}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            sx={{ width: mobile?'100%':'30%', backgroundColor: 'white', borderRadius: '2px', marginBottom: '10px' }}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
					  </Select>
					  </Grid>
          <Button variant='contained' style={{textTransform:'none',textDecoration:'none',backgroundColor:'#fff',color:'#000'}} onClick={handleCreateTask}>Create Task</Button>
       
			  </Grid>
      </Grid>
    </div>
  );
};

export default TaskForm;
