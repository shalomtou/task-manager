import  { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
} from "@mui/material";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Provider store={store}>
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h6'>Task Manager</Typography>
          <Button
            color='inherit'
            sx={{ m: 2 }}
            onClick={handleOpen}
            variant='outlined'
          >
            Add New Task
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' style={{ marginTop: "2rem" }}>
        <TaskList />
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='add-task-modal'
        aria-describedby='add-new-task-form'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: 3,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              width: "50%",
            }}
          >
            <TaskForm onClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </Provider>
  );
};

export default App;
