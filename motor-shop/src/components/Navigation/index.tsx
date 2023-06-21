import { useCars } from "@/contexts/carContext";

export const Navigation = ({ perPage }: any) => {
  const { nextPage, previousPage, count, getAllCars } = useCars();
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
  let maxPages = count
    ? Math.round(Number(Number(count) / Number(perPage)))
    : 1;

  if (Number(count) % perPage !== 0) {
    maxPages += 1;
  }

  return (
    <section className="flex flex-row gap-4 relative z-30">
      {previousPage && (
        <button
          onClick={() => {
            getAllCars(previousPage.slice(index));
          }}
        >
          {"< Anterior"}
        </button>
      )}
      <p>{(currPage || "1") + " de " + maxPages}</p>
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
