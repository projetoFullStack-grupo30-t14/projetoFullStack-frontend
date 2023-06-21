import { Filter } from "@/components/Filter";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import ListCards from "@/components/listCards";
import CardCar from "@/components/cardCar";
import { TCar } from "@/schemas/car.schema";
import { useEffect } from "react";
import { useCars } from "@/contexts/carContext";
import { Navigation } from "@/components/Navigation";

export default function HomePage() {
  const { getAllCars, listCars } = useCars();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllCars("");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="pb-11">
        <div className="relative mb-12 w-full flex justify-center items-center">
          <figure
            className="bg-no-repeat bg-center"
            style={{
              backgroundImage: "url(/big_car_img_unfilter.png)",
              height: "500px",
              width: "100%",
            }}
          >
            <div className="bg-gradient-to-b from-grey-black29 to-grey-black100 w-full h-full"></div>
          </figure>
          <div className="absolute text-center">
            <p className="heading-3-500 mb-3 font-lexend sm:heading-1-700 text-grey-10">
              Motors Shop
            </p>
            <p className="heading-5-500 pb-80 px-6 font-lexend sm:heading-2-600 sm:pb-0 text-grey-10">
              A melhor plataforma de anúncios do país
            </p>
          </div>
        </div>
        <section className="flex flex-col gap-y-8 md:flex-row-reverse lg:flex-row-reverse md:gap-x-4 lg:gap-x-8">
          <main className="w-full md:w-3/3">
            <ListCards carList={listCars}>
              {(car: TCar) => <CardCar car={car} />}
            </ListCards>
            <Navigation />
          </main>
          <aside className="lg:relative z-10 w-full md:w-1/3">
            <Filter />
          </aside>
        </section>
      </div>
      <Footer />
    </div>
  );
}
