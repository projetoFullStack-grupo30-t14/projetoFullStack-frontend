import { useCars } from "@/contexts/carContext";
import { Field } from "../Input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUpdateCar, carUpdateSchema } from "@/schemas/car.schema";
import { useEffect, useState } from "react";
import { useModal } from "@/contexts/modalContext";
import { ConfirmAdDelete } from "../modal/confirmAdDelete";

interface EditAdFormProps {
  id: string;
}

export const EditAdForm = ({ id }: EditAdFormProps) => {
  const { closeModal, showModal } = useModal();
  const {
    patchOneCar,
    listOneCar,
    carLoading,
    models,
    getBrandModels,
    setModels,
  } = useCars();

  if (id !== listOneCar?.id) {
    return;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<TUpdateCar>({
    resolver: zodResolver(carUpdateSchema),
    mode: "onBlur",
    defaultValues: {
      brand: listOneCar?.brand,
      model: listOneCar?.model,
      color: listOneCar?.color,
      car_gallery: listOneCar?.car_gallery,
      year: listOneCar?.year,
      cover_image: listOneCar?.cover_image,
      description: listOneCar?.description,
      fuel: listOneCar?.fuel,
      is_active: listOneCar?.is_active,
      mileage: listOneCar?.mileage,
      price: listOneCar?.price,
    },
  });

  const {} = useFieldArray({ control, name: "car_gallery" });

  const [imageGallery, setImageGallery] = useState(listOneCar?.car_gallery);

  const [published, setPublished] = useState(listOneCar?.is_active);

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
    "price_FIPE",
  ]);

  useEffect(() => {
    setValue("is_active", listOneCar?.is_active);
    getBrandModels(listOneCar.brand);
  }, [listOneCar]);

  const editCar = (data: TUpdateCar) => {
    data.is_active = published;

    patchOneCar(id, data);
    setModels([""]);
    closeModal();
  };

  return carLoading ? (
    <main className="bg-grey-8">
      <div className="flex justify-center items-center h-full">
        <div className="z-10 max-h-[550px] overflow-auto scrollbar lg:w-[410px] max-w-full font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
          <form
            className="flex flex-col pr-2"
            onSubmit={handleSubmit(editCar)}
          >
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
              defaultValue={listOneCar?.brand}
              className={listOneCar?.brand === wBrand ? "text-grey-3" : ""}
              error={errors.brand?.message}
            />
            {models.length > 0 ? (
              <div className="flex flex-col mb-8 max-h-[80px] overflow-y-visible">
                <label htmlFor="model" className="text-inputLabel mb-3">
                  Modelo
                </label>
                <select id="model" {...register("model")} className="scrollbar">
                  <option value="" disabled>
                    Selecione um modelo
                  </option>
                  {models.map((model) => (
                    <option
                      value={model}
                      className="capitalize"
                      selected={model === listOneCar.model}
                    >
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
            <section className="grid grid-cols-2 justify-between gap-2 lg:min-w-max mb-8">
              <div className="flex flex-col mb-4">
                <Field
                  id="year"
                  register={register("year", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder=""
                  label="Ano"
                  onChange={(e) => setValue("year", Number(e.target.value))}
                  defaultValue={listOneCar?.year}
                  className={listOneCar?.year === wYear ? "text-grey-3" : ""}
                  error={errors.year?.message}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="fuel" className="text-inputLabel mb-3">
                  Combustível
                </label>
                <select id="fuel" {...register("fuel")} className="scrollbar">
                  <option value="">Combustível</option>
                  <option value="flex">Flex</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="electric">Elétrico</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <Field
                  id="mileage"
                  register={register("mileage", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder=""
                  label="Quilometragem"
                  onChange={(e) => setValue("mileage", Number(e.target.value))}
                  defaultValue={listOneCar?.mileage}
                  className={
                    listOneCar?.mileage === wMileage ? "text-grey-3" : ""
                  }
                  error={errors.mileage?.message}
                />
              </div>
              <div className="flex flex-col mb-4">
                <Field
                  id="color"
                  register={register("color")}
                  type="text"
                  placeholder=""
                  label="Cor"
                  onChange={(e) => setValue("color", e.target.value)}
                  defaultValue={listOneCar?.color}
                  className={`mb-0 ${
                    listOneCar?.color === wColor ? "text-grey-3" : ""
                  }`}
                  error={errors.color?.message}
                />
              </div>
              <div className="flex flex-col mb-4">
                <Field
                  id="fipePrice"
                  type="number"
                  placeholder=""
                  label="Preço tabela FIPE"
                  disabled={true}
                  defaultValue={listOneCar?.price_FIPE}
                  className={"text-grey-3"}
                />
              </div>
              <div className="flex flex-col mb-4">
                <Field
                  id="price"
                  register={register("price", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder=""
                  label="Preço"
                  onChange={(e) => setValue("price", Number(e.target.value))}
                  defaultValue={listOneCar?.price}
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
              defaultValue={listOneCar?.description}
              className={`py-2 px-4 resize-none h-20 ${
                listOneCar?.description === wDescription ? "text-grey-3" : ""
              }`}
              error={errors.description?.message}
            />
            <div className="grid grid-cols-2 justify-between gap-2 lg:min-w-max mb-8">
              <p className="col-span-2">Publicado</p>
              <button
                type="button"
                className={`btn-big  ${
                  wIsActive ? "btn-brand1" : "btn-outline2"
                }`}
                onClick={() => {
                  setPublished(true);
                  setValue("is_active", true);
                }}
              >
                Sim
              </button>
              <button
                type="button"
                className={`btn-big  ${
                  !wIsActive ? "btn-brand1" : "btn-outline2"
                }`}
                onClick={() => {
                  setPublished(false);
                  setValue("is_active", false);
                }}
              >
                Não
              </button>
            </div>

            <Field
              id="coverImage"
              register={register("cover_image")}
              type="text"
              placeholder=""
              label="Imagem da capa"
              onChange={(e) => setValue("cover_image", e.target.value)}
              defaultValue={listOneCar?.cover_image}
              className={
                listOneCar?.cover_image === wCoverImage ? "text-grey-3" : ""
              }
            />

            <div className="flex flex-col mb-4">
              {imageGallery &&
                imageGallery.map(
                  (image: { id: string; image: string }, index: number) => {
                    return (
                      <Field
                        key={image.id || index}
                        id={`${index}galleryImage`}
                        register={register(`car_gallery.${index}.image`)}
                        type="text"
                        placeholder=""
                        label={`${index + 1}ª imagem da galeria`}
                        onChange={(e) =>
                          setValue("cover_image", e.target.value)
                        }
                        defaultValue={image.image}
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
                        { id: "", car_id: id, image: "" },
                      ])
                    : setImageGallery([{ id: "", car_id: id, image: "" }]);
                }}
              >
                Adicionar campo para imagem da galeria
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 lg:gap-1 min-w-max">
              <button
                onClick={() => {
                  closeModal();
                  showModal(<ConfirmAdDelete id={id} />, "Excluir anúncio");
                }}
                className="btn-big btn-negative transition ease-in-out lg:w-[50%]"
                type="button"
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
  ) : (
    <main className="flex justify-center items-center min-w-[80vw] h-[150px]">
      <p className="heading-2-600">Carregando...</p>
    </main>
  );
};
