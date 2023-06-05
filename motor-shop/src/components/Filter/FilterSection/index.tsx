import { useState } from "react";

interface FilterSectionProps {
  title: string;
  values: Array<string | number>;
}

export const FilterSection = ({ title, values }: FilterSectionProps) => {
  let translated: string;
  const [render, setRender] = useState<Array<string | number>>(values);

  return (
    <section className="filter-section mb-8">
      <h2 className="text-2xl font-semibold text-black mb-7">{title}</h2>
      {render.map((value: string | number) => {
        switch (value) {
          case "electric":
            translated = "elétrico";
            break;
          case "hybrid":
            translated = "híbrido";
            break;
        }
        return (
          <h3
            id={value.toString()}
            key={value}
            className="capitalize text-gray-500 font-medium"
            onClick={() => {
              setRender([value]);
            }}
          >
            {translated ? translated : value}
          </h3>
        );
      })}
    </section>
  );
};
