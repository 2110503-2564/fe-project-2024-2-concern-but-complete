import React from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Button
} from '@mui/material';

interface BookingSuccessModalProps {
  open: boolean;
  onClose: () => void;
  type?: 'booking' | 'create' | 'update';
  redirectAction?: () => void;
}

const SuccessfulPopup: React.FC<BookingSuccessModalProps> = ({
  open, 
  onClose,
  type = 'booking',
  redirectAction
}) => {
  // Dynamic content based on type
  const modalContent = {
    booking: {
      title: 'Booking Successful',
      message: 'Your hotel booking has been confirmed successfully. You can view your bookings in the bookings section.',
      buttonText: 'View Bookings'
    },
    create: {
      title: 'Creation Successful',
      message: 'Your item has been created successfully.',
      buttonText: 'View List'
    },
    update: {
      title: 'Update Successful',
      message: 'Your item has been updated successfully.',
      buttonText: 'View Details'
    },
  };

  const content = modalContent[type];

  const handleButtonClick = () => {
    if(redirectAction){
      redirectAction();
    }
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="success-title"
      aria-describedby="success-description"
    >
      <DialogTitle id="success-title" className="text-green-600">
        {content.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="success-description">
          {content.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="contained"
        >
          {content.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessfulPopup;