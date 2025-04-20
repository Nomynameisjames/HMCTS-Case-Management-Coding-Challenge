import React from 'react'
import { Button, Container, Flex, Text, HStack, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom";
//import { PlusSquareIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { IoMoon }from "react-icons/io5"
import { LuSun } from "react-icons/lu" 

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.900", "gray.900")} py={2}>
      <Container maxW="1140px" px={4}>
        <Flex
          h={16}
          align="center"
          justify="space-between"
          direction="row"
        >
          <Text
            fontSize={{ base: "md", sm: "xl", md: "2xl" }}
            fontWeight="bold"
            textTransform="uppercase"
            whiteSpace="nowrap"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">DTS Technical Test</Link>
          </Text>

          <HStack spacing={{ base: 1, sm: 2 }} ml={{ base: 2, sm: 4 }}>
            <Link to="/create">
              <Button size={{ base: "xs", sm: "sm" }} px={{ base: 2, sm: 3 }}>
                <FaPlus fontSize={14} />
              </Button>
            </Link>
            <Button
              onClick={toggleColorMode}
              size={{ base: "xs", sm: "sm" }}
              px={{ base: 2, sm: 3 }}
            >
              {colorMode === "light" ? <IoMoon size={16} /> : <LuSun size={16} />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
