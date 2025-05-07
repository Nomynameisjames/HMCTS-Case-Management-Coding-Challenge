//CreatePage.jsx
import React from "react"
import { useState } from "react";
import {
        Container, useColorModeValue, VStack,
        Heading, Box, Input,
        Textarea, Button } from '@chakra-ui/react';
import useTaskFunc from "../hooks/useFetch";

/**
 * CreatePage Component
 * --------------------
 * This renders a form that allows users to create a new task.
 * Uses Chakra UI for layout and styling.
 * Delegates saving logic to the `useTaskFunc` hook.
 *
 * Core features:
 * - Input fields for task Title, Description, and Due date
 * - Button to save task using saveTask() from logic hook
 * - Uses local component state to manage form input
 */

 const CreatePage = () => {
  // Local state for managing task form input
  const [createNewTask, setNewTask] = useState({
    Title: "",
    Description: "",
    Status: "",
    Due: "",
  });

  // Access the task-saving logic from useTaskFunc hook
  const { saveTask } = useTaskFunc({});

  const bgColor = useColorModeValue("#f7fafc", "#171923");

  return (
    <Box bg={bgColor} minH="100vh">
      <Container
        maxW={"container.sm"}
        bg={useColorModeValue("gray.50", "gray.900")}
      >
        <VStack spacing={8}>
          <Heading as={"h1"} size={"1xl"} textAlign={"center"} mb={5}>
            Create New Task
          </Heading>

          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.700")}
            p={6}
            rounded={"lg"}
            shadow={"lg"}
          >
            <VStack spacing={4}>
              {/* Task Title Input */}
              <Input
                placeholder="Title"
                name="Title"
                type="string"
                value={createNewTask.Title}
                onChange={(e) =>
                  setNewTask({ ...createNewTask, Title: e.target.value })
                }
              />

              {/* Task Description Input */}
              <Textarea
                h={"100px"}
                placeholder="Description"
                name="Description"
                value={createNewTask.Description}
                onChange={(e) =>
                  setNewTask({ ...createNewTask, Description: e.target.value })
                }
              />

              {/* Due Date Input */}
              <Input
                placeholder="DD-MM-YY: HH:MM"
                name="Due"
                type="datetime-local"
                value={createNewTask.Due}
                onChange={(e) =>
                  setNewTask({ ...createNewTask, Due: e.target.value })
                }
              />

              {/* Save Button triggers saveTask from logic hook */}
              <Button
                colorScheme="green"
                w="full"
                rounded={"lg"}
                onClick={() => saveTask(createNewTask, setNewTask)}
              >
                Save
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreatePage;