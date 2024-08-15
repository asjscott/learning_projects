import { useFetchAssessmentsQuery } from "../store"
import AssessmentsList from "./AssessmentsList";

export default function Users() {
    const { data, error, isFetching } = useFetchAssessmentsQuery()

    let content;
    if (isFetching) {
        content = <div>Fetching</div>
    } else if (error) {
        content = <div>Error loading data...</div>
    } else {
        content = data.map((assessment) => {
            return (
                <AssessmentsList key={assessment.id} assessment={assessment} />
            )
        })
    }
    

    return <div>{content}</div>
}