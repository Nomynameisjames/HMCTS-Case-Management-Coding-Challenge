import { RiSafariFill } from "react-icons/ri";
import { create } from "zustand";

const Tasks = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    loading: false,
    createTask: async (newTask) => {
        if (!newTask.Title || !newTask.Due) {
            return ({ success: false, message: "Please fill in a title and set a due date"});
        }
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newTask)
        })
        const data = await res.json();
        set((state) => ({tasks:[...state.tasks, data.data]}));
        return ({ success: true, message: "New Task Created!"});

    },
    fetchTasks: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/tasks");
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to fetch tasks");
          }
    
          const allTask = await res.json();
          set({ tasks: allTask.data });
        } catch (error) {
          console.error("Fetch error:", error.message);
        } finally {
          set({ loading: false });
        }
      },
    deleteTask: async (id) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "DELETE"
        })
        const data = await res.json();
        console.log(data)
        if (!data.success) {
            return({success: false, message:  data.msg});
        }
     set((state) => ({tasks: state.tasks.filter((task) => task._id !== id)}))
     return({ success: true, message: data.msg});
    },
    updateTask: async (id, taskInfo) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(taskInfo)
        });
        const data = await res.json()
        if (!data.success) {
            return({success: false, message:  data.msg});
        }
        set((state) => ({tasks: state.tasks.map((task) => task._id === id ? data.data: task)}))
        return({ success: true, message: data.msg});

    }
}) 
);

export default Tasks;