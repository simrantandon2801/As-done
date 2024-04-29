import React from 'react';
import Draggable from 'react-draggable';
import api from '../services/api';
import { Grid } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
	const mobile=useMediaQuery('(max-width:600px)');
    console.log(tasks, 'tasklist');
    const handleUpdateStatus = async (taskId, newStatus) => {
        console.log(newStatus, 'updated status');
        try {
            const updatedTask = await api.updateTaskStatus(taskId, newStatus);
            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

	const handleDeleteTask = async (taskId) => {
		console.log(taskId,)
        try {
            await api.deleteTask(taskId);
            onTaskDeleted(taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

	return (
		<Grid container lg={12} xs={12}>
			<Grid container lg={10} xs={12} sx={{margin:'auto'}}>

			
        <Grid container lg={12} xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* To Do Column */}
            <Grid item lg={4} xs={12} style={{ flex: 1, border: '2px solid red', padding: '10px', marginRight: '10px' }}>
                <h2 style={{fontSize:mobile?'12px':'36px',}}>To Do</h2>
                {tasks
                    .filter(task => task.status === 'To Do')
                    .map(task => (
                        <Draggable key={task._id} onStop={(e, data) => {
                            // Find out the target status based on the position where it's dropped
                            let status = 'To Do';
                            if (data.x > 100 ) {
                                status = 'In Progress';
                            } 
                            handleUpdateStatus(task._id, status);
                        }}>
                           <div>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    margin: '8px',
                                    padding: '8px',fontSize:mobile?'12px':'24px',
                                    backgroundColor: 'white',
                                }}
                            >
                                <span>Title:-{task.title}</span><br/>
                                <span>Description:-{task.description}</span>
							</div>
							<button onClick={() => handleDeleteTask(task._id)}><DeleteOutlineIcon /></button>
							</div>
                        
                        </Draggable>
                    ))}
            </Grid>

            {/* In Progress Column */}
            <Grid item lg={4} xs={12} style={{ flex: 1, border: '2px solid red', padding: '10px', marginRight: '10px' }}>
                <h2 style={{fontSize:mobile?'12px':'36px',}}>In Progress</h2>
                {tasks
                    .filter(task => task.status === 'In Progress')
                    .map(task => (
                        <Draggable key={task._id} onStop={(e, data) => {
                            // Find out the target status based on the position where it's dropped
                            let status = 'To Do';
                            if (data.x > 100) {
                                status = 'Done';
                            } 
                            handleUpdateStatus(task._id, status);
                        }}><div>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    margin: '8px',
                                    padding: '8px',fontSize:mobile?'12px':'24px',
                                    backgroundColor: 'white',
                                }}
                            >
                                  <span>Title:-{task.title}</span><br/>
                                <span>Description:-{task.description}</span>
							</div>
							<button onClick={() => handleDeleteTask(task._id)}><DeleteOutlineIcon /></button>
							</div>
                        </Draggable>
                    ))}
            </Grid>

            {/* Completed Column */}
            <Grid item lg={4} xs={12} style={{ flex: 1, border: '2px solid red', padding: '10px' }}>
                <h2 style={{fontSize:mobile?'12px':'36px',}}>Completed</h2>
                {tasks
                    .filter(task => task.status === 'Done')
                    .map(task => (
                        <Draggable key={task._id} onStop={(e, data) => {
                            // Find out the target status based on the position where it's dropped
                            let status = 'To Do';
                            if (data.x > 100) {
                                status = 'In Progress';
                            } 
                            handleUpdateStatus(task._id, status);
                        }}>
                            <div>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    margin: '8px',
                                    padding: '8px',fontSize:mobile?'12px':'24px',
                                    backgroundColor: 'white',
                                }}
                            >
                                 <span>Title:-{task.title}</span><br/>
                                <span>Description:-{task.description}</span>
							</div>
							<button onClick={() => handleDeleteTask(task._id)}><DeleteOutlineIcon /></button>
							</div>
                        
                        </Draggable>
                    ))}
            </Grid>
				</Grid>
				</Grid>
		</Grid>
    );
};

export default TaskList;
