import React from "react";
import { TCar } from "@/schemas/car.schema";
import { useModal } from "@/contexts/modalContext";
import { ModalPhoto } from "./modalPhoto";

const ProductDetail = ({ car }: { car?: TCar }) => {
  const { showModal } = useModal();

  return (
    <>
      <div className="flex flex-col gap-3 md:w-2/3 md:mr-4">
        <div
          className="bg-grey-10 rounded"
          onClick={() => showModal(<ModalPhoto car={car} />, "")}
        >
          <img
            src={car?.cover_image}
            alt={car?.model}
            className="md:px-16 md:py-8 cursor-pointer"
          />
        </div>

        <div className=" bg-grey-10 flex flex-col gap-5 rounded p-7 md:py-7 md:px-11">
          <h3 className="heading-6-600">
            {car?.brand} - {car?.model}
          </h3>
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div className="flex gap-2">
              <span className="btn-brand-opacity btn-small"> {car?.year} </span>
              <span className="btn-brand-opacity btn-small">
                {car?.mileage} KM
              </span>
            </div>
            <p className="heading-7-500 text-grey-1 ">
              R$
              {car?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button className="btn-brand1 btn-medium w-max">Comprar</button>
        </div>

        <div className="bg-grey-10 mt-4 rounded py-7 px-11">
          <h5 className="heading-6-600">Descrição</h5>
          <p className="body-1-400 max-h-20">{car?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
