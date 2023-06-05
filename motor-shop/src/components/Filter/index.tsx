import { FilterSection } from "./FilterSection";
import { values } from "./mock";

export const FilterBox = () => {
  const { year, brand, color, model } = values;
  const fuel = ["flex", "hybrid", "electric"];

  return (
    <section>
      <form>
        <FilterSection title="Marca" values={brand} />
        <FilterSection title="Modelo" values={model} />
        <FilterSection title="Cor" values={color} />
        <FilterSection title="Ano" values={year} />
        <FilterSection title="Combustível" values={fuel} />
      </form>
    </section>
  );
};
