import React, { useContext, useEffect, useState } from 'react';
import { TCar } from '@/schemas/car.schema';
import { UserContext } from '@/contexts/userContext';
import { UserType } from '@/schemas';
import { api } from '@/services';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductDetail = ({ car }: { car?: TCar }) => {
  const { currUser } = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-grey-10 rounded">
          <img
            src={car?.cover_image}
            alt={car?.model}
            className="flex w-full md:px-20 py-9 "
          />
        </div>

        <div className=" bg-grey-10 flex flex-col gap-5 rounded py-7 px-11">
          <h3 className="heading-6-600">
            {car?.brand} - {car?.model}
          </h3>
          <div className="flex justify-between ">
            <div className="flex gap-2">
              <span className="btn-brand-opacity btn-small">
                {' '}
                {car?.year}{' '}
              </span>
              <span className="btn-brand-opacity btn-small">
                {car?.mileage} KM
              </span>
            </div>
            <p className="heading-7-500 text-grey-1 ">
              R$
              {car?.price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {currUser ? (
            <Link
              href={`https://wa.me/55${car?.user.phone}?text=Ol%C3%A1%2C+vi+seu+an%C3%BAncio+no+Motors+Shop+e+gostaria+de+conversar%21`}
              target="_blank"
            >
              <button className="btn-brand1 btn-medium w-max">
                Comprar
              </button>
            </Link>
          ) : (
            <button
              className="btn-negative btn-medium w-max z-10"
              onClick={() => router.push('/login')}
            >
              Comprar
            </button>
          )}
        </div>

        <div className="bg-grey-10 mt-4 rounded py-7 px-11">
          <h5 className="heading-6-600">Descrição</h5>
          <p className="body-1-400">{car?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
