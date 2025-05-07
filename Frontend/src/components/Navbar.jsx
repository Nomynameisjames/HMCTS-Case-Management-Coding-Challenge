import React from 'react'
import { Button, Container, Flex, Text, HStack, useColorMode, useColorModeValue, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMoon }from "react-icons/io5"
import { LuSun } from "react-icons/lu" 

/**
 * Navbar Component
 * ----------------
 * This is the top navigation bar component for the DTS Technical Test app.
 * It entails:
 * - A branded title that links to the homepage.
 * - A button to navigate to the "Create Task" page.
 * - A toggle button to switch between light and dark color modes.
*/

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // Navbar wrapper with dynamic background
    <Box bg={useColorModeValue("gray.50", "gray.900")} py={2}>
      <Container maxW="1140px" px={4}>
        <Flex h={16} align="center" justify="space-between">
          {/* App title with gradient text and link to home page */}
          <Text
            fontSize={{ base: "md", sm: "xl", md: "2xl" }}
            fontWeight="bold"
            textTransform="uppercase"
            whiteSpace="nowrap"
            bgGradient={useColorModeValue(
              "linear(to-r, #1A202C, blue.500)",
              "linear(to-r, #EDF2F7, blue.300)"
            )}
            bgClip="text"
          >
            <Link to="/">DTS Technical Test</Link>
          </Text>

          {/* Action buttons: Create & Theme Toggle */}
          <HStack spacing={{ base: 1, sm: 2 }} ml={{ base: 2, sm: 4 }}>
            <Link to="/create">
              <Button
                size={{ base: "xs", sm: "sm" }}
                px={{ base: 2, sm: 3 }}
                aria-label="Create new task"
                _hover={{ bg: "blue.500", color: "white" }}
                _focus={{ boxShadow: "outline" }}
              >
                <FaPlus fontSize={14} />
              </Button>
            </Link>
            {/* Toggle between light and dark modes */}
            <Button
              onClick={toggleColorMode}
              size={{ base: "xs", sm: "sm" }}
              px={{ base: 2, sm: 3 }}
              aria-label="Toggle color mode"
              _hover={{ bg: "gray.200", _dark: { bg: "gray.700" } }}
              _focus={{ boxShadow: "outline" }}
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