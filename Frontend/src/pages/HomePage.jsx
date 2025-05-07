//HomePage.jsx
import React from "react"
import { Container, VStack, Text,
         useColorModeValue, SimpleGrid, Spinner,
         Center,  Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Tasks from "../store/tempTaskDB";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import Bin from "../components/AnimatedBin";
import { PiFolderOpenFill } from "react-icons/pi";

/** 
 * HomePage Component
 * ------------------
 * Displays a grid of current tasks, handles loading state,
 * manages task deletion animation, and shows a prompt when no tasks exist.
 *
 * Features:
 * - Fetches tasks on mount using `fetchTasks()`
 * - Displays loading spinner while fetching
 * - Renders TaskCard components in a responsive grid
 * - Shows animation and Bin component on task deletion
 * - Offers navigation to create a task when none exist
 */


 const HomePage = () => {
  // Fetch tasks and handle loading state
  const { fetchTasks, tasks, loading } = Tasks();
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // State for deletion animation and tracking
  const [setRecentlyDeleted] = useState(null);
  const [setDeletedCount] = useState(0);
  const [animationCoords, setAnimationCoords] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const gradient = useColorModeValue(
    "linear(to-r, black, gray.900)", // Light mode gradient
    "linear(to-r, white, blue.100)"  // Dark mode gradient
  );
  const bgColor = useColorModeValue('#f7fafc', '#171923');

  // Show loading screen while fetching
  if (loading) {
    return (
      <Center minH="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" color="blue.500" />
          <Text color="blue.500" fontSize="lg">Loading tasks...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={30}
            fontWeight="bold"
            bgGradient={gradient}
            bgClip="text"
            textAlign="center"
          >
            Current Tasks
          </Text>

          {/* Task list grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w="full"
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                setRecentlyDeleted={setRecentlyDeleted}
                setDeletedCount={setDeletedCount}
                setAnimationCoords={setAnimationCoords}
                setShowAnimation={setShowAnimation}
              />
            ))}
          </SimpleGrid>

          {/* Empty state message */}
          {tasks.length === 0 && (
            <>
              <HStack>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="center"
                  bgGradient={gradient}
                  bgClip="text"
                >
                  You Have No Current Tasks
                </Text>
                <PiFolderOpenFill color={useColorModeValue("black", "white")} />
              </HStack>
              <Link to="/create">
                <Text
                  fontSize="sm"
                  color={useColorModeValue("blue.900", "blue.200")}
                  textAlign="center"
                  _hover={{ textDecoration: "underline" }}
                >
                  Click here to create a new task
                </Text>
              </Link>
            </>
          )}
        </VStack>
      </Container>

      {/* Recycle bin for deleted task animation */}
      <Bin
        animationCoords={animationCoords}
        showAnimation={showAnimation}
        onAnimationComplete={() => setShowAnimation(false)}
      />
    </Box>
  );
};

export default HomePage;
