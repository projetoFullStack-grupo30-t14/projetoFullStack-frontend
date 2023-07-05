import Aside from "@/components/productDetail/aside";
import { CommentList } from "@/components/productDetail/commentList";
import { NewComment } from "@/components/productDetail/commentNew";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import ProductDetail from "@/components/productDetail/productDetail";
import { useRouter } from "next/router";
import { useCars } from "@/contexts/carContext";
import { useEffect } from "react";
import Head from "next/head";

const Product = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { getOneCar, listOneCar } = useCars();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof productId === "string") {
          await getOneCar(productId);
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
        <title>{`MotorShop - ${listOneCar?.model || `Carregando`}`}</title>
      </Head>
      <Header />
      <main className="pb-11 bg-gradient-to-b from-brand-1 from-30% to-grey-8 to-30%">
        <div className="lg:px-44 px-5 ">
          <section className="md:flex justify-stretch py-9 gap-7">
            <ProductDetail car={listOneCar} />
            <Aside car={listOneCar} />
          </section>
          <CommentList />
          <NewComment />
          <div className="relative z-10 hidden h-0 m-0"></div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Product;
