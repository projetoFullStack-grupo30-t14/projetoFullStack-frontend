import CardCarSeller from "@/components/cardCarSeller";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";
import ListCards from "@/components/listCards";
import { carsListMock } from "@/mocks/carList.mock";
import { TCar } from "@/schemas/car.schema";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";

const ProfilePage = () => {
  const { protect } = useAuth();

  useEffect(() => {
    protect();
  });
  return (
    <>
      <Header />
      <main className="pb-11 bg-gradient-to-b from-brand-1 from-20% to-grey-8 to-20%">
        <div className="lg:px-44 pt-20 mb-14">
          <InfoSellerProfile />
        </div>
        <div className="md:pl-20 sm:pl-4 py-6 w-full">
          <ListCards carList={carsListMock}>
            {(car: TCar) => <CardCarSeller car={car} />}
          </ListCards>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
