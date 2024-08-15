import {Box, Typography, Grid} from "@mui/material"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveAssessmentMutation } from "../store";
import EditAssessment from "./EditAssessment";

function AssessmentsList({ assessment }) {
    const { name, length, questions, difficulty } = assessment
    const [removeAssessment] = useRemoveAssessmentMutation()
    const style = {
        border: 1,
        margin: 1,
        marginLeft: 4,
        marginRight: 4,
        padding: 1,
    }
    
    const handleRemove = () => {
        removeAssessment(assessment)
    }

    return (
        <Box sx={style} >
            <Grid sx={{marginBottom: 1}}container direction="row" justifyContent="space-between">
                <Typography variant="h6">{name}</Typography>
                <div>
                <Button variant="outlined" startIcon={<DeleteIcon />} size="small" sx={{marginRight: 1}} onClick={handleRemove}>
                Delete
                </Button>
                <EditAssessment id={assessment.id}/>
                </div>
            </Grid>
            <hr></hr>
            <Typography>Length: {length} minutes</Typography>
            <Typography>Number of Questions: {questions}</Typography>
            <Typography>Difficulty: {difficulty}</Typography>
        </Box>
    )
}

export default AssessmentsList