import React from "react";
import Image from "next/image";
import { TCar } from "@/schemas/car.schema";
import { getInitials } from "../utils";
import Link from "next/link";

const Aside = ({ car }: { car?: TCar }) => {
  const initials = getInitials(car?.user.name);

  return (
    <div className="flex z-10 flex-col gap-5 sm:w-7/12">
      <div className="bg-grey-10 flex flex-col rounded p-5 gap-5">
        <h4 className="heading-6-600">Fotos</h4>
        <ul className="grid grid-cols-3 gap-2 ">
          {car?.car_gallery.map((photo) => (
            <li>
              <Image
                key={car.id}
                width={400}
                height={186}
                src={`/${photo.image}`}
                alt={car.model}
                className=" bg-grey-8 rounded cursor-pointer"
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
