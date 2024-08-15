import AddAssessment from "./Components/AddAssessment";
import Users from "./Components/Users";
import "./formcss.css"

export default function RHFPage() {
    return (
        <div className="background">
            <div className="title-line">
                <span className="title">Assessments</span>
                <AddAssessment/>
            </div>
            <div><Users/></div>
        </div>
    )
}