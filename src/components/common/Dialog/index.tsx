import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import './index.less'

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function MDialog({ title, children, open, onClose, onConfirm, footer, theme = 'light', style }: any) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={theme === 'dark' ? {
        ...style,
        backgroundColor: '#373737',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      } : {
        ...style,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <DialogTitle id="alert-dialog-title">
          {title}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
              style={theme === 'dark' ? {
                color: '#ffffff'
              } : {}}
            >
              {/* <CloseIcon /> */}
              X
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{
            color: '#ffffff'
          }}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '0 20px 20px' }}>
          {footer ? footer :
            <>
              <Button onClick={onClose}>Disagree</Button>
              <Button onClick={onConfirm} autoFocus>
                Agree
              </Button>
            </>
          }
        </DialogActions>
      </div>
    </Dialog >
  );
}