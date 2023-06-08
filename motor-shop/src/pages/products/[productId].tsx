import Aside from "@/components/aside";
import { CommentList } from "@/components/commentList";
import { NewComment } from "@/components/commentNew";
import ProductDetail from "@/components/productDetail";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <>
      <header>header</header>
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
      <footer>Same as homepage</footer>
    </>
  );
}
