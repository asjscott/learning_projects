import { useForm } from "react-hook-form"
import { FormInputText } from "./RHFTextinput";
import { Button, Stack, Typography } from "@mui/material"
import { FormInputDropdown } from "./RHFSelector";
import { useEditAssessmentMutation, useGetAssessmentQuery } from "../store";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { defaultValues, schema } from "../constants/Constants";


function EditAssessmentForm({ setOpen, id }) {
    const {data} = useGetAssessmentQuery(id)

    const {
        handleSubmit,
        reset,
        control,
      } = useForm({defaultValues, mode: "onBlur", resolver: yupResolver(schema)})

      useEffect(() => {
        if (data) {
            reset(data)
        }
      }, [reset, data])

      const [editAssessment] = useEditAssessmentMutation()
    
      const onSubmit = (assessment) => {
        setOpen(false)
        editAssessment(assessment)
      }

      return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{gap: 1}}>
                    <Typography variant="h5" sx={{textAlign: "center"}}>Edit Assessment</Typography>
                    <FormInputText name={"name"} control={control} label={"Assessment Name"} helperText={"Name required"}/>
                    <FormInputText name={"questions"} control={control} label={"Number of Questions"} number/>
                    <FormInputText name={"length"} control={control} label={"Assessment Duration"} number position={"end"} adornment={"mins"}/>
                    <FormInputDropdown name={"difficulty"} control={control} options={[ {value: "easy", label: "easy"}, {value: "medium", label: "medium"}, {value: "hard", label: "hard"} ]} label={"Difficulty"}/>
                    <Button onClick={handleSubmit(onSubmit)} variant={"contained"} >Update</Button>
                    <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
                </Stack>
        </form>
      )
}

export default EditAssessmentForm