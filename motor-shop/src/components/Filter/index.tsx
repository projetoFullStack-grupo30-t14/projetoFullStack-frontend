import { useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { FilterSection } from "./FilterSection";
import { values } from "./mock";

export const FilterBox = () => {
  const [resetOn, setResetOn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { year, brand, color, model } = values;
  const fuel = ["flex", "hybrid", "electric"];

  return (
    <section className="max-w-xs flex flex-col" key={`${resetOn}`}>
      <form>
        <FilterSection
          setReset={setShowButton}
          title="Marca"
          values={brand}
          searchKey={`brand`}
        />
        <FilterSection
          setReset={setShowButton}
          title="Modelo"
          values={model}
          searchKey={`model`}
        />
        <FilterSection
          setReset={setShowButton}
          title="Cor"
          values={color}
          searchKey={`color`}
        />
        <FilterSection
          setReset={setShowButton}
          title="Ano"
          values={year}
          searchKey={`year`}
        />
        <FilterSection
          setReset={setShowButton}
          title="Combustível"
          values={fuel}
          searchKey={`fuel`}
        />
        <FilterButtons setReset={setShowButton} title="km" select="mileage" />
        <FilterButtons setReset={setShowButton} title="Preço" select="price" />
      </form>
      {showButton && (
        <button
          onClick={() => {
            setResetOn(!resetOn);
            setShowButton(false);
          }}
          className="reset-button large-button "
        >
          Limpar Filtros
        </button>
      )}
    </section>
  );
};
