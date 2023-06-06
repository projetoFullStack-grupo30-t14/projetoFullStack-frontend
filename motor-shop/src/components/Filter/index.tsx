import { useState } from "react";
import { FilterBox } from "./FilterBox";

export const Filter = () => {
  const [show, setShow] = useState(false);
  return (
    <section
      className={`flex ${
        show ? "flex-col-reverse" : "flex-col"
      } justify-center items-center`}
    >
      <button
        className="md:hidden lg:hidden btn-brand1 btn-big"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Ver anúncios" : "Filtros"}
      </button>
      <FilterBox
        className={`${
          show ? "" : "hidden"
        } md:block lg:block max-w-md min-w-[300px]`}
      />
    </section>
  );
};
