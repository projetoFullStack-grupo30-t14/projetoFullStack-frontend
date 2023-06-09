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
        <section
          // style={{ backgroundColor: "red" }}
          className="lg:flex md:flex flex-row-reverse lg:gap-x-12"
        >
          <main className="">
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
