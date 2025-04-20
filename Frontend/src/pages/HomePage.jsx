import React from "react"
import { Container, VStack, Text, useColorModeValue, textDecoration, SimpleGrid, Spinner, Center, Stack  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Tasks from "../store/tempTaskDB";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";


const HomePage = () => {
  const {fetchTasks, tasks, loading} = Tasks()
  useEffect(() => {
    fetchTasks()

  }, [fetchTasks]);
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

    <Container maxw="container-xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
          >
            Current Tasks
          </Text>
          <SimpleGrid 
            columns={{
                base: 1,
                md: 2,
                lg: 3

            }} 
            spacing={10}
            w={"full"} 
          >
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task}/>
          ))}
          </SimpleGrid>
          {tasks.length === 0 && (
          <>
        <Text
    fontSize="xl"
    fontWeight="bold"
    textAlign="center"
    color="gray.500"
  >
    You Have No Current Tasks
  </Text>
  <Link to="/create">
    <Text
      fontSize="sm"
      color="blue.500"
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
  )
}

export default HomePage
