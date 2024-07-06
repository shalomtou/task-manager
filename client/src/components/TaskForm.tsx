import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { addTask } from "../api/api";

interface NewTask {
  title: string;
  description: string;
  dueDate: string;
}

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (newTask.title.trim() && newTask.dueDate) {
      dispatch(addTask(newTask));
      setNewTask({ title: "", description: "", dueDate: "" });
      onClose();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12}>
        <Typography variant='h5' gutterBottom>
          Add a New Task
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='title'
          value={newTask.title}
          onChange={handleInputChange}
          label='Title'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='description'
          value={newTask.description}
          onChange={handleInputChange}
          label='Description'
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='dueDate'
          type='datetime-local'
          value={newTask.dueDate}
          onChange={handleInputChange}
          label='Due Date'
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={handleSubmit}
        >
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
