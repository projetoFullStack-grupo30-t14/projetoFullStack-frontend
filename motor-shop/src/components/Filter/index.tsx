import { useState } from "react";
import { FilterBox } from "./FilterBox";

export const Filter = () => {
  const [show, setShow] = useState(false);

  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShow(!show);
        }
      }}
      className={`${
        show
          ? "h-[100%] mt-[76px] bg-opacity-40 bg-grey-2 absolute z-10 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]"
          : ""
      }`}
    >
      <section
        className={`flex max-w-screen bg-grey-whiteFixed ${
          show ? "flex-col-reverse relative w-screen h-5/6" : "flex-col"
        } justify-center items-center md:max-w-xs lg:max-w-xs lg:static`}
      >
        <button
          className={`md:hidden lg:hidden btn-brand1 btn-big ${
            show ? "absolute bottom-0 mb-4" : ""
          }`}
          onClick={() => {
            setShow(!show);
            window.scrollTo(0, 0);
          }}
        >
          {show ? "Ver anúncios" : "Filtros"}
        </button>
        <FilterBox
          className={`${
            show ? "h-4/5" : "hidden"
          } md:block lg:block max-w-md min-w-[300px] z-40`}
          setShow={setShow}
        />
      </section>
    </section>
  );
};
