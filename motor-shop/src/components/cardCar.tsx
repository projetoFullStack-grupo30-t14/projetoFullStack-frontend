import { TCar } from "@/schemas/car.schema";

const CardCar = ({ car }: { car: TCar }) => {
  return (
    <div className="relative flex flex-col gap-4 max-w-xs mx-auto bg-white overflow-hidden min-w-[312px] min-h-[350px]">
      <div className="flex-shrink-0 flex-grow-0 h-152 bg-grey-7">
        <img
          src={car.cover_image}
          alt={car.model}
          className="w-full h-48 object-contain"
        />
      </div>
      <div className="pt-4 pb-4 flex-col gap-4">
        <h3 className="font-lexend heading-7-600 text-grey-1 mb-4">
          {car.brand} - {car.model}
        </h3>
        <p className="text-grey-2 font-inter body-2-400">
          {car.description}
        </p>
        <div className="flex items-center mt-4">
          <img
            src="/sellerIcon.png"
            alt="icon-seller"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-grey-2 body-2-500 font-inter">
            Nome vendedor
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <span className="btn-small btn-brand-opacity">{car.mileage} KM</span>
            <span className="btn-small btn-brand-opacity">{car.year}</span>
          </div>
            <span className="text-grey-1 heading-7-500 ">
              R${car.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
