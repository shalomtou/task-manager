import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
} from "@mui/material";
import { Task } from "../redux/tasksReducer";
import { updateTask } from "../api/api";

interface EditTaskProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

const EditTask: React.FC<EditTaskProps> = ({ open, onClose, task }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editedTask) {
      const { name, value } = e.target;
      setEditedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (editedTask) {
      try {
        // Dispatch updateTask action
        await dispatch(updateTask(editedTask));
        onClose();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='edit-task-modal'
      aria-describedby='edit-task-form'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "2rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant='h5' gutterBottom>
            Edit Task
          </Typography>
          <TextField
            sx={{ my: 1 }}
            name='title'
            value={editedTask?.title || ""}
            onChange={handleInputChange}
            label='Title'
            fullWidth
            required
          />
          <TextField
            sx={{ my: 1 }}
            name='description'
            value={editedTask?.description || ""}
            onChange={handleInputChange}
            label='Description'
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            name='dueDate'
            type='datetime-local'
            value={editedTask?.dueDate ? editedTask.dueDate.slice(0, 16) : ""}
            onChange={handleInputChange}
            label='Due Date'
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: "1rem" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditTask;
