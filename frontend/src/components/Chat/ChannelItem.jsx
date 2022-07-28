import React, { useContext } from 'react';
import {
  Button,
  Dropdown,
  Nav,
  ButtonGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';
import { openModal } from '../../store/slices/modal.js';

export const ChannelItem = ({ name, removable, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId, setCurrentChannelId } = useContext(CurrentChannelContext);

  const classes = 'w-100 rounded-0 text-start';
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const nameEl = (
    <>
      <span className="me-1">#</span>{name}
    </>
  );

  const removeChannel = () => {
    dispatch(openModal({ action: 'remove', id }));
  };

  const renameChannel = () => {
    dispatch(openModal({ action: 'rename', id, name }));
  };

  const btn = removable ? (
    <Dropdown as={ButtonGroup} className={classes}>
      <Button variant={variant} className={classes} onClick={() => setCurrentChannelId(id)}>
        {nameEl}
      </Button>
      <Dropdown.Toggle split id={id} variant={variant} />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="remove" variant="light" onClick={removeChannel}>{t('modal.removeBtn')}</Dropdown.Item>
        <Dropdown.Item eventKey="rename" variant="light" onClick={renameChannel}>{t('modal.renameBtn')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <Button variant={variant} className={classes} onClick={() => setCurrentChannelId(id)}>
      {nameEl}
    </Button>
  );

  return (
    <Nav.Item className="w-100">
      {btn}
    </Nav.Item>
  );
};
