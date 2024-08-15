import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const assessmentsApi = createApi({
    reducerPath: 'form',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder) {
        return {
            fetchAssessments: builder.query({
                providesTags: (result, error) => {
                    const tags = result.map(assessment => {
                        return { type: 'Assessment', id: assessment.id }
                    })
                    return tags
                },
                query: () => {
                    return {
                        url: '/assessments',
                        method: 'GET'
                    }
                }
            }),
            getAssessment: builder.query({
                query: (id) => {
                    return {
                        url: `/assessments/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['Assessment']
            }),
            addAssessment: builder.mutation({
                invalidatesTags: ['Assessment'],
                query: (assessment) => {
                    return {
                        url: '/assessments',
                        method: 'POST',
                        body: assessment
                    }
                }
            }),
            removeAssessment: builder.mutation({
                invalidatesTags: (assessment) => {
                    return [{type: "Assessment", id: assessment.id}]
                },
                query: (assessment) => {
                    return {
                        url: `assessments/${assessment.id}`,
                        method: 'DELETE'
                    }
                }
            }),
            editAssessment: builder.mutation({
                invalidatesTags: ['Assessment'],
                query: (assessment) => {
                    return {
                        url: `assessments/${assessment.id}`,
                        method: 'PUT',
                        body: assessment
                    }
                }
            })
        }
    }
})

export const { useFetchAssessmentsQuery, useGetAssessmentQuery, useAddAssessmentMutation, useRemoveAssessmentMutation, useEditAssessmentMutation } = assessmentsApi
export { assessmentsApi }