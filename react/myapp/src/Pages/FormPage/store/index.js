import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { assessmentsApi } from "./api/Assessmentapi";

export const store = configureStore({
    reducer: {
        [assessmentsApi.reducerPath]: assessmentsApi.reducer
    },
    middleware: (getDefaultMiddlesware) => {
        return getDefaultMiddlesware()
            .concat(assessmentsApi.middleware);
    }
});

setupListeners(store.dispatch)

export { useFetchAssessmentsQuery, useGetAssessmentQuery, useAddAssessmentMutation, useRemoveAssessmentMutation, useEditAssessmentMutation } from './api/Assessmentapi'