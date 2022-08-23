import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal';
import { ModalActions } from '../../types';
import { AppDispatch } from '../../store';
import { ChannelData } from '../../store/slices/types';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modal: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen: boolean = useSelector(modalIsOpenSelector);
  const { action, id, name }: ChannelData = useSelector(modalChannelSelector);

  const handleClose = () => dispatch(closeModal());

  return (
    <BootstrapModal show={isOpen} backdrop="static" onHide={handleClose}>
      {action === ModalActions.ADD && (
        <AddChannelModal handleClose={handleClose} isOpen={isOpen} />
      )}
      {action === ModalActions.REMOVE && (
        <RemoveChannelModal handleClose={handleClose} id={id} />
      )}
      {action === ModalActions.RENAME && (
        <RenameChannelModal handleClose={handleClose} isOpen={isOpen} id={id} currentName={name} />
      )}
    </BootstrapModal>
  );
};

export default Modal;
