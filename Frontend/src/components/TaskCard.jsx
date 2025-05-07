import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdCalendarToday, MdDescription, MdOutlineCheckCircle, MdPending } from "react-icons/md";
import { RiCloseLargeFill, RiDeleteBinFill } from "react-icons/ri";
import useTaskFunc from "../hooks/useFetch";

/**
 * TaskCard component
 * __________________
 * This displays a single task's details in a card format.
 * It details a functionality to view/edit task details, delete a task, and display a warning before deletion.
 * Uses modals for delete and edit functionalities, and provides an overdue indication with a background image.
 * 
 * Core Features:
 * 1. Task title, description, and due date display.
 * 2. Status badge with dynamic color.
 * 3. Option to delete the task with confirmation modal.
 * 4. Option to edit the task details in a separate modal.
 * 
 * Props:
 * - task: Contains the details of the task to display.
 * - setRecentlyDeleted: Function to update the recently deleted tasks.
 * - setDeletedCount: Function to update the count of deleted tasks.
 * - setAnimationCoords: Function to set animation coordinates for deleted tasks.
 * - setShowAnimation: Function to control the visibility of the delete animation.
 */

 const OVERDUE_IMAGE = "https://img.freepik.com/premium-psd/photorealistic-cobweb_926121-1930.jpg?w=826";
 const MODAL_SIZE = "lg";
 const CARD_HOVER_STYLE = {
   transform: "translateY(-5px)",
   shadow: "xl"
 };
 
 const TaskCard = ({ task, setRecentlyDeleted, setDeletedCount, setAnimationCoords, setShowAnimation }) => {
   const cardRef = useRef(null);
   const { handleDeleteTask, handleSaveChanges } = useTaskFunc({
     cardRef,
     setAnimationCoords,
     setShowAnimation,
     setRecentlyDeleted,
     setDeletedCount,
   });
 
   const [editedTask, setEditedTask] = useState(task);
 
   // Disclosure for delete and edit modals
   const {
     isOpen: isDeleteOpen,
     onOpen: openDelete,
     onClose: closeDelete
   } = useDisclosure();
 
   const {
     isOpen: isEditOpen,
     onOpen: openEdit,
     onClose: closeEdit
   } = useDisclosure();
 
   const handleCardClick = () => openEdit();
 
   const isOverdue = (due, status) =>
     status === "Pending" && new Date(due) < new Date();
 
   const bg = useColorModeValue("gray.100", "gray.700");
   const iconColor = useColorModeValue("black", "white");
   const overdueBg = isOverdue(task.Due, task.Status) ? OVERDUE_IMAGE : "none";
 
   // handler for form field changes
   const handleFieldChange = (field, value) => {
     setEditedTask(prev => ({ ...prev, [field]: value }));
   };
 
   return (
     <>
       <Card
         ref={cardRef}
         onClick={handleCardClick}
         bg={bg}
         w="full"
         maxW="md"
         overflow="hidden"
         shadow="xl"
         rounded="lg"
         bgImage={overdueBg}
         bgSize="cover"
         bgPosition="center"
         bgRepeat="no-repeat"
         transition="all 0.3s"
         _hover={CARD_HOVER_STYLE}
       >
         <Flex w="full" justify="flex-end">
           <Button
             colorScheme="white"
             size="sm"
             variant="ghost"
             onClick={(e) => {
               e.stopPropagation();
               openDelete();
             }}
           >
             <RiCloseLargeFill color={iconColor} />
           </Button>
         </Flex>
 
         <CardHeader>
           <Heading size="sm" fontSize={{ base: "sm", md: "lg" }} maxW="100%">
             {task.Title}
           </Heading>
         </CardHeader>
 
         <CardBody>
           <Flex direction="column" justify="space-between" h="100%">
             <HStack spacing={2} mt="auto">
               <MdPending color={task.Status === "Pending" ? "red" : "green"} />
               <Badge size="xs" variant="plain">{task.Status}</Badge>
             </HStack>
           </Flex>
         </CardBody>
 
         <CardFooter gap={1}>
           <Text mt={2} fontSize="xs" color={iconColor}>
             Due: {new Date(task.Due).toLocaleString(undefined, {
               dateStyle: "medium",
               timeStyle: "short",
             })}
           </Text>
         </CardFooter>
 
         {/* Delete Confirmation Modal */}
         <Modal bg={bg} isOpen={isDeleteOpen} onClose={closeDelete}>
           <ModalOverlay />
           <ModalContent>
             <ModalHeader>Warning!</ModalHeader>
             <ModalCloseButton />
             <ModalBody>
               <Text>You are about to delete this task</Text>
             </ModalBody>
             <ModalFooter>
               <Flex w="full" justify="flex-end">
                 <Button
                   size="md"
                   colorScheme="red"
                   variant="outline"
                   onClick={() => {
                     closeDelete();
                     handleDeleteTask(task._id, task);
                   }}
                 >
                   <RiDeleteBinFill color="red" />
                 </Button>
               </Flex>
             </ModalFooter>
           </ModalContent>
         </Modal>
 
         {/* View/Edit Modal */}
         <Modal isOpen={isEditOpen} onClose={closeEdit} size={MODAL_SIZE}>
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
                     onChange={(e) => handleFieldChange("Description", e.target.value)}
                   />
                 </FormControl>
 
                 <FormControl>
                   <FormLabel>
                     <HStack spacing={2}>
                       <Icon as={MdOutlineCheckCircle} color="white" />
                       <Text>Status</Text>
                       <Badge color={task.Status === "Pending" ? "red.500" : "green.500"}>
                         {task.Status}
                       </Badge>
                     </HStack>
                   </FormLabel>
                   <Checkbox
                     isChecked={editedTask.Status === "Completed"}
                     onChange={(e) => handleFieldChange("Status", e.target.checked ? "Completed" : "Pending")}
                     colorScheme="green"
                   >
                     {task.Status === "Pending" ? "Set as completed" : "Set as pending"}
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
                     onChange={(e) => handleFieldChange("Due", new Date(e.target.value))}
                   />
                 </FormControl>
               </VStack>
             </ModalBody>
             <ModalFooter>
               <Button
                 colorScheme="blue"
                 onClick={() => handleSaveChanges(task._id, editedTask, closeEdit)}
               >
                 Save Changes
               </Button>
             </ModalFooter>
           </ModalContent>
         </Modal>
       </Card>
     </>
   );
 };
 
 export default TaskCard;