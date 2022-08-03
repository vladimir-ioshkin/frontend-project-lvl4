import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { MODAL_ADD, MODAL_REMOVE, MODAL_RENAME } from '../../constants';

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalIsOpenSelector);
  const { action, id, name } = useSelector(modalChannelSelector);

  const handleClose = () => dispatch(closeModal());

  return (
    <BootstrapModal show={isOpen} backdrop="static" onHide={handleClose}>
      {action === MODAL_ADD && <AddChannelModal handleClose={handleClose} isOpen={isOpen} />}
      {action === MODAL_REMOVE && <RemoveChannelModal handleClose={handleClose} id={id} />}
      {action === MODAL_RENAME && (
        <RenameChannelModal handleClose={handleClose} isOpen={isOpen} id={id} currentName={name} />
      )}
    </BootstrapModal>
  );
};

export default Modal;
