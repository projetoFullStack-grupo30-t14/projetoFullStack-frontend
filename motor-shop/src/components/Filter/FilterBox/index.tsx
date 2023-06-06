import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterButtons } from "../FilterButtons";
import { FilterSection } from "../FilterSection";
import { values } from "../mock";

interface FilterBoxProps {
  className: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}
export const FilterBox = ({ className, setShow }: FilterBoxProps) => {
  const [resetOn, setResetOn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [searchParams, setSearchParams] = useState("?");
  const { year, brand, color, model } = values;
  const fuel = ["flex", "hybrid", "electric"];

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);
  return (
    <section
      className={`max-w-[80%] flex flex-col ${className} absolute top-0 bg-grey-whiteFixed overflow-auto`}
      key={`${resetOn}`}
    >
      <section className="flex justify-between items-center mb-3 h-8 mt-2 lg:hidden md:hidden">
        <h6 className="heading-7-500 text-grey-1">Filtros</h6>
        <button
          onClick={() => {
            setShow(false);
          }}
          className="w-6 h-6"
        >
          X{/* {<MdClose/>} */}
        </button>
      </section>
      <form>
        <FilterSection
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Marca"
          values={brand}
          searchKey={`brand`}
        />
        <FilterSection
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Modelo"
          values={model}
          searchKey={`model`}
        />
        <FilterSection
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Cor"
          values={color}
          searchKey={`color`}
        />
        <FilterSection
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Ano"
          values={year}
          searchKey={`year`}
        />
        <FilterSection
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Combustível"
          values={fuel}
          searchKey={`fuel`}
        />
        <FilterButtons
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Km"
          select="mileage"
        />
        <FilterButtons
          setReset={setShowButton}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          title="Preço"
          select="price"
        />
      </form>
      {showButton && (
        <button
          onClick={() => {
            setResetOn(!resetOn);
            setShowButton(false);
            setSearchParams("?");
          }}
          className="btn-brand1 btn-big w-4/5 self-center"
        >
          Limpar Filtros
        </button>
      )}
    </section>
  );
};
