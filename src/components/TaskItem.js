import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function TaskItem({ task, category , onDelete , onEdit }) {
 
  return (
    <Card className="task-card">
      <CardContent className="task-content">
        <Box className="task-info">
          <Typography className="task-text">{task}</Typography>
          <Typography className="task-category" style={{ backgroundColor: '#e91e63' }}>
            {category}
          </Typography>
        </Box>
        <Box className="task-actions">
          <IconButton color="primary" size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskItem;