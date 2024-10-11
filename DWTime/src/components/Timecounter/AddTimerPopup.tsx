import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
  } from '@chakra-ui/react'
  import { v4 as uuidv4 } from 'uuid';
import React, { useContext } from 'react';
import FirestoreContext from '../../contexts/Firebase/Firestore';
import { TTimerITem } from './types';
import { Timestamp } from 'firebase/firestore';


  export const AddTimerPopup = (props) => {
    const { isOpen, onClose, setTimers, userUid } = props;
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const fbContext = useContext(FirestoreContext);
    const { setDocument } = fbContext;

    const addTimer = () => {
      const timerUid = uuidv4();
  
      const newTimer: TTimerITem = {
        name: nameInputRef.current?.value || "Timer",
        time: 0,
        id: timerUid,
        isCompleted: false,
        createdAt:  Timestamp.now(),
        lastUpdated: Timestamp.now(),
        isCountiging: false,
      };

      setDocument(`users/${userUid}/timers/${timerUid}`, newTimer)
        .then(() => {
          setTimers((prevTimers: TTimerITem) => [...prevTimers, newTimer]); 
          onClose(); 
        })
        .catch((error) => console.log(error));
    };

    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar novo contador.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Input ref={nameInputRef}/>  
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={addTimer}>Adicionar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }