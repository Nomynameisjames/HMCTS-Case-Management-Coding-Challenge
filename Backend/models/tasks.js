import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            reuired: false,
        },
        Status: {
            type: String,
            required: true,
        },
        Due: {
            type: Date,
            required: true,
        }
    }, {
        timestamp: true,
    }
);

const Tasks = mongoose.model('Task', taskSchema);



export default Tasks;
