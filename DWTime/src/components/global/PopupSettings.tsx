import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useContext } from 'react'
import AuthContext from '../../contexts/Firebase/Auth'

  type TPopupSettings = {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean,
  }

export const PopupSettings = (props: TPopupSettings) => {
  const { onClose, isOpen } = props

  const auth = useContext(AuthContext)
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            teste
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {auth && <Button variant='ghost' onClick={auth.logout}>Logout</Button> }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}