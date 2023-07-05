import { TCar } from "@/schemas/car.schema";

interface modalPhotoProps {
  car: TCar
  image: string
}

export const ModalPhoto = ({ car, image }: modalPhotoProps) => {
  return (
    <>
      <img
        src={image}
        alt={car?.model}
        className="sm:py-8 sm:px-4 sm:max-w-2xl"
        />
    </>
  );
};
