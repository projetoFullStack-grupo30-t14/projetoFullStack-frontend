import { useCars } from "@/contexts/carContext";

interface NavigationProps {
  perPage: number;
  className: string;
}

export const Navigation = ({ perPage, className }: NavigationProps) => {
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

  if (Number(count) % perPage !== 0 && maxPages % 0.5 !== 0) {
    maxPages += 1;
  } else if (maxPages === 0) {
    maxPages += 1;
  }

  if (count) {
    return (
      <section
        className={
          className +
          " flex flex-col lg:flex-row justify-center items-center gap-4 relative z-30"
        }
      >
        {previousPage && (
          <button
            className="btn-brand-outline-brand1 border-none btn-big font-semibold text-heading5"
            onClick={() => {
              getAllCars(previousPage.slice(index));
            }}
          >
            {"< Anterior"}
          </button>
        )}
        <p className="heading-5-600 text-grey-3 text-opacity-50">
          <span className="text-grey-3">{currPage || "1"}</span>
          {" de " + maxPages}
        </p>
        {nextPage && (
          <button
            className="btn-brand-outline-brand1 border-none btn-big font-semibold text-heading5"
            onClick={() => {
              getAllCars(nextPage.slice(index));
            }}
          >
            {"Seguinte >"}
          </button>
        )}
      </section>
    );
  }
};
