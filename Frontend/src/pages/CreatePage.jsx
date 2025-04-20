import React from "react"
import { useState } from "react";
import { Container, useColorModeValue, VStack, Heading, Box, Input, Textarea, Button, useToast } from '@chakra-ui/react';
//import { toaster, Toaster } from "@/components/ui/toaster"
import Tasks from "../store/tempTaskDB";

const CreatePage = () => {
  const [ createNewTask, setNewTask ] = useState({
    Title: "",
    Description: "",
    Status: "",
    Due: "" 
  });
  const toast = useToast();
  const { createTask } = Tasks()
  const saveTask = async () => {
    const {success, message} = await createTask(createNewTask);
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
      setNewTask({Title: "", Description: "", Due: "" });
    
  }
  return (
    <Container maxW={"container.sm"} bg={useColorModeValue("gray.50", "gray.900")} rounded={"30px"} mt={"100px"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"1xl"} textAlign={"center"} mb={10}>
          Create New Task
        </Heading>
        <Box w={"full"}
         bg={useColorModeValue("white, gray.900")}
         p={6} 
         rounded={"lg"}
         shadow={"md"}>
          <VStack spacing={4}>
            <Input 
              placeholder = "Title"
              name = "Title"
              type = "string"
              value = {createNewTask.Title}
              onChange={ (e) => setNewTask({...createNewTask, Title: e.target.value})}
            />

            <Textarea 
              h = {"100px"}
              placeholder = "Description"
              name = "Description"
              type = "string"
              value = {createNewTask.Description}
              onChange = { (e) => setNewTask({...createNewTask, Description: e.target.value})}
            />

            <Input 
              placeholder = " DD-MM-YY: HH:MM"
              name = "Due Date"
              type = "datetime-local"
              value = {createNewTask.Due}
              onChange = { (e) => setNewTask({...createNewTask, Due: e.target.value})}
            />
            <Button colorScheme="green" w="full" rounded={"lg"} onClick={saveTask}>
              Save
            </Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage
