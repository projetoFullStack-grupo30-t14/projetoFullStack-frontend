import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterSection } from "../FilterSection";
import { FilterInputs } from "../FilterInputs";
import { useCars } from "@/contexts/carContext";

interface FilterBoxProps {
  className: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}
export const FilterBox = ({ className, setShow }: FilterBoxProps) => {
  const [resetOn, setResetOn] = useState(false);
  const [buttonText, setButtonText] = useState(false);
  const [searchParams, setSearchParams] = useState("?");
  const fuel = ["flex", "hybrid", "electric"];
  const { values, getAllCars, getValues } = useCars();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getValues();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className={`sm:max-w-[80%] flex flex-col ${className} absolute top-0 bg-grey-whiteFixed overflow-auto md:contents lg:contents scrollbar`}
      key={`${resetOn}`}
    >
      <section className="flex justify-between items-center mb-3 h-8 mt-2 lg:hidden md:hidden w-[95%] self-center">
        <h6 className="heading-7-500 text-grey-1">Filtros</h6>
        <button
          onClick={() => {
            setShow(false);
          }}
          className="w-6 h-6"
        >
          <img src="/xmark.png" alt="" />
        </button>
      </section>
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault();

          getAllCars(searchParams);
        }}
      >
        {Object.keys(values).length > 0 && (
          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            title="Marca"
            values={values.brand}
            searchKey={`brand`}
          />
        )}
        {Object.keys(values).length > 0 && (
          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            title="Modelo"
            values={values.model}
            searchKey={`model`}
          />
        )}
        {Object.keys(values).length > 0 && (
          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            title="Cor"
            values={values.color}
            searchKey={`color`}
          />
        )}
        {Object.keys(values).length > 0 && (
          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            title="Ano"
            values={values.year}
            searchKey={`year`}
          />
        )}
        <FilterSection
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Combustível"
          values={fuel}
          searchKey={`fuel`}
        />
        <FilterInputs
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Km"
          select="mileage"
        />
        <FilterInputs
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Preço"
          select="price"
        />
        {
          <button
            type="submit"
            onClick={(e) => {
              if (buttonText) {
                e.preventDefault();
                setSearchParams("?");
                setResetOn(!resetOn);
                getAllCars("");
              }

              setButtonText(!buttonText);
            }}
            className="btn-brand1 btn-big w-4/5 sticky top-0  self-center -order-1 lg:order-none md:order-none"
          >
            {buttonText ? "Limpar Filtros" : "Filtrar"}
          </button>
        }
      </form>
    </section>
  );
};
