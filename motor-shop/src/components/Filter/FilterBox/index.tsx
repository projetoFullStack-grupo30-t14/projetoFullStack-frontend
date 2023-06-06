import { useEffect, useState } from "react";
import { FilterButtons } from "../FilterButtons";
import { FilterSection } from "../FilterSection";
import { values } from "../mock";

interface FilterBoxProps {
  className: string;
}
export const FilterBox = ({ className }: FilterBoxProps) => {
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
      className={`max-w-xs flex flex-col ${className}`}
      key={`${resetOn}`}
    >
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
          className="btn-brand1 btn-big"
        >
          Limpar Filtros
        </button>
      )}
    </section>
  );
};
