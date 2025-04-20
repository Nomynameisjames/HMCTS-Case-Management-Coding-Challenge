import React from 'react';
import {
  Button,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useColorModeValue,
  ButtonGroup,
  Flex,
  useToast,
  HStack,
  VStack,
  Input,
  Select,
  Badge,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  FormControl,
  FormLabel,
  Icon,
  Checkbox
} from '@chakra-ui/react';


import { RiDeleteBinFill, RiEdit2Fill, RiCloseLargeFill  } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { MdPending, MdDescription,  MdOutlineCheckCircle, MdCalendarToday } from "react-icons/md";

import Tasks from "../store/tempTaskDB";
import { useState } from 'react';



const TaskCard = ({ task }) => {
  const imageBg = "https://img.freepik.com/premium-psd/photorealistic-cobweb_926121-1930.jpg?w=826"

  const { deleteTask, updateTask } = Tasks();
  const [editedTask, setEditedTask] = useState(task);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose
  } = useDisclosure();
  const handleCardClick = () => {
    onViewOpen();
  };

  const handleSaveChanges = async (id, taskInfo) => {

   const {success, message} =  await updateTask(id, taskInfo);
    // You can call your updateTask logic here with `editedTask`
    onViewClose();
    if (!success) {
      toast({
        title: "Task Update Failed",
        description: "Changes failed to implement",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Task Updated",
        description: " Task Update Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleDeleteTask = async (id) => {
    const { success, message } = await deleteTask(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true
      }) } 
      else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true
        })
  }
}
const isOverdue = (due, status) => {
  return status === "Pending" && new Date(due) < new Date();
};
  const bg = useColorModeValue("gray.100", "gray.900")
  return (
    <Card 
      onClick={handleCardClick}
      bg={bg}
      w="full"
      maxW="md"
      overflow="hidden"
      shadow="lg"
      rounded="lg"
      bgImage={isOverdue(task.Due, task.Status) ? `${imageBg}` : 'none'}
      bgSize="cover" // ← this makes it shrink to fit
      bgPosition="center"
      bgRepeat="no-repeat"
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl'}}
      >
       <Flex w="full" justify="flex-end">
            <Button colorScheme="white" size="sm" variant="ghost" onClick={ (e) => { e.stopPropagation(); onOpen() }}>
            <RiCloseLargeFill color="white" />
          </Button>
        </Flex>
      <CardHeader>
        <Heading 
        size="sm"  
        fontSize={{ base: "sm", md: "lg" }} 
        maxW="100%">{task.Title}
      </Heading>
      </CardHeader>
      <CardBody> 
      <Flex direction="column" justify="space-between" h="100%">
      <HStack spacing={2} mt={"auto"}>
        {task.Status === "Pending" ? (
          <MdPending color="red" />
      ) : (
          <MdPending color="green" />
       )}
          <Badge size="xs"  variant="plain">{task.Status}</Badge>
      </HStack>
      </Flex>
      </CardBody>
      <CardFooter gap={1}>
      <Text mt={2} fontSize="sm" color="gray.500">
          Due: {new Date(task.Due).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </Text>
      </CardFooter>
      <Modal bg={bg}isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader> Warning!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text> You are about to delete this task</Text>
            </ModalBody>
            <ModalFooter>
              <Flex w="full" justify="flex-end">
                <Button size="md" colorScheme="red" variant="outline" onClick={ () => handleDeleteTask(task._id)}>
                <RiDeleteBinFill color="red" />
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{task.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
            <FormControl>
              <FormLabel>
                <HStack spacing={2}>
                  <Icon as={MdDescription} color="white" />
                  <Text>Description</Text>
                </HStack>
              </FormLabel>
              <Textarea
                variant="flushed"
                size="xl"
                placeholder="Description ...."
                value={editedTask.Description}
                onChange={(e) => setEditedTask({ ...editedTask, Description: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <HStack spacing={2}>
                  <Icon as={MdOutlineCheckCircle} color="white" />
                  <Text>Status</Text>
                  <Badge color={ task.Status === "Pending" ? "red.500" : "green.500"}>
                    {task.Status}
                  </Badge>
                </HStack>
              </FormLabel>
              <Checkbox
                variant={"solid"}
                isChecked={editedTask.Status === "Completed"}
                onChange={(e) =>
                  setEditedTask({
                  ...editedTask,
                Status: e.target.checked ? "Completed" : "Pending"
                })
              }
                colorScheme="green"
              >
              {task.Status === "Pending" ? (<Text> Set as completed</Text>) : (<Text>Set as pending</Text>)}
              </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>
              <HStack spacing={2}>
                <Icon as={MdCalendarToday} color="white" />
                <Text>Due Date</Text>
              </HStack>
            </FormLabel>
            <Input
              type="datetime-local"
              value={new Date(editedTask.Due).toISOString().slice(0, 16)}
              onChange={(e) => setEditedTask({ ...editedTask, Due: new Date(e.target.value) })}
            />
          </FormControl>
        </VStack>
        </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={ () => {handleSaveChanges(task._id, editedTask)}}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TaskCard;
