import { useCars } from "@/contexts/carContext";
import { Field } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carUpdateSchema } from "@/schemas/car.schema";

export const EditAdForm = () => {
  const { patchOneCar } = useCars();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    resolver: zodResolver(carUpdateSchema),
    mode: "onBlur",
    // defaultValues: {
    //   brand: "",
    // },
  });

  const [
    wBrand,
    wModel,
    wYear,
    wFuel,
    wMileage,
    wColor,
    wPrice,
    wDescription,
    wCoverImage,
  ] = watch([
    "brand",
    "model",
    "year",
    "fuel",
    "mileage",
    "color",
    "price",
    "description",
    "coverImage",
  ]);

  const edit = (data: any) => {
    patchOneCar(data);
  };

  return (
    <section className="flex justify-center items-center h-full">
      <form className="flex flex-col">
        <p className="text-body2 font-inter my-4 pb-4">
          Informações do veículo
        </p>
        <Field
          id="brand"
          type="text"
          placeholder=""
          label="Marca"
          onChange={(e) => setValue("brand", e.target.value)}
          defaultValue={""}
          className={"" /* currCar?.brand === wBrand? "text-grey-3" : "" */}
          //   error={errors.brand?.message}
        />
        <Field
          id="model"
          type="text"
          placeholder=""
          label="Modelo"
          onChange={(e) => setValue("model", e.target.value)}
          defaultValue={""}
          className={"" /* currCar?.model === wModel? "text-grey-3" : "" */}
          //   error={errors.model?.message}
        />
        <section className="flex flex-col flex-wrap gap-2 w-full">
          <Field
            id="year"
            type="text"
            placeholder=""
            label="Ano"
            onChange={(e) => setValue("year", e.target.value)}
            defaultValue={""}
            className={"" /* currCar?.year === wYear? "text-grey-3" : "" */}
            //   error={errors.year?.message}
          />
          <Field
            id="fuel"
            type="text"
            placeholder=""
            label="Combustível"
            onChange={(e) => setValue("fuel", e.target.value)}
            defaultValue={""}
            className={"" /* currCar?.fuel === wFuel? "text-grey-3" : "" */}
            //   error={errors.fuel?.message}
          />
          <Field
            id="mileage"
            type="text"
            placeholder=""
            label="Quilometragem"
            onChange={(e) => setValue("mileage", e.target.value)}
            defaultValue={""}
            className={
              "" /* currCar?.mileage === wMileage? "text-grey-3" : "" */
            }
            //   error={errors.mileage?.message}
          />
          <Field
            id="color"
            type="text"
            placeholder=""
            label="Cor"
            onChange={(e) => setValue("color", e.target.value)}
            defaultValue={""}
            className={"" /* currCar?.color === wColor? "text-grey-3" : "" */}
            //   error={errors.color?.message}
          />
          <Field
            id="fipePrice"
            type="text"
            placeholder=""
            label="Preço tabela FIPE"
            // onChange={(e) => setValue("fipePrice", e.target.value)}
            defaultValue={""}
            className={
              "" /* currCar?.fipePrice === wBrand? "text-grey-3" : "" */
            }
          />
          <Field
            id="price"
            type="text"
            placeholder=""
            label="Preço"
            onChange={(e) => setValue("price", e.target.value)}
            defaultValue={""}
            className={"" /* currCar?.price === wPrice? "text-grey-3" : "" */}
            //   error={errors.price?.message}
          />
        </section>
        <Field
          id="description"
          textarea={true}
          type="text"
          placeholder=""
          label="Descrição"
          onChange={(e) => setValue("description", e.target.value)}
          defaultValue={""}
          className={
            "" /* currCar?.description === wDescription? "text-grey-3" : "" */
          }
          //   error={errors.description?.message}
        />
      </form>
    </section>
  );
};
