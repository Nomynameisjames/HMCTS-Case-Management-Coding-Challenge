import express from 'express';
import { getAllTasks, getTaskById, addnewTask, deleteTask, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.post('/', addnewTask);

router.put('/:id', updateTaskStatus);

router.delete('/:id', deleteTask);

export default router;
