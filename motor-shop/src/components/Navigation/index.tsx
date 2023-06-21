import { useCars } from "@/contexts/carContext";

export const Navigation = () => {
  const { nextPage, previousPage, getAllCars } = useCars();
  const index = nextPage?.indexOf("?") || previousPage?.indexOf("?");
  return (
    <section>
      {/* <button>{"Seguinte >"}</button> */}
      {previousPage && (
        <button
          onClick={() => {
            getAllCars(previousPage.slice(index));
          }}
        >
          {"< Anterior"}
        </button>
      )}
      {nextPage && (
        <button
          onClick={() => {
            getAllCars(nextPage.slice(index));
          }}
        >
          {"Seguinte >"}
        </button>
      )}
    </section>
  );
};
