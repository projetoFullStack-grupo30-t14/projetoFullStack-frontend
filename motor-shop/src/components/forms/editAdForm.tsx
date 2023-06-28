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
    wIsActive,
  ] = watch([
    "brand",
    "model",
    "year",
    "fuel",
    "mileage",
    "color",
    "price",
    "description",
    "cover_image",
    "is_active",
  ]);

  const editCar = (data: any) => {
    patchOneCar(data);
  };

  return (
    <main className="bg-grey-8">
      <div className="flex justify-center items-center h-full">
        <div className="z-10 h-full lg:w-[410px] max-w-full font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
          <form className="flex flex-col" onSubmit={handleSubmit(editCar)}>
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
            <section className="grid grid-cols-2 justify-between gap-2 lg:min-w-max">
              <div className="flex flex-col">
                <Field
                  id="year"
                  type="text"
                  placeholder=""
                  label="Ano"
                  onChange={(e) => setValue("year", e.target.value)}
                  defaultValue={""}
                  className={
                    "" /* currCar?.year === wYear? "text-grey-3" : "" */
                  }
                  //   error={errors.year?.message}
                />
              </div>
              <div className="flex flex-col">
                <Field
                  id="fuel"
                  type="text"
                  placeholder=""
                  label="Combustível"
                  onChange={(e) => setValue("fuel", e.target.value)}
                  defaultValue={""}
                  className={
                    "" /* currCar?.fuel === wFuel? "text-grey-3" : "" */
                  }
                  //   error={errors.fuel?.message}
                />
              </div>
              <div className="flex flex-col">
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
              </div>
              <div className="flex flex-col">
                <Field
                  id="color"
                  type="text"
                  placeholder=""
                  label="Cor"
                  onChange={(e) => setValue("color", e.target.value)}
                  defaultValue={""}
                  className={
                    "" /* currCar?.color === wColor? "text-grey-3" : "" */
                  }
                  //   error={errors.color?.message}
                />
              </div>
              <div className="flex flex-col">
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
              </div>
              <div className="flex flex-col">
                <Field
                  id="price"
                  type="text"
                  placeholder=""
                  label="Preço"
                  onChange={(e) => setValue("price", e.target.value)}
                  defaultValue={""}
                  className={
                    "" /* currCar?.price === wPrice? "text-grey-3" : "" */
                  }
                  //   error={errors.price?.message}
                />
              </div>
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
                "py-2 px-4 resize-none h-20" /* currCar?.description === wDescription? "text-grey-3" : "" */
              }
              //   error={errors.description?.message}
            />
            <div className="grid grid-cols-2 justify-between gap-2 lg:min-w-max mb-8">
              <p className="col-span-2">Publicado</p>
              <button className="btn-big btn-negative">Sim</button>
              <button className="btn-big btn-brand1">Não</button>
            </div>

            <Field
              id="coverImage"
              type="text"
              placeholder=""
              label="Imagem da capa"
              // onChange={(e) => setValue("cover_image", e.target.value)}
              defaultValue={""}
              className={
                "" /* currCar?.cover_image === wCoverImage? "text-grey-3" : "" */
              }
            />

            <div className="flex flex-col sm:flex-row justify-between gap-2 lg:gap-1 min-w-max">
              <button
                // onClick={}
                className="btn-big btn-negative transition ease-in-out lg:w-[55%]"
              >
                Excluir anúncio
              </button>
              <button
                type="submit"
                className="btn-big btn-brand1 transition ease-in-out"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
