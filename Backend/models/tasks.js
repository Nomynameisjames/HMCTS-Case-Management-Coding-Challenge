import mongoose from "mongoose";

// Define the schema for a task document in MongoDB
const taskSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true, // Title is mandatory
        },
        Description: {
            type: String,
            required: false, // Optional field
        },
        Status: {
            type: String,
            required: true, // Indicates task status (Pending and Completed)
        },
        Due: {
            type: Date,
            required: true, // Due date is mandatory
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, {
        timestamp: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create a Mongoose model named 'Task' based on the schema
const Tasks = mongoose.model('Task', taskSchema);

export default Tasks;