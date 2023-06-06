import { TCar } from "@/schemas/car.schema"

const CardCar = ({ car }: { car: TCar }) => {
    return (
        <div className="relative flex flex-col gap-4 max-w-xs mx-auto bg-white shadow-md rounded-md overflow-hidden min-w-[312px] min-h-[350px]">
            <div className="flex-shrink-0 flex-grow-0 h-152 bg-gray-200 border-2 border-gray-200">
                <img src={car.cover_image} alt={car.model} className="w-full h-48 object-contain" />
            </div>
            <div className="p-4 flex-col gap-4">
                <h3 className="text-xl font-semibold">{car.brand} - {car.model}</h3>
                <p className="text-gray-500">{car.description}</p>
                <div className="flex items-center mb-4 mt-4">
                    <img src="/sellerIcon.png" alt="icon-seller" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-gray-700">Nome vendedor</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <div className=" --color-brand-4">
                        <span className="text-gray-700 p-1">{car.mileage} KM</span>
                    </div>
                    <div>
                        <span className="text-gray-700">{car.year}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-700">${car.price}</span>
                </div>
            </div>
        </div>
    );
}

export default CardCar