import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { values } from "./mock";

interface iFilter {
  titleFilter: string;
  categoriesFilter: string;
  materialsFilter: string;
  costFilter: string;
}

export const FilterBox = () => {
  const [selFilter, setselFilter] = useState([] as string[]);

  const { year, brand, color, model } = values;

  //   useEffect(() => {
  //     document.addEventListener("input", (event) => {
  //       const eventTargetElement = event.target;
  //       if (eventTargetElement.name === "materialsFilter") {
  //         let value = eventTargetElement.value;
  //         return value !== "" &&
  //           !selFilter.includes(value) &&
  //           !value.includes("Não")
  //           ? setselFilter([...selFilter, value])
  //           : setselFilter([...selFilter]);
  //       }
  //     });
  //   }, [selFilter]);

  const { register, handleSubmit } = useForm<iFilter>({
    mode: "onBlur",
    // resolver: yupResolver(filterSchema),
    defaultValues: {},
  });

  //   let materialsTreated = ideasMaterials.map((mat) => {
  //     return { value: mat, text: mat };
  //   });

  const onSubmit: SubmitHandler<iFilter> = (data: any) => {
    let matParams = selFilter.map((mat) => `materials=${mat}`).join("&");
    let body = [
      `${data.model ? `title=${data.model}` : ""}`,
      `${selFilter ? matParams.replaceAll(" ", "%20") : ""}`,
      `${data.costFilter ? `maximumCost=${data.costFilter}` : ""}`,
    ];
    console.log(body);
  };

  return (
    <section style={{ backgroundColor: "red" }}>
      <form onInput={handleSubmit(onSubmit)}></form>
    </section>
  );
};
