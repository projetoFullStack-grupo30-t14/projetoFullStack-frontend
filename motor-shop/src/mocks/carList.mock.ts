import { TCar } from "@/schemas/car.schema";


export const carsListMock: TCar[] = [
    {
      id: 'c4d8a29a-85e3-4a68-b8b2-9ff04e5a3a06',
      brand: 'Brand 1',
      model: 'Model 1',
      year: 2020,
      fuel: 'hybrid',
      mileage: 0,
      color: 'Green',
      price_FIPE: 52632,
      price: 56175,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro1.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: '20a3fc8b-91b1-4752-a370-43a4bc864f2a',
          car_id: 'c4d8a29a-85e3-4a68-b8b2-9ff04e5a3a06',
          image: 'image1_1.jpg'
        },
        {
          id: '27726f8a-3e3a-4537-b0f9-0ccdf2650b71',
          car_id: 'c4d8a29a-85e3-4a68-b8b2-9ff04e5a3a06',
          image: 'image2_1.jpg'
        }
      ]
    },
    {
      id: 'fa49711e-b2ad-4e4e-a0f9-8c47a2c7452c',
      brand: 'Brand 2',
      model: 'Model 2',
      year: 2021,
      fuel: 'flex',
      mileage: 31668,
      color: 'Blue',
      price_FIPE: 16622,
      price: 18890,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro2.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: '47d9985b-2ec4-4b47-a6af-826673957b1e',
          car_id: 'fa49711e-b2ad-4e4e-a0f9-8c47a2c7452c',
          image: 'image1_2.jpg'
        },
        {
          id: '8838998d-b19e-4ef7-9f5a-3436f13f9d61',
          car_id: 'fa49711e-b2ad-4e4e-a0f9-8c47a2c7452c',
          image: 'image2_2.jpg'
        }
      ]
    },
    {
      id: '1fcab2b5-34f3-4c37-bb62-8b2d8a8f6dfb',
      brand: 'Brand 3',
      model: 'Model 3',
      year: 2022,
      fuel: 'electric',
      mileage: 42101,
      color: 'Red',
      price_FIPE: 26471,
      price: 29357,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro3.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: '4f4ef1cc-2cc3-4e62-8b6f-cb65ee89d01a',
          car_id: '1fcab2b5-34f3-4c37-bb62-8b2d8a8f6dfb',
          image: 'image1_3.jpg'
        },
        {
          id: 'f6942c8a-d5f2-4a4e-8dd2-6c5e4dc7c59a',
          car_id: '1fcab2b5-34f3-4c37-bb62-8b2d8a8f6dfb',
          image: 'image2_3.jpg'
        }
      ]
    },
    {
      id: 'ae558583-9d7b-40ed-8e7e-fa2f559eb5ad',
      brand: 'Brand 4',
      model: 'Model 4',
      year: 2023,
      fuel: 'hybrid',
      mileage: 31898,
      color: 'Black',
      price_FIPE: 20764,
      price: 22450,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro4.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: 'a66e0a2d-2281-402b-8272-d65f5e13af53',
          car_id: 'ae558583-9d7b-40ed-8e7e-fa2f559eb5ad',
          image: 'image1_4.jpg'
        },
        {
          id: '75560962-9e0e-45ef-9253-b2681277ad5e',
          car_id: 'ae558583-9d7b-40ed-8e7e-fa2f559eb5ad',
          image: 'image2_4.jpg'
        }
      ]
    },
    {
      id: '2fb0b7e9-2a39-4801-bad6-032ccfe88e17',
      brand: 'Brand 5',
      model: 'Model 5',
      year: 2024,
      fuel: 'electric',
      mileage: 18619,
      color: 'White',
      price_FIPE: 32694,
      price: 35150,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro5.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: 'f1b3c9a5-2565-434b-bb17-8ae8a972da0d',
          car_id: '2fb0b7e9-2a39-4801-bad6-032ccfe88e17',
          image: 'image1_5.jpg'
        },
        {
          id: 'c57b02dd-4820-45d0-8e16-2ab876a0a086',
          car_id: '2fb0b7e9-2a39-4801-bad6-032ccfe88e17',
          image: 'image2_5.jpg'
        }
      ]
    },
    {
      id: 'e19e72b4-277f-4c88-8d5c-2c6e91f30059',
      brand: 'Brand 6',
      model: 'Model 6',
      year: 2025,
      fuel: 'flex',
      mileage: 46902,
      color: 'Black',
      price_FIPE: 15248,
      price: 17630,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
      cover_image: '/carro6.png',
      is_active: true,
      created_at: new Date('2023-06-05T12:30:00.000Z'),
      car_gallery: [
        {
          id: '866f8a97-6b7b-46db-8311-8c30cbed8d02',
          car_id: 'e19e72b4-277f-4c88-8d5c-2c6e91f30059',
          image: 'image1_6.jpg'
        },
        {
          id: '0b34c8a2-d0db-4eab-9e47-929c5f9932c5',
          car_id: 'e19e72b4-277f-4c88-8d5c-2c6e91f30059',
          image: 'image2_6.jpg'
        }
      ]
    }
  ];