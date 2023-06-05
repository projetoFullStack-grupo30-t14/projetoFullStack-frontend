import { Dispatch, SetStateAction, useState } from "react";

interface FilterButtonProps {
  title: string;
  select: string;
  setReset: Dispatch<SetStateAction<boolean>>;
}
export const FilterButtons = ({
  title,
  select,
  setReset,
}: FilterButtonProps) => {
  const [active, setActive] = useState("");
  return (
    <section className="filter-section flex flex-col">
      <h2 className="filter-title">{title}</h2>
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
            console.log(e.currentTarget.value);
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
            console.log(e.currentTarget.value);
          }}
        >
          Máximo
        </button>
      </section>
    </section>
  );
};
