import React, { FunctionComponent } from 'react';
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
import { ModalActions } from '../../types';
import { ChannelItemProps } from './types';
import { AppDispatch } from '../../store';

const ChannelItem: FunctionComponent<ChannelItemProps> = ({ name, removable, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const currentChannelId: number = useSelector(currentChannelIdSelector);

  const handleClick = () => dispatch(setCurrentChannelId({ id }));
  const removeChannel = () => dispatch(openModal({ action: ModalActions.REMOVE, id }));
  const renameChannel = () => dispatch(openModal({ action: ModalActions.RENAME, id, name }));
  const classes: string = 'w-100 rounded-0 text-start';
  const variant: string = id === currentChannelId ? 'secondary' : 'light';
  const displayName: string = `# ${name}`;

  const btn = (
    <Button variant={variant} className={classes.concat(' text-truncate')} onClick={handleClick}>
      {displayName}
    </Button>
  );
  const dropdown = (
    <Dropdown as={ButtonGroup} className={classes}>
      {btn}
      <Dropdown.Toggle split id={String(id)} variant={variant}>
        <span className="visually-hidden">{t('chat.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="remove" onClick={removeChannel} active={false}>{t('modal.removeBtn')}</Dropdown.Item>
        <Dropdown.Item eventKey="rename" onClick={renameChannel} active={false}>{t('modal.renameBtn')}</Dropdown.Item>
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
