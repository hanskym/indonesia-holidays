import * as z from 'zod';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

export const holidaysQuerySchema = z.object({
  year: z.coerce
    .number({
      error: "Parameter 'year' harus berupa angka.",
    })
    .int({
      error: "Parameter 'year' harus bilangan bulat.",
    })
    .min(MIN_YEAR, {
      error: `Parameter 'year' harus antara ${MIN_YEAR}-${MAX_YEAR}.`,
    })
    .max(MAX_YEAR, {
      error: `Parameter 'year' harus antara ${MIN_YEAR}-${MAX_YEAR}.`,
    }),

  month: z.coerce
    .number({
      error: "Parameter 'month' harus berupa angka.",
    })
    .int({
      error: "Parameter 'month' harus bilangan bulat.",
    })
    .min(1, {
      error: "Parameter 'month' harus antara 1-12.",
    })
    .max(12, {
      error: "Parameter 'month' harus antara 1-12.",
    })
    .optional(),
});

export type HolidaysQuery = z.infer<typeof holidaysQuerySchema>;

export const apiHolidayEntrySchema = z.object({
  date: z.string(),
  day: z.string(),
  name: z.string(),
  type: z.enum(['holiday', 'leave']),
});

export const apiHolidaysSuccessSchema = z.object({
  success: z.literal(true),
  data: z.array(apiHolidayEntrySchema),
  meta: z.object({
    total: z.number().optional().default(0),
    total_holidays: z.number().optional().default(0),
    total_leave: z.number().optional().default(0),
    year: z.number(),
    month: z.number().optional(),
  }),
});

export const apiHolidaysErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
});

export const apiHolidaysResponseSchema = z.discriminatedUnion('success', [
  apiHolidaysSuccessSchema,
  apiHolidaysErrorSchema,
]);

export type ApiHolidayEntry = z.infer<typeof apiHolidayEntrySchema>;
export type ApiHolidaysResponse = z.infer<typeof apiHolidaysResponseSchema>;
