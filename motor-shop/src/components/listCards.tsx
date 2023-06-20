import { TCar } from "@/schemas/car.schema";

interface ListCardsProps {
    carList: Array<TCar>;
    children: (car: TCar) => JSX.Element;
}

const ListCards = ({ carList, children }: ListCardsProps) => {
    return (
        <ul className="flex px-6 gap-3 md:gap-12 ml-18 overflow-x-auto sm:flex-row md:flex-wrap lg:flex-wrap custom-scrollbar justify-start items-start">
            {carList.map((car: TCar) => (
                <div key={car.id} className="cursor-pointer">
                    {children(car)}
                </div>
            ))}
        </ul>
    )
}
export default ListCards