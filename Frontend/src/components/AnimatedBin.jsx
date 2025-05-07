import { 
        Box, Image, useBreakpointValue, 
        useDisclosure, IconButton,
        Tooltip } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCrumpledPaper } from "react-icons/rx";
import Task from "../store/tempTaskDB"
import { useState } from "react";
import BinViewer from "./BinViewer";
import DeletedTaskCard from "./DeleteTaskCard";
import useTaskFunc from "../hooks/useFetch";

/**
 * Bin Component
 * --------------
 * The component renders a fixed-position animated recycle bin for deleted tasks,
 * supporting both desktop and mobile views. It details visual feedback through
 * a crumpled paper animation using Framer Motion whenever a task is deleted.
 *
 * Core Features:
 * - Shows an animated paper crumpling effect when tasks are deleted.
 * - Displays a fixed bin icon (SVG) that can be clicked to open the `BinViewer` modal.
 * - Supports responsive design: shows a tooltip-enhanced bin on larger screens,
 *   and an icon button on smaller devices.
 * - Uses Chakra UI's `useDisclosure` for modal state management.
 * - Fetches deleted tasks from a temporary store and allows restoring or emptying them.
 * - Integrates `useTaskFunc` hook for task-related actions like restore and empty bin.
 *
 * Props:
 * - `showAnimation` (boolean): Controls whether the delete animation is shown.
 * - `animationCoords` (object): Coordinates for animating the deleted task into the bin.
 * - `onAnimationComplete` (function): Callback triggered when the animation finishes.
 */

const MotionBox = motion.create(Box); // transforms Box component to motion component

const Bin = ({ showAnimation, animationCoords, onAnimationComplete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { viewDeletedTask, binTasks } = Task(); // Access deleted tasks from store
  const { handleRestore, emptyAllTask } = useTaskFunc({});
  const deletedCount = binTasks.length; // Number of deleted tasks
  const isLargerScreen = useBreakpointValue({ base: false, md: true });
  
  // Handler to view deleted tasks and open bin modal
  const handleBinClick = async () => {
    setLoading(true);
    await viewDeletedTask(); // Load tasks from bin
    setLoading(false);
    onOpen();
  };

  // Handler to restore a deleted task from the bin
  const handleTaskRestore = (task) => () => handleRestore(task._id, task);

  return (
    <>
     {/* Animate deleted task flying into bin */}
      <AnimatePresence>
        {showAnimation && animationCoords && (
          <MotionBox
            position="fixed"
            left={animationCoords.x}
            top={animationCoords.y}
            width="100px"
            height="60px"
            zIndex={999}
            bg="gray.600"
            color="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              x: -animationCoords.x + 40,
              y: window.innerHeight - animationCoords.y - 80,
              scale: 0.2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={onAnimationComplete}
          >
            <RxCrumpledPaper />
          </MotionBox>
        )}
      </AnimatePresence>
      {/* Render bin differently for larger screens */}
      {isLargerScreen ? (
        <Tooltip label="Recycle Bin" placement="top" hasArrow>
          <Box
            position="fixed"
            bottom={4}
            left={4}
            zIndex={998}
            boxSize="60px"
            _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
            onClick={handleBinClick}
          >
          {/* Bin image */}
            <Image src="/bin-basket-svgrepo-com.svg" boxSize="100%" />
          {/* Crumpled paper indicators (max 5) */}
            {Array.from({ length: Math.min(deletedCount, 5) }).map((_, idx) => (
              <Image
                key={`paper-${idx}`}
                src="/crumpled-paper-svgrepo-com.svg"
                position="absolute"
                boxSize="15px"
                top={`${5 + idx * 8}px`}
                left={`${10 + (idx % 2 === 0 ? 5 : 15)}px`}
                zIndex={999}
              />
            ))}
          </Box>
        </Tooltip>
      ) : (
         // For mobile screens: show icon button instead
        <IconButton
          icon={<RxCrumpledPaper />}
          onClick={handleBinClick}
          position="fixed"
          bottom="4"
          right="4"
          colorScheme="gray"
          size="lg"
          zIndex={999}
          aria-label="Open bin"
        />
      )}
      {/* Bin modal viewer to see and restore/delete tasks */}
      <BinViewer
        isOpen={isOpen}
        onClose={onClose}
        isLargerScreen={isLargerScreen}
        binTasks={binTasks}
        loading={loading}
        onRestore={handleTaskRestore}
        onEmpty={emptyAllTask}
        renderTaskCard={(task) => (
          <DeletedTaskCard key={task._id} task={task} onRestore={handleTaskRestore(task)} />
        )}
      />
    </>
  );
};

export default Bin;