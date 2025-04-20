import Tasks from '../models/tasks.js';


const getAllTasks = async (req, res, next) => {
    try {
        const data = await Tasks.find({}).sort({ Due: 1 });
        if (!data || data.length === 0) {
            return res.status(200).json({ data: [], msg: 'No tasks to view, create a new task'});
        }
        res.status(200).json({ "data": data });
    }
    catch (error) {
        res.status(500).json({ msg: `error occurred while fetching tasks ${error.message}`});
    }
};

const getTaskById = async (req, res, next) => {
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

const updateTaskStatus = async (req, res, next) => {
    const id = req.params.id;
    const status = req.body;
    try {
        const newStatus = await Tasks.findByIdAndUpdate(id, status, { new: true });
        res.status(201).json({success: true, data: newStatus});

        
    } catch (error) {
        res.status(500).json({ success: false, msg: `error occurred updating task with id ${id} ${error.message}`});
    }

}
const addnewTask = async (req, res, next) => {
    const task  = req.body;
    if (!task.Title || !task.Due) {
        const errorMsg = new Error(`${error}`);
        errorMsg.status = 400;
        return next(errorMsg);
    }
    task.Status = "Pending"
    task.Due = new Date(req.body.Due)
    const data = new Tasks(task);
    try {
        await data.save();
        res.status(201).json(data);
    } 
    catch (error) {
        console.log(`Error creating new task ${error.message}`)
        res.status(500).json({ msg: error.message});

    }
};


const deleteTask = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Tasks.findByIdAndDelete(id);
        res.status(200).json({success: true,  msg: `Successfully removed task with id ${id}`});
    }
    catch (error) {
        res.status(500).json({success: false, msg: `error occurred while deleting item ${error.message}`});
    }
};

export { getAllTasks, getTaskById, addnewTask, updateTaskStatus, deleteTask };  