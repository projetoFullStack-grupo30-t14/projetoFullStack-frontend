import CardCar from "@/components/cardCar";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";
import { Header } from "@/components/header/header"


export default function HomePage () {
    return (
        <>
            <Header/>
            {/* <header>The hader div</header> */}
            <main>
                <header>A big image</header>
                <main>
                    <ul className="flex gap-3 overflow-x-auto">
                        {carsListMock.map((car: TCar) => (
                            <CardCar key={car.id} car={car} />
                        ))}
                    </ul>
                    <aside>The aside div with the filters </aside>
                </main>
                <footer>The page navigator</footer>
            </main>
            <footer>This is the footer div</footer>
        </>
    )
}