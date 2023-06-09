import React from "react";
import Image from "next/image";

const ProductDetail = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-grey-10 rounded">
          <Image
            width={400}
            height={186}
            src={"/car.png"}
            alt={"car image"}
            className="flex w-full md:px-20 py-9 "
          />
        </div>

        <div className=" bg-grey-10 flex flex-col gap-5 rounded py-7 px-11">
          <h3 className="heading-6-600">
            Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200{" "}
          </h3>
          <div className="flex justify-between ">
            <div className="flex gap-2">
              <p className="btn-brand-opacity btn-small"> 2013 </p>
              <p className="btn-brand-opacity btn-small"> 0 KM </p>
            </div>
            <p className="heading-7-500">R$ 00.000,00</p>
          </div>
          <button className="btn-brand1 btn-medium">Comprar</button>
        </div>

        <div className="bg-grey-10 mt-4 rounded py-7 px-11">
          <h5 className="heading-6-600">Descrição</h5>
          <p className="body-1-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
