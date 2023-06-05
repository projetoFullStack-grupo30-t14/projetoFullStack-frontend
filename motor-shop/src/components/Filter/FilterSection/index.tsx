import { Dispatch, SetStateAction, useState } from "react";

interface FilterSectionProps {
  title: string;
  values: Array<string | number>;
  setReset: Dispatch<SetStateAction<boolean>>;
  searchKey: string;
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
}

export const FilterSection = ({
  title,
  values,
  setReset,
  searchKey,
  searchParams,
  setSearchParams,
}: FilterSectionProps) => {
  let translated: string;
  const [render, setRender] = useState<Array<string | number>>(values);

  return (
    <section className="filter-section">
      <h2 className="filter-title">{title}</h2>
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
            className="capitalize text-gray-500 font-medium max-w-min"
            onClick={() => {
              setRender([value]);
              setReset(true);
              setSearchParams(searchParams.concat(`${searchKey}=${value}&`));
            }}
          >
            {translated ? translated : value}
          </h3>
        );
      })}
    </section>
  );
};
