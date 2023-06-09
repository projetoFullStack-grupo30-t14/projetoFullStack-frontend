import { Filter } from "@/components/Filter";
import { Header } from "@/components/header/header";
import ListCards from "@/components/listCards";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <header>The hader div</header> */}
      <>
        <figure className="mb-12">
          <img src="/Home_top_image.png" alt="" />
        </figure>
        <section className="flex flex-col gap-y-8 md:flex-row-reverse lg:flex-row-reverse md:gap-x-4 lg:gap-x-8">
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
