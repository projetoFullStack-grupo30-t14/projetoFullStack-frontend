import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";

export default function RegisterPage() {
    return (
        <>
            <Header/>
            <main>
                <div className="flex justify-center items-center bg-grey-8 h-96 w-full">
                    <h1>The register form</h1>
                </div>
            </main>
            <Footer/>
        </>
    )
}