import { Dispatch, SetStateAction, useState } from "react";

interface FilterSectionProps {
  title: string;
  values: Array<string | number>;
  searchKey: string;
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
}

export const FilterSection = ({
  title,
  values,
  searchKey,
  searchParams,
  setSearchParams,
}: FilterSectionProps) => {
  let translated: string;
  const [render, setRender] = useState<Array<string | number>>(values);

  return (
    <section className="filter-section">
      <h4 className="heading-4-600 mb-4">{title}</h4>
      <section className="overflow-auto max-h-[7.75rem] min-h-[3rem] scroll-smooth scrollbar">
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
            <h6
              id={value.toString()}
              key={value}
              className="capitalize heading-6-500 text-grey-3 ml-3 cursor-pointer"
              onClick={() => {
                setRender([value]);
                if (searchParams.includes(`${searchKey}=${value}&`)) {
                } else {
                  setSearchParams(
                    searchParams.concat(`${searchKey}=${value}&`)
                  );
                }
              }}
            >
              {translated ? translated : value}
            </h6>
          );
        })}
      </section>
    </section>
  );
};
