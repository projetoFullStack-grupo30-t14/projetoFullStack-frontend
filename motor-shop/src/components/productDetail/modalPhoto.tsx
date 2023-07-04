import { TCar } from "@/schemas/car.schema";

export const ModalPhoto = ({ car }: { car?: TCar }) => {
  return (
    <>
      <img
        src={car?.cover_image}
        alt={car?.model}
        className="sm:py-8 sm:px-4 sm:max-w-2xl"
        />
    </>
  );
};
