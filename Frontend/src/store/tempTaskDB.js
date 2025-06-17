//import { resolveElements } from "framer-motion";
import { RiSafariFill } from "react-icons/ri";
import { create } from "zustand";



const Tasks = create((set) => ({
    tasks: [],
    binTasks: [],
    setTasks: (tasks) => set({ tasks }),
    setBinTasks: (binTasks) => set({ binTasks }),
    loading: false,
    createTask: async (newTask) => {
        if (!newTask.Title || !newTask.Due) {
            return ({ success: false, message: "Please fill in a title and set a due date"});
        }
        const res = await fetch("/api/v1/tasks", {
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
          const res = await fetch("/api/v1/tasks");
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to fetch tasks");
        
          }
    
          const allTask = await res.json();
          set({ tasks: allTask.data });
        } catch (error) {
    
        }
         finally {
          set({ loading: false });
        }
      },
    softDeleteTask: async (id) => {
        const res = await fetch(`/api/v1/tasks/${id}`, {
            method: "DELETE"
        })
        const data = await res.json();
        if (!data.success) {
            return({success: false, message:  data.msg});
        }
     set((state) => ({tasks: state.tasks.filter((task) => task._id !== id)}))
     return({ success: true, message: data.msg});
    },
    emptyBin: async () => {
        const res = await fetch(`/api/v1/tasks/bin`, {
            method: "DELETE"
        })
        const data = await res.json();
        if (!data.success) {
            return({success: false, message:  data.msg});
        }
     set({ binTasks: [] })
     return({ success: true, message: data.msg});
    },
    updateTask: async (id, taskInfo) => {
        const res = await fetch(`/api/v1/tasks/${id}`, {
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

    },
    viewDeletedTask: async () => {
        //set({ loading: true });
        try {
        const res = await fetch('/api/v1/tasks/bin')
        const data = await res.json()
        set({ binTasks: data.msg === 'Bin is empty' ? [] : data.data });
    }
    catch (error) {
        console.error("Fetch error:", error.message);
        } 
    },
    restoreDeletedTask: async (id, taskInfo) => {
        const res = await fetch(`/api/v1/tasks/restore/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(taskInfo)
        });
        const data = await res.json();
        if (!data.success) {
            return({success: false, message:  data.msg});
        }
        set((state) => ({ binTasks: state.binTasks.filter((task) => task._id !== id) }));
        return({ success: true, message: data.msg});
    }
}) 
);

export default Tasks;