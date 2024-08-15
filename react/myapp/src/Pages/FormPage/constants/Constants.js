import * as yup from 'yup';

export const defaultValues = {
    name: "",
    questions: "",
    length: "",
    difficulty: ""
}

export const schema = yup.object().shape({
    name: yup.string().required(),
    questions: yup.string().required(),
    length: yup.string().required(),
    difficulty: yup.string().required(),
})