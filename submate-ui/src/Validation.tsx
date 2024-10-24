import { z } from "zod";

const createNumberSchema = (
  {
    minValue,
    maxValue,
  }: {
    minValue?: number;
    maxValue?: number;
  },
  customMessages?: {
    invalidType?: string;
    invalidNumber?: string;
    min?: string;
    max?: string;
  }
) => {
  return z
    .union([
      z.number().refine((value) => !isNaN(value), {
        message:
          customMessages?.invalidNumber || "Input must be a valid number",
      }),
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message:
            customMessages?.invalidNumber || "Input must be a valid number",
        })
        .transform((value) => Number(value)),
    ])
    .refine((value) => typeof value === "number", {
      message: customMessages?.invalidType || "Input must be a number",
    })
    .refine((value) => (minValue !== undefined ? value >= minValue : true), {
      message:
        customMessages?.min ||
        `Number must be greater than or equal to ${minValue}`,
    })
    .refine((value) => (maxValue !== undefined ? value <= maxValue : true), {
      message:
        customMessages?.max ||
        `Number must be less than or equal to ${maxValue}`,
    });
};

const priceSchema = createNumberSchema(
  { minValue: 1 },
  {
    min: `Please enter a valid price`,
  }
);

const categoryIdSchema = createNumberSchema(
  {
    minValue: 1,
  },
  {
    min: `Please select category`,
  }
);

export const subscriptionRequestSchema = z.object({
  categoryId: categoryIdSchema,
  plateform: z.string().min(1, { message: "Plateform is required" }),
  image: z.string(),
  price: priceSchema,
  billing: z.string({ message: "Billing is required" }),
  startDate: z.string(),
});
