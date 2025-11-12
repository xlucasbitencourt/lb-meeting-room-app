import { z } from "zod";

export const bookingFormSchema = z
  .object({
    responsible_name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres."),
    attendees: z.coerce
      .number()
      .int("Deve ser um número inteiro.")
      .positive("O número de participantes deve ser maior que zero."),
    room_id: z.coerce.number().positive("Deve selecionar uma sala."),
    booking_date: z.string().min(10, "A data é obrigatória."),
    start_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)."),
    end_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)."),
    has_coffee: z.boolean(),
    coffee_description: z.string().optional(),
  })
  .refine((data) => data.end_time > data.start_time, {
    message: "O horário de término deve ser após o horário de início.",
    path: ["end_time"],
  });

export type BookingFormData = z.infer<typeof bookingFormSchema>;
