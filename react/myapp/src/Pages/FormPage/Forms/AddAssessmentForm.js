import { useForm } from "react-hook-form"
import { FormInputText } from "./RHFTextinput";
import { Button, Stack, Typography } from "@mui/material"
import { FormInputDropdown } from "./RHFSelector";
import { useAddAssessmentMutation } from "../store";
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, schema } from "../constants/Constants";

function AddAssessmentForm({ setOpen }) {
    const {
        handleSubmit,
        reset,
        control,
      } = useForm({defaultValues, mode: "all", resolver: yupResolver(schema)})

      const [addAssessment] = useAddAssessmentMutation()
    
      const onSubmit = (data) => {
        console.log(data)
        setOpen(false)
        addAssessment(data)
      }
    
      return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
                <Stack fullWidth sx={{ gap: 1}}>
                    <Typography variant="h5" sx={{textAlign: "center"}}>Create Assessment</Typography>
                    <FormInputText name={"name"} control={control} label={"Assessment Name"} helperText={"Name required"}/>
                    <FormInputText name={"questions"} control={control} label={"Number of Questions"} number/>
                    <FormInputText name={"length"} control={control} label={"Assessment Duration"} number position={"end"} adornment={"mins"}/>
                    <FormInputDropdown name={"difficulty"} control={control} options={[ {value: "easy", label: "easy"}, {value: "medium", label: "medium"}, {value: "hard", label: "hard"} ]} label={"Difficulty"}/>
                    <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>Submit</Button>
                    <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
                </Stack> 
        </form>
      )
}

export default AddAssessmentForm