import { useCars } from "@/contexts/carContext";
import { Field } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCarRequest, carRequestSchema } from "@/schemas/car.schema";
import { useState } from "react";
import { useModal } from "@/contexts/modalContext";

export const CreateAdForm = () => {
  const { closeModal } = useModal();
  const { createCar, listOneCar, getBrandModels, models } = useCars();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TCarRequest>({
    resolver: zodResolver(carRequestSchema),
    mode: "onBlur",
  });

  const [imageGallery, setImageGallery] = useState([
    { id: "", car_id: "", image: "" },
  ]);
  const [fipeReturn, setFipeReturn] = useState<number | string | undefined>();

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
    "cover_image",
  ]);

  if (wBrand && wModel && wYear && wFuel) {
    let fuelToApi: number;

    switch (wFuel) {
      case "flex":
        fuelToApi = 1;
        break;
      case "hybrid":
        fuelToApi = 2;
        break;
      case "electric":
        fuelToApi = 3;
        break;
    }

    let url = `https://kenzie-kars.herokuapp.com/cars/unique?brand=${wBrand}&name=${wModel}&year=${wYear}&fuel=${fuelToApi}`;

    const getFipe = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setFipeReturn(res.value);
        })
        .catch((err) => {
          console.log(err);
          setFipeReturn("Carro não encontrado");
        });
    };

    getFipe();
  }

  const onSubmit = (data: TCarRequest) => {
    createCar(data);
    closeModal();
    setFipeReturn(undefined);
  };

  return (
    <main className="bg-grey-8">
      <div className="flex justify-center items-center h-full">
        <div className="z-10 h-full lg:w-[410px] max-w-full font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-body2 font-inter my-4 pb-4">
              Informações do veículo
            </p>
            <Field
              id="brand"
              register={register("brand")}
              type="text"
              placeholder=""
              label="Marca"
              onChange={(e) => {
                setValue("brand", e.target.value);
                getBrandModels(e.target.value);
              }}
              className={listOneCar?.brand === wBrand ? "text-grey-3" : ""}
              error={errors.brand?.message}
            />
            {models.length > 0 ? (
              <div className="flex flex-col mb-8 max-h-[80px] overflow-y-visible">
                <label htmlFor="model" className="text-inputLabel mb-3">
                  Modelo
                </label>
                <select id="model" {...register("model")} className="scrollbar">
                  <option value="" disabled selected>
                    Selecione um modelo
                  </option>
                  {models.map((model) => (
                    <option value={model} className="capitalize">
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Field
                id="model"
                register={register("model")}
                type="text"
                placeholder=""
                label="Modelo"
                onChange={(e) => setValue("model", e.target.value)}
                defaultValue={listOneCar?.model}
                className={listOneCar?.model === wModel ? "text-grey-3" : ""}
                error={errors.model?.message}
              />
            )}
            <section className="grid grid-cols-2 justify-between gap-2 lg:min-w-max">
              <div className="flex flex-col">
                <Field
                  id="year"
                  register={register("year", {
                    valueAsNumber: true,
                  })}
                  type="text"
                  placeholder=""
                  label="Ano"
                  onChange={(e) => setValue("year", Number(e.target.value))}
                  className={listOneCar?.year === wYear ? "text-grey-3" : ""}
                  error={errors.year?.message}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fuel" className="text-inputLabel mb-3">
                  Combustível
                </label>
                <select id="fuel" {...register("fuel")}>
                  <option value="">Combustível</option>
                  <option value="flex">Flex</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="electric">Elétrico</option>
                </select>
              </div>
              <div className="flex flex-col">
                <Field
                  id="mileage"
                  register={register("mileage", {
                    valueAsNumber: true,
                  })}
                  type="text"
                  placeholder=""
                  label="Quilometragem"
                  onChange={(e) => setValue("mileage", Number(e.target.value))}
                  className={
                    listOneCar?.mileage === wMileage ? "text-grey-3" : ""
                  }
                  error={errors.mileage?.message}
                />
              </div>
              <div className="flex flex-col">
                <Field
                  id="color"
                  register={register("color")}
                  type="text"
                  placeholder=""
                  label="Cor"
                  onChange={(e) => setValue("color", e.target.value)}
                  className={listOneCar?.color === wColor ? "text-grey-3" : ""}
                  error={errors.color?.message}
                />
              </div>
              <div className="flex flex-col">
                <Field
                  id="fipePrice"
                  type="text"
                  placeholder=""
                  label="Preço tabela FIPE"
                  disabled={true}
                  className={"text-grey-3"}
                  defaultValue={fipeReturn}
                />
              </div>
              <div className="flex flex-col">
                <Field
                  id="price"
                  register={register("price", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder=""
                  label="Preço"
                  onChange={(e) => setValue("price", Number(e.target.value))}
                  className={listOneCar?.price === wPrice ? "text-grey-3" : ""}
                  error={errors.price?.message}
                />
              </div>
            </section>
            <Field
              id="description"
              register={register("description")}
              textarea={true}
              type="text"
              placeholder=""
              label="Descrição"
              onChange={(e) => setValue("description", e.target.value)}
              className={`py-2 px-4 resize-none h-20 ${
                listOneCar?.description === wDescription ? "text-grey-3" : ""
              }`}
              error={errors.description?.message}
            />

            <Field
              id="coverImage"
              register={register("cover_image")}
              type="text"
              placeholder=""
              label="Imagem da capa"
              onChange={(e) => setValue("cover_image", e.target.value)}
              className={
                listOneCar?.cover_image === wCoverImage ? "text-grey-3" : ""
              }
            />

            <div className="flex flex-col">
              {imageGallery &&
                imageGallery.map(
                  (
                    image: { id: string; car_id: string; image: string },
                    index: number
                  ) => {
                    return (
                      <Field
                        key={index}
                        id={`${index}galleryImage`}
                        register={register(`car_gallery.${index}`)}
                        type="text"
                        placeholder=""
                        label={`${index + 1}ª imagem da galeria`}
                        className={
                          listOneCar?.cover_image === wCoverImage
                            ? "text-grey-3"
                            : ""
                        }
                      />
                    );
                  }
                )}
              <button
                className="btn-small btn-brand-opacity h-10 min-w-[75%] lg:w-2/3 mb-8"
                type="button"
                onClick={() => {
                  imageGallery
                    ? setImageGallery([
                        ...imageGallery,
                        { id: "", car_id: "", image: "" },
                      ])
                    : setImageGallery([{ id: "", car_id: "", image: "" }]);
                }}
              >
                Adicionar campo para imagem da galeria
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 lg:gap-1 min-w-max">
              <button
                onClick={() => {
                  closeModal();
                }}
                className="btn-big btn-negative transition ease-in-out lg:w-[55%]"
                type="button"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-big btn-brand1 transition ease-in-out"
              >
                Criar Anúncio
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
