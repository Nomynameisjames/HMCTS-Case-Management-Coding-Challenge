import express from 'express';
import { getAllTasks,
        getTaskById,
        addnewTask,
        deleteTask,
        updateTaskStatus,
        emptyBin,
        getDeletedTasks,
        restoreTask
     } from '../controllers/taskController.js';

// Initialize the router
const router = express.Router();

// Route to fetch all tasks
router.get('/', getAllTasks);

router.get('/bin', getDeletedTasks);

// Route to fetch a single task by ID
router.get('/:id', getTaskById);

// Route to create a new task
router.post('/', addnewTask);

// Route to update the status of a task by ID
router.put('/:id', updateTaskStatus);

router.put('/restore/:id', restoreTask);

router.delete('/bin', emptyBin);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

export default router;