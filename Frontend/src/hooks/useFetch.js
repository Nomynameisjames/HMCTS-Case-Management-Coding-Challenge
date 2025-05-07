//useFetch.js
import Tasks from "../store/tempTaskDB";
import { useToast, useDisclosure }from "@chakra-ui/react";

/**
 * useTaskFunc Hook
 * ----------------
 * This custom hook manages task operations such as delete, restore, save, and emptying the bin.
 * Furthermore,it interacts with a global task store and uses Chakra UI's toast for user feedback.
 *
 * Core features:
 * - Soft delete with animation
 * - Restore deleted tasks
 * - Update/save edited tasks
 * - Create new tasks
 * - Empty bin functionality
 */


// Function to show consistent toast notifications
const showToast = (toast, title, description, status = "info") => {
  toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
  });
};

const useTaskFunc = ({
  cardRef,
  setAnimationCoords,
  setShowAnimation,
  setRecentlyDeleted,
  setDeletedCount,
}) => {
  const toast = useToast();
  const {
    softDeleteTask,
    updateTask,
    restoreDeletedTask,
    fetchTasks,
    emptyBin,
    createTask,
  } = Tasks(); // Accessing task functions from global store


  // Handle deletion with animation
  const handleDeleteTask = async (id, task) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate center of card for animation coordinates
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Trigger animation
    setAnimationCoords(coords);
    setShowAnimation(true);

    // Perform deletion after a brief delay
    setTimeout(async () => {
      const { success, message } = await softDeleteTask(id);
      if (success) {
        setRecentlyDeleted(task);
        setDeletedCount((count) => count + 1);
        showToast(toast, "Task Deleted", message, "success");
      } else {
        showToast(toast, "Error Deleting item", message, "error");
      }
    }, 500);
  };

  // Restore previously deleted task
  const handleRestore = async (id, taskInfo) => {
    const { success, message } = await restoreDeletedTask(id, taskInfo);
    if (success) {
      await fetchTasks(); // Refresh task list
      showToast(toast, "Task Restored", message, "success");
    } else {
      showToast(toast, "Failed To Restore", message, "error");
    }
  };

  // Save changes after editing task
  const handleSaveChanges = async (id, taskInfo, onViewClose) => {
    const { success, message } = await updateTask(id, taskInfo);
    onViewClose(); 
    if (success) {
      showToast(toast, "Task Updated", message, "success");
    } else {
      showToast(toast, "Failed To Update Task", message, "error");
    }
  };

  // Empty the bin of all soft-deleted tasks
  const emptyAllTask = async () => {
    const { success, message } = await emptyBin();
    if (success) {
      await fetchTasks();
      showToast(toast, "Recycle Bin Emptied", message, "success");
    } else {
      showToast(toast, "Failed to empty bin", message, "error");
    }
  };

  // Save new task to the store
  const saveTask = async (task, setNewTask) => {
    const { success, message } = await createTask(task);
    if (!success) {
      showToast(toast, "Error Saving Task", message, "error");
    } else {
      showToast(toast, "Task Saved Successfully", message, "success");
      setNewTask({ Title: "", Description: "", Due: "" }); // Reset form
    }
  };

  return {
    handleDeleteTask,
    handleRestore,
    handleSaveChanges,
    emptyAllTask,
    saveTask,
  };
};

export default useTaskFunc;