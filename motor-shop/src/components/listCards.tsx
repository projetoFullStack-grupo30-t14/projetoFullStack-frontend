import CardCar from "@/components/cardCar";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";

const ListCards = () => {
    return (
        <ul className="flex gap-3 ml-6 overflow-x-auto sm:flex-row md:flex-wrap lg:flex-wrap">
            {carsListMock.map((car: TCar) => (
                <CardCar key={car.id} car={car} />
            ))}
        </ul>
    )
}
export default ListCards