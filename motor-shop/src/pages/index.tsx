import { Filter } from "@/components/Filter";
import { Header } from "@/components/header/header";
import ListCards from "@/components/listCards";

export default function HomePage() {
  return (
    <>
      <Header />
      <>
        <div className="relative mb-12 w-full bg-gradient-to-b from-grey-black29 to-grey-black100 flex justify-center items-center">
          <figure>
            <img className="object-cover w-full h-96" src="/big_car_img.png" alt="" />
          </figure>
          <div className="absolute text-center">
            <p className="heading-3-500 sm:heading-1-700 text-grey-10">Motors Shop</p>
            <p className="heading-5-500 pb-40 sm:heading-2-600 sm:pb-0 text-grey-10">A melhor plataforma de anúncios do país</p>
          </div>
        </div>
        <section
          // style={{ backgroundColor: "red" }}
          className="flex flex-col gap-y-8 md:flex-row-reverse lg:flex-row-reverse md:gap-x-4 lg:gap-x-8"
        >
          <main>
            <ListCards />
          </main>
          <aside>
            <Filter />
          </aside>
        </section>
        <footer>The page navigator</footer>
      </>
      <footer>This is the footer div</footer>
    </>
  );
}
