import CardCarSeller from "@/components/cardCarSeller";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";
import ListCards from "@/components/listCards";
import { TCar } from "@/schemas/car.schema";
import { useAuth } from "@/contexts/authContext";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { useCars } from "@/contexts/carContext";
import { useModal } from "@/contexts/modalContext";
import { CreateAdForm } from "@/components/forms/createAdForm";
import { Navigation } from "@/components/Navigation";

const ProfilePage = () => {
  const { protect } = useAuth();
  const { showModal } = useModal();
  const { currUser } = useContext(UserContext);
  const { getCarsByOwner, listCarsByOwner } = useCars();

  useEffect(() => {
    protect();
    const fetchData = async () => {
      try {
        await getCarsByOwner("");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <main className="pb-11 bg-gradient-to-b from-brand-1 from-20% to-grey-8 to-20%">
        <div className="lg:px-44 pt-20 mb-14">
          <InfoSellerProfile userData={currUser!}>
            {
              <div className="text-left">
                <button 
                  className="btn-brand-outline-brand1 rounded py-3 px-4 font-inter"
                  onClick={() => {
                  
                    showModal(<CreateAdForm />, "Criar anúncio");
                  }}>
                  Criar Anúncio
                </button>
              </div>
            }
          </InfoSellerProfile>
        </div>
        <div className="md:pl-20 sm:pl-4 py-6 w-full">
          <ListCards carList={listCarsByOwner}>
            {(car: TCar) => <CardCarSeller car={car} />}
          </ListCards>
        </div>
        <Navigation
          perPage={16}
          className="lg:relative z-10 min-h-[158px] mt-10"
        />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
