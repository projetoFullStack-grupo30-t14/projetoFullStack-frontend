import { Filter } from "@/components/Filter";
import { Header } from "@/components/header/header";
import ListCards from "@/components/listCards";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <header>The hader div</header> */}
      <header>A big image</header>
      <>
        <main>
          <ListCards />
        </main>
        <aside>
          <Filter />
        </aside>
        <footer>The page navigator</footer>
      </>
      <footer>This is the footer div</footer>
    </>
  );
}
