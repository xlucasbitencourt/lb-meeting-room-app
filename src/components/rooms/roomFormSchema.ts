import { z } from "zod";

export const roomFormSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    local: z.string().min(3, "O local deve ter pelo menos 3 caracteres."),

    capacity: z.coerce
      .number()
      .int("A capacidade deve ser um número inteiro.")
      .positive("A capacidade deve ser um número positivo."),

    start_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)."),
    end_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)."),
  })
  .refine((data) => data.end_time > data.start_time, {
    message: "O horário de término deve ser após o horário de início.",
    path: ["end_time"],
  });

export type RoomFormData = z.infer<typeof roomFormSchema>;
