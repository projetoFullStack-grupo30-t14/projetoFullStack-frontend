import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";

export default function LoginPage() {
    return (
        <>
            <Header/>
            <main>
                <div className="flex justify-center items-center bg-grey-8 h-96 w-full">
                    <h1>User information</h1>
                </div>
            </main>
            <Footer/>
        </>
    )
}