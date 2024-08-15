import { useState } from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import AddAssessmentForm from "../Forms/AddAssessmentForm"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AddAssessment() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    return (<>
        <Button variant="contained" onClick={() => handleOpen()}>Add Assessment</Button>
        <Modal 
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <AddAssessmentForm open={open} setOpen={setOpen} />
            </Box>
        </Modal>
        </>
    )
}

export default AddAssessment