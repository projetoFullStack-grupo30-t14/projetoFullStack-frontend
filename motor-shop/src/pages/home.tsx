import { Header } from "@/components/header/header";

import { FilterBox } from "@/components/Filter";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <header>The hader div</header> */}
      <main>
        <header>A big image</header>
        <main>
          <ul>The car list</ul>
          <aside>
            <FilterBox />
          </aside>
        </main>
        <footer>The page navigator</footer>
      </main>
      <footer>This is the footer div</footer>
    </>
  );
}
