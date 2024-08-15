import { useSelector, useDispatch } from "react-redux";
import { removeCar } from "../store";

function CarList() {
    const dispatch = useDispatch()
    
    const carsList = useSelector((state) => state.cars.data)
    const searchTerm = useSelector((state) => state.cars.searchTerm)
    const name = useSelector((state) => state.form.name) 

    const cars = 
        carsList.filter((car) => 
            car.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleCarDelete = (car) => {
        dispatch(removeCar(car.id))
    }

    const renderedCars = cars.map((car) => {
        const bold = name && car.name.toLowerCase().includes(name.toLowerCase())

        return (
        <div key={car.id} className={`panel ${bold && 'bold'}`}>
            <p>
                {car.name} - ${car.cost}
            </p>
            <button 
                className="button is-danger"
                onClick={() => handleCarDelete(car)}
            >
                Delete
            </button>
        </div>
        )
    })

    return (
        <div className="car-list">
            {renderedCars}
            <hr/>
        </div>
    )
}

export default CarList