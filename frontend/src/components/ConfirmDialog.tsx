import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Avatar,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Warning as WarningIcon,
  DeleteForever as DeleteForeverIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <Box sx={{ p: 1 }}>
        <DialogTitle
          id="confirm-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pb: 1,
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
            }}
          >
            <WarningIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This action cannot be undone
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <DialogContentText
            id="confirm-dialog-description"
            sx={{
              color: 'text.primary',
              fontSize: '1rem',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={onCancel}
            size="large"
            startIcon={<CloseIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: alpha(theme.palette.divider, 0.5),
              color: 'text.secondary',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            size="large"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, #dc2626 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, #dc2626 0%, ${theme.palette.error.main} 100%)`,
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
