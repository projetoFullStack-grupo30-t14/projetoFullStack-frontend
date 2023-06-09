import Aside from "@/components/aside";
import { CommentList } from "@/components/commentList";
import { NewComment } from "@/components/commentNew";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import ProductDetail from "@/components/productDetail";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <>
      <Header/>
      <main className="bg-grey-8 h-screen">
        <div className="bg-brand-1 h-96 absolute">
          <div className="lg:px-44">
            <section className="md:flex md:justify-between py-9 gap-5">
              <ProductDetail />
              <Aside />
            </section>
            <div>
              <CommentList />
              <NewComment />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
