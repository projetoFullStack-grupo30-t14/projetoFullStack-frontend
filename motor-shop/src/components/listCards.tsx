import CardCar from "@/components/cardCar";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";

const ListCards = () => {
    return (
        <ul className="flex gap-3 ml-6 overflow-x-auto sm:flex-row md:flex-wrap lg:flex-wrap custom-scrollbar">
            {carsListMock.map((car: TCar) => (
                <div  key={car.id} >
                    <CardCar car={car}/>
                </div>
            ))}
        </ul>
    )
}
export default ListCards