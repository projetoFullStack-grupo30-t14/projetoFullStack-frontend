import { TCar } from "@/schemas/car.schema";
import Link from "next/link";
import { getInitials } from "./utils";

const CardCar = ({ car }: { car: TCar }) => {
  const initials = getInitials(car.user.name);

  let isOnSale: boolean = false
  function verifySale () {
    const carPrice: number = car.price
    const fipePrice: number | null = car.price_FIPE
    const discount = carPrice / fipePrice
    if (discount < 0.95) {
      isOnSale = true
    }
  }

  if (car.price_FIPE){
    verifySale()
  }
  return (
    <Link href={`/products/${car.id}`} className="relative z-10 flex flex-col gap-4 max-w-xs mx-auto bg-white overflow-hidden min-w-[312px] min-h-[350px] group">
      <div className="flex-shrink-0 flex-grow-0 h-152 bg-grey-7">
        <div className="relative border-2 border-grey-7 group-hover:border-brand-1 group-hover:border-2 overflow-hidden">
          <img
            src={car.cover_image}
            alt={car.model}
            className="w-full h-48 object-contain transform hover:scale-110 transition-transform"
          />
          {
            isOnSale &&
            <div className="bg-success-1 w-fit p-1 absolute top-0 right-0">
              <img src="/discount.png" alt="discount icon" />
            </div>
          }
        </div>
      </div>
      <div className="pt-4 pb-4 flex-col gap-4">
        <h3 className="font-lexend heading-7-600 text-grey-1 mb-4 truncate">
          {car.brand} - {car.model}
        </h3>
        <p className="text-grey-2 font-inter body-2-400 truncate">
          {car.description}
        </p>
        <Link href={`/profiles/${car.usersId}`}>
          <div className="flex items-center mt-4">
            <div className="bg-brand-1 w-7 h-7 rounded-full flex items-center justify-center">
              <span className="text-brand-4 font-inter text-body1">{initials}</span>
            </div>
            <span className="mx-2 text-grey-2 body-2-500 font-inter">{car.user.name}</span>
          </div>
        </Link>
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
    </Link>
  );
};

export default CardCar;
