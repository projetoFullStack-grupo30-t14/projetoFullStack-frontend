import { Dispatch, SetStateAction, useState } from "react";

interface FilterButtonProps {
  title: string;
  select: string;
  setReset: Dispatch<SetStateAction<boolean>>;
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
}
export const FilterInputs = ({
  title,
  select,
  setReset,
  searchParams,
  setSearchParams,
}: FilterButtonProps) => {
  const [active, setActive] = useState("");
  return (
    <section className="filter-section flex flex-col">
      <h2 className="heading-4-600 mb-4">{title}</h2>
      <section className="buttons flex justify-center items-center gap-5">
        <input
          type="number"
          className="filter-input"
          name={`${select}Min`}
          id={`${select}Min`}
          placeholder="Mínimo"
          onInput={(e) => {
            setReset(true);
            e.preventDefault();
            setActive("asc");

            if (searchParams.includes(`${select}Min`)) {
              e.currentTarget.value == ""
                ? setSearchParams(searchParams.replace(`${select}Min=`, ""))
                : setSearchParams(
                    searchParams
                      .replace(`${select}Min=`, "")
                      .concat(`${e.currentTarget.id}=${e.currentTarget.value}&`)
                  );
            } else {
              setSearchParams(
                searchParams.concat(
                  `${e.currentTarget.id}=${e.currentTarget.value}&`
                )
              );
            }
          }}
        />
        <input
          type="number"
          className="filter-input"
          name={`${select}Max`}
          id={`${select}Max`}
          placeholder="Máximo"
          onInput={(e) => {
            setReset(true);
            e.preventDefault();
            setActive("asc");

            if (searchParams.includes(`${select}Max`)) {
              e.currentTarget.value == ""
                ? setSearchParams(searchParams.replace(`${select}Max=`, ""))
                : setSearchParams(
                    searchParams
                      .replace(`${select}Max=`, "")
                      .concat(`${e.currentTarget.id}=${e.currentTarget.value}&`)
                  );
            } else {
              setSearchParams(
                searchParams.concat(
                  `${e.currentTarget.id}=${e.currentTarget.value}&`
                )
              );
            }
          }}
        />
      </section>
    </section>
  );
};
