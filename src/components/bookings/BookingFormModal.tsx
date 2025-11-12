import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Booking } from "../../types/booking";
import type { Room } from "../../types/room";
import { bookingFormSchema } from "./bookingFormSchema";
import {
  useCreateBooking,
  useUpdateBooking,
} from "../../hooks/bookings/useBookingMutations";
import {
  formatISOToDateInput,
  formatISOToTimeInput,
  combineDateAndTime,
} from "../../utils/formatters";
import { AxiosError } from "axios";
import Modal from "../ui/Modal";
import ErrorMessage from "../ui/ErrorMessage";
import type z from "zod";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";

type FastAPIErrorDetail = {
  detail: string;
};

interface FormInputProps<TName extends FieldPath<BookingFormValues>> {
  field: ControllerRenderProps<BookingFormValues, TName>;
  label: string;
  errorMessage?: string;
  type?: string;
}

function FormInput<TName extends FieldPath<BookingFormValues>>({
  field,
  label,
  type = "text",
  errorMessage,
}: FormInputProps<TName>) {
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm leading-6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={field.name}
          type={type}
          className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
            errorMessage ? "ring-red-500" : "ring-gray-300"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6`}
          name={field.name}
          ref={field.ref}
          onBlur={field.onBlur}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            if (type === "number") {
              field.onChange(value === "" ? "" : Number(value));
            } else {
              field.onChange(value);
            }
          }}
          value={
            type === "number"
              ? ((typeof field.value === "number"
                  ? field.value
                  : (field.value ?? "")) as number | string)
              : ((field.value ?? "") as string)
          }
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingToEdit: Booking | null;
  availableRooms: Room[];
}

type BookingFormValues = z.input<typeof bookingFormSchema>;

export default function BookingFormModal({
  isOpen,
  onClose,
  bookingToEdit,
  availableRooms = [],
}: BookingFormModalProps) {
  const isEditMode = !!bookingToEdit;

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      responsible_name: "",
      attendees: 1,
      room_id: 0,
      booking_date: new Date().toISOString().split("T")[0],
      start_time: "09:00",
      end_time: "10:00",
      has_coffee: false,
      coffee_description: "",
    },
  });

  const {
    mutate: createBooking,
    isPending: isCreating,
    error: createError,
    reset: resetCreate,
  } = useCreateBooking();
  const {
    mutate: updateBooking,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateBooking();

  const isSubmitting = isCreating || isUpdating;
  const apiError = createError || updateError;

  const selectedRoomId = Number(watch("room_id"));
  const selectedRoom = useMemo(
    () => availableRooms.find((room) => room.id === selectedRoomId),
    [selectedRoomId, availableRooms],
  );

  useEffect(() => {
    if (isOpen) {
      resetCreate();
      resetUpdate();

      if (isEditMode && bookingToEdit) {
        reset({
          responsible_name: bookingToEdit.responsible_name,
          attendees: bookingToEdit.attendees,
          room_id: bookingToEdit.room.id,
          booking_date: formatISOToDateInput(bookingToEdit.start_time),
          start_time: formatISOToTimeInput(bookingToEdit.start_time),
          end_time: formatISOToTimeInput(bookingToEdit.end_time),
          has_coffee: bookingToEdit.has_coffee,
          coffee_description: bookingToEdit.coffee_description || "",
        });
      } else {
        reset();
      }
    }
  }, [isOpen, isEditMode, bookingToEdit, reset, resetCreate, resetUpdate]);

  const onSubmit = (data: BookingFormValues) => {
    const bookingPayload = {
      responsible_name: data.responsible_name,
      attendees: Number(data.attendees),
      room_id: Number(data.room_id),
      has_coffee: data.has_coffee,
      coffee_description: data.has_coffee ? data.coffee_description : null,
      start_time: combineDateAndTime(data.booking_date, data.start_time),
      end_time: combineDateAndTime(data.booking_date, data.end_time),
    };

    if (isEditMode && bookingToEdit) {
      updateBooking(
        { id: bookingToEdit.id, data: bookingPayload },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      createBooking(bookingPayload, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Editar Reserva" : "Criar Nova Reserva"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {apiError && (
          <ErrorMessage
            message={
              (apiError as AxiosError<FastAPIErrorDetail>)?.response?.data
                ?.detail || "Ocorreu um erro."
            }
          />
        )}

        <Controller
          name="responsible_name"
          control={control}
          render={({ field }) => (
            <FormInput
              field={field}
              label="Nome do Responsável"
              errorMessage={errors.responsible_name?.message}
            />
          )}
        />

        <div>
          <label
            htmlFor="room_id"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Sala
          </label>
          <div className="mt-2">
            <select
              id="room_id"
              {...register("room_id", { valueAsNumber: true })}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.room_id ? "ring-red-500" : "ring-gray-300"
              } focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6`}
            >
              <option value={0} disabled>
                Selecione uma sala...
              </option>
              {availableRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} (Cap: {room.capacity})
                </option>
              ))}
            </select>
          </div>
          {errors.room_id && (
            <p className="mt-2 text-sm text-red-600">
              {errors.room_id.message}
            </p>
          )}
        </div>

        <Controller
          name="attendees"
          control={control}
          render={({ field }) => (
            <FormInput
              field={field}
              label="Nº de Participantes"
              type="number"
              errorMessage={errors.attendees?.message}
            />
          )}
        />
        {selectedRoom && (
          <p className="-mt-2 ml-1 text-sm text-gray-500">
            Capacidade da sala selecionada: {selectedRoom.capacity}
          </p>
        )}

        <Controller
          name="booking_date"
          control={control}
          render={({ field }) => (
            <FormInput
              field={field}
              label="Data da Reserva"
              type="date"
              errorMessage={errors.booking_date?.message}
            />
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Hora de Início"
                type="time"
                errorMessage={errors.start_time?.message}
              />
            )}
          />
          <Controller
            name="end_time"
            control={control}
            render={({ field }) => (
              <FormInput
                field={field}
                label="Hora de Término"
                type="time"
                errorMessage={errors.end_time?.message}
              />
            )}
          />
        </div>

        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="has_coffee"
              {...register("has_coffee")}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="has_coffee" className="font-medium text-gray-900">
              Precisa de café?
            </label>
            <p className="text-gray-500">Marque se for necessário.</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            className="text-sm leading-6 font-semibold text-gray-900"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Reserva"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
