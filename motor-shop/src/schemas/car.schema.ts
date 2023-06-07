import {z} from 'zod'

export const carSchema = z.object({
    id: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    fuel: z.enum(['flex', 'hybrid', 'electric']),
    mileage: z.number(),
    color: z.string(),
    price_FIPE: z.number(),
    price: z.number(),
    description: z.string(),
    cover_image: z.string(),
    is_active: z.boolean(),
    created_at: z.date(),
    car_gallery: z.array(
      z.object({
        id: z.string(),
        car_id: z.string(),
        image: z.string(),
      })
    ),
  });

  export type TCar = z.infer<typeof carSchema>