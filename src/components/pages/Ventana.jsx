import react from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"

export default function Ventana({ openDialog, closeDialog }) {
   
    if (!openDialog) {
        return null
    }
    return(
        <Dialog
        open={openDialog}
        onClose={closeDialog}
      >
        <center>
          <DialogTitle>Crear O Actualizar</DialogTitle>
        </center>
        <DialogContent>
          <TextField
            /* className={`form-control ${errors.firstName ? "is-invalid" : ""}  `} */
            required
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            /* className={`form-control ${errors.firstName ? "is-invalid" : ""}  `} */
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            /* className={`form-control ${errors.firstName ? "is-invalid" : ""}  `} */
            autoFocus
            required
            margin="dense"
            id="emailId"
            name="emailId"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    )
}