import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

type Props = {
  message: string;
  closeDialog: () => void;
};

export const ErrorDialog = ({ message, closeDialog }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog
      aria-describedby="error-dialog-description"
      aria-labelledby="error-dialog-title"
      onClose={closeDialog}
      open={true}
    >
      <DialogTitle textAlign="center" id="error-dialog-title">
        {t('common:error')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{t('common:close')}</Button>
      </DialogActions>
    </Dialog>
  );
};
