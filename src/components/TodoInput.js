import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const categories = [
  { value: 'gym', label: 'Gym' },
  { value: 'shop', label: 'Shop' },
  { value: 'education', label: 'Education' },
];

function TodoInput({ task, setTask, category, setCategory , onAdd}) {
  return (
    <Box className="input-section">
      <TextField
        label="Yeni tapşırıq"
        variant="outlined"
        className="todo-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <FormControl className="category-select">
        <InputLabel>Kateqoriya</InputLabel>
        <Select
          defaultValue="gym"
          label="Kateqoriya"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" className="add-button" onClick={onAdd}>
        Əlavə et
      </Button>
    </Box>
  );
}

export default TodoInput;