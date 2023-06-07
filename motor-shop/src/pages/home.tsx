import { Header } from "@/components/header/header"
import ListCards from "@/components/listCards"

export default function HomePage () {
    return (
        <>
            <Header/>
            {/* <header>The hader div</header> */}
            <main>
                <header>A big image</header>
                <main>
                    <ListCards/>
                    <aside>The aside div with the filters </aside>
                </main>
                <footer>The page navigator</footer>
            </main>
            <footer>This is the footer div</footer>
        </>
    )
}