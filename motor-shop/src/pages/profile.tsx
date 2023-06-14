import CardCarSeller from "@/components/cardCarSeller";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";
import ListCards from "@/components/listCards";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";

const ProfilePage = () => {
    return (
        <>
            <Header />
            <main className="pb-11 bg-gradient-to-b from-brand-1 from-30% to-grey-8 to-30%">
                <div className="lg:px-44 pt-20">
                    <InfoSellerProfile />
                </div>
                <div className="md:pl-20 sm:pl-4 py-6 w-full">
                    <ListCards carList={carsListMock}>
                        {(car: TCar) => (
                            <CardCarSeller car={car} />
                        )}
                    </ListCards>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ProfilePage;