import { useState } from "react";
import { FilterBox } from "./FilterBox";

export const Filter = () => {
  const [show, setShow] = useState(false);

  return (
    <section
      className={`flex max-w-xs bg-grey-whiteFixed ${
        show && window.innerWidth < 641
          ? "flex-col-reverse absolute z-10 top-20 w-screen h-4/5"
          : "flex-col"
      } justify-center items-center`}
    >
      <button
        className={`md:hidden lg:hidden btn-brand1 btn-big ${
          show ? "absolute bottom-0" : ""
        }`}
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Ver anúncios" : "Filtros"}
      </button>
      <FilterBox
        className={`${
          show && window.innerWidth < 641 ? "h-5/6" : "hidden"
        } md:block lg:block max-w-md min-w-[300px]`}
        setShow={setShow}
      />
    </section>
  );
};
