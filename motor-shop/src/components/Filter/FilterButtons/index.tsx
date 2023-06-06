import { Dispatch, SetStateAction, useState } from "react";

interface FilterButtonProps {
  title: string;
  select: string;
  setReset: Dispatch<SetStateAction<boolean>>;
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
}
export const FilterButtons = ({
  title,
  select,
  setReset,
  searchParams,
  setSearchParams,
}: FilterButtonProps) => {
  const [active, setActive] = useState("");
  return (
    <section className="filter-section flex flex-col">
      <h2 className="heading-4-600">{title}</h2>
      <section className="buttons flex justify-center items-center gap-5">
        <button
          className={`filter-gray-button large-button ${
            active == "asc" ? "active-filter-gray-button" : ""
          }`}
          value={`${select}By=asc`}
          onClick={(e) => {
            setReset(true);
            e.preventDefault();
            setActive("asc");

            if (searchParams.includes(`${select}By`)) {
              setSearchParams(
                searchParams
                  .replace(`${select}By=`, " ")
                  .concat(`${e.currentTarget.value}&`)
              );
            } else {
              setSearchParams(searchParams.concat(`${e.currentTarget.value}&`));
            }
          }}
        >
          Mínimo
        </button>
        <button
          className={`filter-gray-button large-button ${
            active == "desc" ? "active-filter-gray-button" : ""
          }`}
          value={`${select}By=desc`}
          onClick={(e) => {
            e.preventDefault();
            setReset(true);
            setActive("desc");

            if (searchParams.includes(`${select}By`)) {
              setSearchParams(
                searchParams
                  .replace(`${select}By=`, " ")
                  .concat(`${e.currentTarget.value}&`)
              );
            } else {
              setSearchParams(searchParams.concat(`${e.currentTarget.value}&`));
            }
          }}
        >
          Máximo
        </button>
      </section>
    </section>
  );
};
