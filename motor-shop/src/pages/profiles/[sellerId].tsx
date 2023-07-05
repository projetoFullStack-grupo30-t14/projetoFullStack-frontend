import { Navigation } from "@/components/Navigation";
import CardCar from "@/components/cardCar";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";
import ListCards from "@/components/listCards";
import { useCars } from "@/contexts/carContext";
import { TCar } from "@/schemas/car.schema";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profiles = () => {
  const router = useRouter();
  const { sellerId } = router.query;
  const { getAllCars, listCars } = useCars();
  let carsActive = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof sellerId === "string") {
          await getAllCars(`?user_id=${sellerId}&perPage=16`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{`MotorShop - ${listCars[0].user.name || `Carregando`}`}</title>
      </Head>
      <Header />
      <main className="pb-11 bg-gradient-to-b from-brand-1 from-20% to-grey-8 to-20%">
        <div className="lg:px-44 pt-20 mb-14">
          <InfoSellerProfile
            userData={listCars.length > 0 ? listCars[0].user : null}
          >
            {<></>}
          </InfoSellerProfile>
        </div>
        <h1 className="text-heading-5 font-bold font-lexend mx-14 my-8">
          Anúncios
        </h1>
        {listCars && listCars.length > 0 ? (
          ((carsActive = listCars.filter((car) => car.is_active)),
          (
            <div className="md:pl-20 sm:pl-4 py-6 w-full">
              <ListCards carList={carsActive}>
                {(car: TCar) => <CardCar car={car} />}
              </ListCards>
            </div>
          ))
        ) : (
          <div className="flex justify-center w-full">
            <p className="self-center heading-5-500 text-grey-3 bg-grey-7 rounded-full w-fit py-1 px-4 overflow-hidden">
              Ainda não há anúncios
            </p>
          </div>
        )}
        <Navigation
          perPage={16}
          className="lg:relative z-10 min-h-[158px] mt-10"
        />
      </main>
      <Footer />
    </>
  );
};

export default Profiles;
