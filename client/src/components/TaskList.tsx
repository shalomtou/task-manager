import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../redux/tasksReducer.ts";
import { fetchTasks, deleteTask } from "../api/api.ts";
import {
  CircularProgress,
  Grid,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import EditModal from "./EditTask";

const TaskList = () => {
  const dispatch = useDispatch();
  const {
    tasks,
    loading,
    error,
  }: { tasks: Task[]; loading: boolean; error: string | null } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleOpenEditModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedTaskId(null);
    setEditModalOpen(false);
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    return date.toLocaleString();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant='body1' color='error'>
        {error}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item key={task.id} xs={12}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant='subtitle2'>
              Last Update: {formatDueDate(task?.updatedAt)}
            </Typography>
            <Typography variant='h6'>{task.title}</Typography>
            <Typography variant='body1'>{task.description}</Typography>

            <Typography variant='body2'>
              Due Date: {formatDueDate(task.dueDate)}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleDelete(task.id)}
              style={{ marginRight: "1rem" }}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleOpenEditModal(task.id)}
            >
              Edit
            </Button>
          </Paper>
        </Grid>
      ))}
      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        task={tasks[selectedTaskId - 1]}
      />
    </Grid>
  );
};

export default TaskList;
