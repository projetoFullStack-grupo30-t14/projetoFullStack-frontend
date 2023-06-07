import CardCar from "@/components/cardCar";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";

const ListCards = () => {
    return (
        <ul className="flex gap-3 ml-6 overflow-x-auto sm:flex-row md:flex-wrap lg:flex-wrap">
            {carsListMock.map((car: TCar) => (
                <div>
                    <CardCar car={car} key={car.id}/>
                </div>
            ))}
        </ul>
    )
}
export default ListCards