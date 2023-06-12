import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import InfoSellerProfile from "@/components/infoSellerProfile";

const ProfilePage = () => {
    return (
        <>
            <Header />
            <main className="pb-11 bg-gradient-to-b from-brand-1 from-30% to-grey-8 to-30%">
                <div className="lg:px-44 py-9">
                    <InfoSellerProfile/>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ProfilePage;