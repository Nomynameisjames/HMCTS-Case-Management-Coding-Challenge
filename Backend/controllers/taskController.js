import Tasks from '../models/tasks.js';

/**
 * Fetches all tasks from the database and sorts them by due date in ascending order.
 * Returns a message if no tasks are found.
 */
const getAllTasks = async (req, res) => {
    try {
        const data = await Tasks.find({ isDeleted: false }).sort({ Due: 1 }); //await Tasks.find({}).sort({ Due: 1 });
        if (!data || data.length === 0) {
            return res.status(200).json({ data: [], msg: 'No tasks to view, create a new task'});
        }
        res.status(200).json({ "data": data });
    }
    catch (error) {
        res.status(500).json({ msg: `error occurred while fetching tasks ${error.message}`});
    }
};

const getDeletedTasks = async (req, res) => {
    try {
        const deletedTasks = await Tasks.find({ isDeleted: true }).sort({ Due: 1 });
        if (!deletedTasks || deletedTasks.length === 0) {
            return res.status(200).json({ data: [], msg: 'Bin is empty' });
        }
        res.status(200).json({ data: deletedTasks });
    } catch (error) {
        res.status(500).json({ msg: `Error fetching deleted tasks: ${error.message}` });
    }
};

const restoreTask = async (req, res) => {
    const id = req.params.id;
    try {
        const restored = await Tasks.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        if (!restored) {
            return res.status(404).json({ success: false, msg: `Task not found` });
        }
        res.status(200).json({ success: true, msg: 'Task restored successfully', data: restored });
    } catch (error) {
        res.status(500).json({ success: false, msg: `Error restoring task: ${error.message}` });
    }
};

/**
 * Fetches a single task by its ID.
 * Returns 404 if the task is not found.
 */
const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const tasks = await Tasks.findById(id);
        if (!tasks) {
            return res.status(404).json({msg: `can't find a task with id ${id}`});
        }
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ msg: `error occurred fetching task ${error.message}`});
    }
}

/**
 * Updates the status of a specific task by its ID.
 * Returns 404 if the task is not found by
 * creating a new Error and calling the next function passed to the custom error handler.
 */
const updateTaskStatus = async (req, res, next) => {
    const id = req.params.id;
    const status = req.body;
    try {
        const newStatus = await Tasks.findByIdAndUpdate(id, status, { new: true });
        if (!newStatus) {
            const errorMsg = new Error(`Task with requested id ${id} not found.`);
            errorMsg.status = 404;
            return next(errorMsg);
        }
        res.status(200).json({success: true, data: newStatus});
    } catch (error) {
        res.status(500).json({ success: false, msg: `error occurred updating task with id ${id} ${error.message}`});
    }
}

/**
 * Creates a new task in the database.
 * Validates that both title and due date are provided.
 */
const addnewTask = async (req, res, next) => {
    const task  = req.body;
    if (!task.Title || !task.Due) {
        const errorMsg = new Error("Title and Due date are required.");
        errorMsg.status = 400;
        return next(errorMsg);
    }
    // set default status to pending
    task.Status = "Pending"
    task.Due = new Date(req.body.Due)
    const data = new Tasks(task);
    try {
        await data.save();
        res.status(201).json({ "data": data});
    } 
    catch (error) {
        console.log(`Error creating new task ${error.message}`)
        res.status(500).json({ msg: error.message});

    }
};

/**
 * Deletes a task from the database by its ID.
 */
const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await Tasks.findByIdAndUpdate(id, { isDeleted: true }, { new: true }); //await Tasks.findByIdAndDelete(id); 
        if (!updated) {
            return res.status(404).json({ success: false, msg: `Task not found with id ${id}` });
        }
        res.status(200).json({ success: true, msg: `Task moved to bin`, data: updated }); //res.status(200).json({success: true,  msg: `Successfully removed task with id ${id}`});
    }
    catch (error) {
        res.status(500).json({success: false, msg: `error occurred while deleting item ${error.message}`});
    }
};

const emptyBin = async (req, res) => {
    try {
        const result = await Tasks.deleteMany({ isDeleted: true });
        res.status(200).json({ success: true, msg: `Bin emptied, deleted ${result.deletedCount} task(s)` });
    } catch (error) {
        res.status(500).json({ success: false, msg: `Error emptying bin: ${error.message}` });
    }
};

export { getAllTasks, getTaskById, addnewTask, updateTaskStatus, deleteTask, emptyBin, restoreTask, getDeletedTasks };