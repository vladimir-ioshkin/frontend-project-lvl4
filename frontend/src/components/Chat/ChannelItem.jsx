import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dropdown,
  Nav,
  ButtonGroup,
} from 'react-bootstrap';
import { openModal } from '../../store/slices/modal';
import { setCurrentChannelId, currentChannelIdSelector } from '../../store/slices/channels';
import { MODAL_REMOVE, MODAL_RENAME } from '../../constants';

const ChannelItem = ({ name, removable, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelIdSelector);

  const handleClick = () => dispatch(setCurrentChannelId({ id }));
  const removeChannel = () => dispatch(openModal({ action: MODAL_REMOVE, id }));
  const renameChannel = () => dispatch(openModal({ action: MODAL_RENAME, id, name }));
  const classes = 'w-100 rounded-0 text-start';
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const displayName = `# ${name}`;

  const btn = (
    <Button variant={variant} className={classes.concat(' text-truncate')} onClick={handleClick}>
      {displayName}
    </Button>
  );
  const dropdown = (
    <Dropdown as={ButtonGroup} className={classes}>
      {btn}
      <Dropdown.Toggle split id={id} variant={variant}>
        <span className="visually-hidden">{t('chat.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="remove" variant="light" onClick={removeChannel}>{t('modal.removeBtn')}</Dropdown.Item>
        <Dropdown.Item eventKey="rename" variant="light" onClick={renameChannel}>{t('modal.renameBtn')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Nav.Item className="w-100">
      {removable ? dropdown : btn}
    </Nav.Item>
  );
};

export default ChannelItem;
