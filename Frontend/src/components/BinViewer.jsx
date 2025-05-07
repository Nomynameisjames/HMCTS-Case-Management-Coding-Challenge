// BinViewer.jsx
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, Drawer, DrawerOverlay, DrawerContent,
    DrawerHeader, DrawerFooter, DrawerBody, Flex, Text, VStack, Button
  } from "@chakra-ui/react";
 
/**
  * BinViewer Component
  * -------------------
  * This component displays deleted tasks in either a Modal (desktop) or Drawer (mobile).
  * Props:
  * - isOpen: controls visibility
  * - onClose: closes the viewer
  * - isLargerScreen: determines whether to use Modal or Drawer layout
  * - binTasks: list of soft-deleted tasks
  * - loading: boolean for loading state
  * - onEmpty: function to permanently delete all tasks
  * - renderTaskCard: function to render each deleted task card
  * Core Features:
  * - Renders either:
  * - A message when the bin is empty
  * - A list of deleted task cards with an optional "Empty bin" button
 */

// Reusable button component for "Empty bin"
  const EmptyBinButton = ({ onClick, size = "md" }) => (
    <Button
      size={size}
      bg="red.700"
      color="white"
      _hover={{ bg: "red.800" }}
      onClick={onClick}
    >
      Empty bin
    </Button>
  );
  

  const BinViewer = ({
    isOpen,
    onClose,
    isLargerScreen,
    binTasks,
    loading,
    onEmpty,
    renderTaskCard
  }) => {
    const isEmpty = binTasks.length === 0; // Checks if bin is empty
   
    // Content to render in the viewer
    const content = isEmpty ? (
      // Show empty message if there are no deleted task
      <Flex justify="center" align="center" h="200px">
        <Text fontSize="lg" color="gray.500">
          Bin is empty.
        </Text>
      </Flex>
    ) : (
      // Show a list of deleted task cards if any
      <VStack align="stretch" spacing={3}>
        {binTasks.map((task) => renderTaskCard(task))}     
      </VStack>
    );
  
    // If the screen is medium and above, use Chakra Modal for desktop
    if (isLargerScreen) {
      return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deleted Tasks</ModalHeader>
            <ModalCloseButton />
            <ModalBody maxH="60vh" overflowY="auto">
              {loading ? <Text>Loading...</Text> : content}
            </ModalBody>
            {/* Conditionally show the footer only if there are tasks */}
            {!isEmpty && (
              <ModalFooter>
                <EmptyBinButton onClick={onEmpty} />
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      );
    }
  // For smaller screens (mobile), use a Drawer from the bottom
    return (
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Deleted Tasks</DrawerHeader>
          <DrawerBody maxH="40vh" overflowY="auto">
            {loading ? <Text>Loading...</Text> : content}
          </DrawerBody>
          <DrawerFooter>
          {!isEmpty && (
              <EmptyBinButton onClick={onEmpty} />
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default BinViewer;