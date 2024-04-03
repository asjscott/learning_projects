import axios from "axios"
import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Main() {

    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian")
        .then((response) => {
            setItems(response.data.meals)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
return (
    <>
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
            {items.map((item) => 
            <Col key={item.idMeal} className="meal">
                <Card>
                <Card.Img variant="top" src={item.strMealThumb} />
                <Card.Body>
                <Card.Title>{item.strMeal}</Card.Title>
                <Card.Text>
                    {item.idMeal}
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>)}
        </Row>
    </>
)
}

export default Main