import { TCar } from "@/schemas/car.schema";

export const ModalPhoto = ({ car }: { car?: TCar }) => {
  return (
    <>
      <img
        src={car?.cover_image}
        alt={car?.model}
        className="md:px-16 md:py-8 w-full flex items-center"
        />
    </>
  );
};
