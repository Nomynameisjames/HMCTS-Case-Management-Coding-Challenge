import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar";

/**
 * App Component
 * _____________
 * Root component of the application.
 * Handles layout structure and routing between pages.
 */

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
