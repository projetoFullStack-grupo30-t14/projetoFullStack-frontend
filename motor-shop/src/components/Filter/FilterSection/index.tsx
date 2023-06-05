interface FilterSectionProps {
  title: string;
  values: Array<string | number>;
}

export const FilterSection = ({ title, values }: FilterSectionProps) => {
  return (
    <section className="filter-section">
      <h2>{title}</h2>
      {values.map((brandName: string | number) => {
        return (
          <h3 id={brandName.toString()} key={brandName}>
            {brandName}
          </h3>
        );
      })}
    </section>
  );
};
