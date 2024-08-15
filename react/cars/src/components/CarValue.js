import { useSelector } from "react-redux";


function CarValue() {
    const cars = useSelector((state) => state.cars.data)
    const searchTerm = useSelector((state) => state.cars.searchTerm)

    const totalCost = 
        cars.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).reduce((acc, car) => acc + car.cost, 0)

    return (
        <div className="car-value">
            Total Cost: ${totalCost}
        </div>
    )
}

export default CarValue