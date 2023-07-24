import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
  } from "@mui/material";
// eslint-disable-next-line react/prop-types
function DeleteConfirmationDialog({ open, onClose, onDelete, data }) {
    // eslint-disable-next-line react/prop-types
    const { image, imageId } = data;

  return (
  
       <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
          คุณต้องการที่จะลบรูปภาพ?
          <br />
          Image: {image}
          <br />
          Image ID: {imageId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onDelete(data)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

  )
}

export default DeleteConfirmationDialog
