import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ModalGeneric = ({ body, confirmHandler, isOpen, title, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()} className="modal-dialog-centered">
      <ModalHeader toggle={() => toggle()}><i className="fa fa-exclamation-triangle text-warning" /> WARNING: {title}</ModalHeader>
      <ModalBody>
        {`${body} Click 'Confirm' to proceed or 'Cancel' to abort.`}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => confirmHandler()}>Confirm</Button>{' '}
        <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalGeneric;