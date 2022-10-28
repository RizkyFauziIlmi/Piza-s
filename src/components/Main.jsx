/* eslint-disable array-callback-return */
import {
  Avatar,
  AvatarBadge,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/config";
import { AiOutlineMail } from "react-icons/ai";
import { FcEmptyBattery, FcPlus } from "react-icons/fc";
import { FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { genRandomString } from "../utils/randomString";

export const Main = () => {
  const [user, loading, error] = useAuthState(auth);
  const [value, fireLoading, fireError] = useDocument(
    doc(db, "infoAccount", localStorage.getItem("email"))
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [typeActivities, setTypeActivities] = React.useState("jogging");
  const [hourJogging, setHourJogging] = React.useState(0);
  const [minuteJogging, setMinuteJogging] = React.useState(0);
  const [emptyBatteryAt, setEmptyBatteryAt] = React.useState("");

  const addActivites = async () => {
    if (typeActivities === "jogging") {
      await updateDoc(doc(db, "infoAccount", localStorage.getItem("email")), {
        activities: arrayUnion({
          type: typeActivities,
          hour: hourJogging,
          minute: minuteJogging,
          id: genRandomString(12),
          createdAt: Timestamp.now(),
        }),
      })
        .then(() => {
          toast({
            title: "Activities Successfully Added",
            status: "success",
          });
        })
        .catch((error) => {
          toast({
            title: "400 Bad Request",
            status: "error",
            description: `error: ${error.message}`,
          });
        });
    } else if (typeActivities === "emptyBattery") {
      await updateDoc(doc(db, "infoAccount", auth.currentUser.email), {
        activities: arrayUnion({
          type: typeActivities,
          at: emptyBatteryAt,
          id: genRandomString(12),
          createdAt: Timestamp.now(),
        }),
      })
        .then(() => {
          toast({
            title: "Activities Successfully Added",
            status: "success",
          });
        })
        .catch((error) => {
          toast({
            title: "400 Bad Request",
            status: "error",
            description: `error: ${error.message}`,
          });
        });
    }
  };

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  if (error && fireError) {
    return <>error</>;
  }

  if (loading && fireLoading) {
    return <>loading...</>;
  }

  if (user && value) {
    return (
      <Flex p={"1rem"} flexDir={"column"} fontWeight={"semibold"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"0.5rem"}
          pb={"1rem"}
        >
          <Heading size={"2xl"}>Dashboard</Heading>
          <Avatar size={"xl"} name={user.displayName} src={user.photoURL}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
        <Flex
          boxShadow={"dark-lg"}
          borderRadius={"1rem"}
          flexDir={"column"}
          p={"0.5rem"}
        >
          <Heading size={"lg"}>User Information</Heading>
          <Text>
            Join at: {new Date(user.metadata.creationTime).toLocaleString()}
          </Text>
          <Text>
            Last login at :{" "}
            {new Date(user.metadata.lastSignInTime).toLocaleString()}
          </Text>
          <Flex alignItems={"center"} gap={"0.2rem"}>
            <AiOutlineMail size={40} />
            <Text>{user.email}</Text>
          </Flex>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"1rem"}
          pt={"2rem"}
        >
          <Text opacity={0.5} fontWeight={"bold"} fontSize={"0.8rem"}>
            Daily Usage
          </Text>
          <Button variant={"ghost"}>
            <Text as={"u"}>See all</Text>
          </Button>
        </Flex>
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"0.8rem"}
        >
          <Heading size={"lg"}>{new Date().toDateString()}</Heading>
          <Flex justifyContent={"center"}>
            <Grid templateColumns={gridTemplate} gap={"1rem"}>
              {value
                .data()
                .activities.reverse()
                .map((activity) => {
                  if (activity.type === "jogging") {
                    if (
                      new Date().toDateString() ===
                      new Date(activity.createdAt.seconds * 1000).toDateString()
                    ) {
                      return (
                        <GridItem>
                          <Flex
                            flexDir={"column"}
                            textAlign={"center"}
                            alignItems={"center"}
                            height={"100%"}
                            boxShadow={"dark-lg"}
                            p={"1rem"}
                            borderRadius={"1rem"}
                          >
                            <FaRunning size={40} />
                            <Text fontSize={"xs"}>
                              {activity.type.toUpperCase()}
                            </Text>
                            {activity.hour !== 0 ? (
                              <Text>
                                {activity.hour}
                                {activity.hour <= 1 ? " Hour" : " Hours"}
                              </Text>
                            ) : (
                              ""
                            )}
                            {activity.minute !== 0 ? (
                              <Text>
                                {activity.minute}
                                {activity.minute <= 1 ? " Minute" : " Minutes"}
                              </Text>
                            ) : (
                              ""
                            )}
                            <Text opacity={0.5}>
                              at{" "}
                              {new Date(
                                activity.createdAt.seconds * 1000
                              ).toLocaleTimeString()}
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    }
                  } else if (activity.type === "emptyBattery") {
                    if (
                      new Date().toDateString() ===
                      new Date(activity.at).toDateString()
                    ) {
                      return (
                        <GridItem>
                          <Flex
                            flexDir={"column"}
                            textAlign={"center"}
                            alignItems={"center"}
                            boxShadow={"dark-lg"}
                            p={"1rem"}
                            borderRadius={"1rem"}
                            height={"100%"}
                          >
                            <FcEmptyBattery size={40} />
                            <Text fontSize={"xs"} textTransform={"uppercase"}>
                              Empty Battery
                            </Text>
                            <Text>
                              {new Date(activity.at).toLocaleTimeString()}
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    }
                  }
                })}
            </Grid>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} p={"2rem"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              onClick={onOpen}
              icon={<FcPlus size={70} />}
              size={"2xl"}
              variant={"ghost"}
            />
          </motion.button>
        </Flex>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Activities</ModalHeader>
            <ModalCloseButton
              onClick={() => {
                setHourJogging(0);
                setMinuteJogging(0);
                setEmptyBatteryAt("");
              }}
            />
            <ModalBody fontWeight={"semibold"}>
              <FormControl>
                <FormLabel>Type of Activites</FormLabel>
                <Select
                  onChange={(event) => {
                    setTypeActivities(event.target.value);
                    setHourJogging(0);
                    setMinuteJogging(0);
                    setEmptyBatteryAt("");
                  }}
                  variant={"filled"}
                  defaultValue="jogging"
                  value={typeActivities}
                >
                  <option value="jogging">
                    Jogging <FaRunning />
                  </option>
                  <option value="emptyBattery">
                    Battery Empty <FcEmptyBattery />
                  </option>
                </Select>
              </FormControl>
              {typeActivities === "jogging" ? (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"column"}
                  boxShadow={"dark-lg"}
                  borderRadius={"0.5rem"}
                  mt={"1rem"}
                  p={"1rem"}
                >
                  <Heading>
                    {hourJogging <= 1
                      ? `${hourJogging} Hour `
                      : `${hourJogging} Hours `}
                    {minuteJogging <= 1
                      ? `${minuteJogging} Minute`
                      : `${minuteJogging} Minutes`}
                  </Heading>
                  <Flex gap={"0.5rem"}>
                    <NumberInput
                      onChange={(valueAsString, valueAsNumber) =>
                        setHourJogging(valueAsNumber)
                      }
                      size={"sm"}
                      defaultValue={hourJogging}
                      maxW={20}
                      min={0}
                      max={24}
                      isDisabled={hourJogging >= 23}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      onChange={(valueAsString, valueAsNumber) =>
                        setMinuteJogging(valueAsNumber)
                      }
                      size={"sm"}
                      defaultValue={minuteJogging}
                      maxW={20}
                      min={0}
                      max={60}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Flex>
              ) : (
                <Flex>
                  <Input
                    onChange={(event) => setEmptyBatteryAt(event.target.value)}
                    type={"datetime-local"}
                  />
                </Flex>
              )}
            </ModalBody>

            <ModalFooter>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
              >
                <Button
                  isDisabled={
                    (new Date(emptyBatteryAt).toLocaleString() ===
                      "Invalid Date" &&
                      typeActivities === "emptyBattery") ||
                    (typeActivities === "jogging" &&
                      hourJogging === 0 &&
                      minuteJogging === 0)
                      ? true
                      : false
                  }
                  colorScheme={"yellow"}
                  onClick={() => {
                    addActivites();
                    onClose();
                    setHourJogging(0);
                    setMinuteJogging(0);
                    setEmptyBatteryAt("");
                  }}
                >
                  ADD
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }
};
