import CardCar from "@/components/cardCar";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";
import ListCards from "@/components/listCards";
import { useCars } from "@/contexts/carContext";
import { UserContext } from "@/contexts/userContext";
import { UserType } from "@/schemas";
import { TCar } from "@/schemas/car.schema";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


const Profiles = () => {
    const router = useRouter();
    const { sellerId } = router.query;
    const { listAll } = useContext(UserContext)
    const [sellerData, setSellerData] = useState<UserType | null>(null)
    const { listCars } = useCars()
    const [ listCarsSeller, setListCarSeller] = useState<TCar[]>([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof sellerId === "string") {
                    const users = await listAll();
                    const filteredUser = users!.filter(user => user.id === sellerId);
                    const filteredCars = listCars.filter(car => car.usersId === sellerId)

                    setSellerData(filteredUser[0])
                    setListCarSeller(filteredCars)
                }
            } catch (err) {
                console.log(err);
            };
        }
        fetchData();
    },[]);

    return (
        <>
            <Header />
            <main className="pb-11 bg-gradient-to-b from-brand-1 from-20% to-grey-8 to-20%">
                <div className="lg:px-44 pt-20 mb-14">
                    <InfoSellerProfile userData={sellerData!}>
                        {<></>}
                    </InfoSellerProfile>
                </div>
                <h1 className="text-heading-5 font-bold font-lexend mx-14 my-8">Anúncios</h1>
                <div className="md:pl-20 sm:pl-4 py-6 w-full">
                    <ListCards carList={listCarsSeller}>
                        {(car: TCar) => <CardCar car={car} />}
                    </ListCards>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Profiles