export interface AddChannelModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

export interface RemoveChannelModalProps {
  handleClose: () => void;
  id: number;
}

export interface RenameChannelModalProps {
  handleClose: () => void;
  isOpen: boolean;
  id: number;
  currentName: string;
}
