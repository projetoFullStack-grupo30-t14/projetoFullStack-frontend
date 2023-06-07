import { Filter } from "@/components/Filter";
import { Header } from "@/components/header/header";
import ListCards from "@/components/listCards";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <header>The hader div</header> */}
      <main>
        <header>A big image</header>
        <main>
          <ListCards />
          <aside>
            <Filter />
          </aside>
        </main>
        <footer>The page navigator</footer>
      </main>
      <footer>This is the footer div</footer>
    </>
  );
}
