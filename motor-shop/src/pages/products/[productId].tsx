import Aside from "@/components/aside";
import { CommentList } from "@/components/commentList";
import { NewComment } from "@/components/commentNew";
import { Header } from "@/components/header/header";
import ProductDetail from "@/components/productDetail";
import { useRouter } from "next/router";

export default function Products () {
    const router = useRouter()
    const { productId } = router.query

    return (
        <>
            {/* Top Background = Blue
            Bottom background = Grey? */}
            <header>header</header>
            <main>
                <section className="md:flex md:justify-between">
                    <ProductDetail />
                    <Aside />
                </section>
                <CommentList/>
                <NewComment/>
            </main>
            <footer>Same as homepage</footer>
        </>
    )
}