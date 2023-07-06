import React from "react";
import Image from "next/image";
import { TCar } from "@/schemas/car.schema";
import { getInitials } from "../utils";
import Link from "next/link";
import { ModalPhoto } from "./modalPhoto";
import { useModal } from "@/contexts/modalContext";

const Aside = ({ car }: { car?: TCar }) => {
  const initials = getInitials(car?.user.name);
  const { showModal } = useModal();
  return (
    <div className="flex flex-col gap-5 md:w-1/3">
      <div className="bg-grey-10 flex flex-col rounded p-5 gap-5 z-10">
        <h4 className="heading-6-600">Fotos</h4>
        <ul className="grid grid-cols-3 gap-2 max-h-[175px] overflow-auto scrollbar ">
          {car?.car_gallery.map((photo) => (
            <li onClick={() => showModal(<ModalPhoto car={car} image={photo.image}/>, "Imagem do veículo")}>
              <Image
                key={car.id}
                width={400}
                height={186}
                src={photo.image}
                alt={car.model}
                className="md:h-16 bg-grey-8 rounded cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-grey-10 rounded">
        <div className="flex flex-col gap-5 items-center p-10">
          <div className="bg-brand-1 w-32 h-32 rounded-full flex items-center justify-center ">
            <span className= "font-inter text-heading1 text-brand-4">
              {initials}
            </span>
          </div>
          <div className="heading-6-600">{car?.user.name}</div>
          <p className="text-center max-h-20">
          {car?.user.description}
          </p>
          <Link className="btn-grey1 btn-medium" href={(`/profiles/${car?.user.id}`)} >
            All {car?.user.name}'s products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Aside;
