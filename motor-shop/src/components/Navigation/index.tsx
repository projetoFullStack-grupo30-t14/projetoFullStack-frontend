import { useCars } from "@/contexts/carContext";

export const Navigation = () => {
  const { nextPage, previousPage, getAllCars } = useCars();
  const index = nextPage?.indexOf("?") || previousPage?.indexOf("?");
  const currPage =
    Number(
      nextPage?.slice(
        nextPage.indexOf("page=") + 5,
        nextPage.indexOf("page=") + 6
      )
    ) - 1 ||
    Number(
      previousPage?.slice(
        previousPage.indexOf("page=") + 5,
        previousPage.indexOf("page=") + 6
      )
    ) + 1;

  return (
    <section className="flex flex-row gap-4">
      {previousPage && (
        <button
          onClick={() => {
            getAllCars(previousPage.slice(index));
          }}
        >
          {"< Anterior"}
        </button>
      )}
      <p>{currPage + " de 2"}</p>
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
