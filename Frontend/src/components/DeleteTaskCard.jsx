// DeletedTaskCard.jsx
import {
    Box, Tooltip, IconButton, Menu, MenuButton,
    MenuList, MenuItem, CardHeader, Heading, Card,
    CardBody, HStack, Badge, CardFooter, Text, Flex,
    useColorModeValue
  } from "@chakra-ui/react";
  import { SlOptions } from "react-icons/sl";
  import { MdPending } from "react-icons/md";

/** 
  * DeletedTaskCard Component
  * -------------------------
  * This component renders a styled card UI for a deleted task inside the bin.
  * It uses Chakra UI components to display the task's info such as:
  * - Title
  * - Description (via tooltip)
  * - Status (with badge and icon)
  * - Due date
  * - Furthermore, It also provides a dropdown menu with a restore option.
  * Props:
  * - task: Object containing task details (Title, Description, Status, Due, _id)
  * - onRestore: Function to restore the deleted task when triggered from the menu
*/
  
  const DeletedTaskCard = ({ task, onRestore }) => {
    return (
       // Tooltip wraps the entire card and displays the description when hovered
      <Tooltip
        placement="left"
        hasArrow
        openDelay={300}
        bg="gray.700"
        color="white"
        borderRadius="md"
        px={6}
        py={3}
        fontSize="sm"
        label={
          <Box>
            <Text fontWeight="bold" mb={1}>Task Description</Text>
            <Text>{task.Description || "No task description"}</Text>
          </Box>
        }
      >
        <Card w="full" maxW="md" overflow="hidden" shadow="lg" rounded="xl" bg={useColorModeValue("gray.100", "gray.800")} position="relative">
          {/* DropDown Menu for actions (Restore Task) */}
          <Box position="absolute" top="2" right="2">
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<SlOptions />}
                variant="ghost"
                size="xs"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem color="yellow" onClick={() => onRestore(task._id, task)}>Restore Task</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {/* Task title */}
          <CardHeader>
            <Heading size="sm" fontSize={{ base: "sm", md: "lg" }}>
              {task.Title}
            </Heading>
          </CardHeader>
          {/* Task status */}
          <CardBody>
            <Flex direction="column" justify="space-between">
              <HStack spacing={2}>
                <MdPending color={task.Status === "Pending" ? "red" : "green"} />
                <Badge variant="subtle">{task.Status}</Badge>
              </HStack>
            </Flex>
          </CardBody>
          {/* Due date */}
          <CardFooter>
            <Text mt={2} fontSize="sm" color="gray.500">
              Due: {new Date(task.Due).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </CardFooter>
        </Card>
      </Tooltip>
    );
  }; 
export default DeletedTaskCard;
