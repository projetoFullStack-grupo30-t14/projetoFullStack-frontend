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
      <main className="pb-11 bg-gradient-to-b from-brand-1 from-30% to-grey-8 to-30%">
          <div className="lg:px-44">
            <section className="relative z-10 md:flex md:justify-between py-9 gap-5">
              <ProductDetail />
              <Aside />
            </section>
            <div className="relative z-10">
              <CommentList />
              <NewComment />
            </div>
          </div>
      </main>
      <Footer/>
    </>
  );
}
