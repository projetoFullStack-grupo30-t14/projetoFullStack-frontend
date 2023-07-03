import { useModal } from "@/contexts/modalContext";
import { TCar } from "@/schemas/car.schema";
import Link from "next/link";
import { EditAdForm } from "./forms/editAdForm";
import { useCars } from "@/contexts/carContext";

const CardCarSeller = ({ car }: { car: TCar }) => {
  const { showModal } = useModal();
  const { getOneCar } = useCars();
  return (
    <div className="relative z-10 flex flex-col gap-4 max-w-xs mx-auto bg-white overflow-hidden min-w-[312px] min-h-[350px] group">
      <div className="flex-shrink-0 flex-grow-0 h-152 bg-grey-7">
        <div className="group border-2 border-grey-7 group-hover:border-brand-1 group-hover:border-2 relative">
          {car.is_active ? (
            <span className="absolute top-0 left-0 z-40 m-3 bg-brand-1 px-2 text-grey-whiteFixed text-body-2-500 font-inter">
              Ativo
            </span>
          ) : (
            <span className="absolute top-0 left-0 z-40 m-3 bg-grey-4 px-2 text-grey-whiteFixed text-body-2-500 font-inter">
              Inativo
            </span>
          )}
          <img
            src={car.cover_image}
            alt={car.model}
            className="w-full h-48 object-contain transform hover:scale-110 transition-transform"
          />
        </div>
      </div>
      <div className="pt-4 pb-4 flex-col gap-4">
        <h3 className="font-lexend heading-7-600 text-grey-1 mb-4 truncate">
          {car.brand} - {car.model}
        </h3>
        <p className="text-grey-2 font-inter body-2-400 truncate">
          {car.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <span className="btn-small btn-brand-opacity">
              {car.mileage} KM
            </span>
            <span className="btn-small btn-brand-opacity">{car.year}</span>
          </div>
          <span className="text-grey-1 heading-7-500 ">
            R${car.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="mt-3 flex gap-4">
          <button
            className="btn-outline1 rounded px-5 py-3 font-inter"
            onClick={() => {
              getOneCar(car.id);
              showModal(<EditAdForm id={car.id} />, "Editar anúncio");
            }}
          >
            Editar
          </button>
          <Link
            href={`/products/${car.id}`}
            className="btn-outline1 rounded px-5 py-3 font-inter"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCarSeller;
