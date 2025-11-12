import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Room } from "../../types/room";
import { roomFormSchema } from "./roomFormSchema";
import { z } from "zod";
import {
  useCreateRoom,
  useUpdateRoom,
} from "../../hooks/rooms/useRoomMutations";
import { formatTimeForInput } from "../../utils/formatters";
import { AxiosError } from "axios";
import Modal from "../ui/Modal";
import ErrorMessage from "../ui/ErrorMessage";

type FastAPIErrorDetail = {
  detail: string;
};

interface FormInputProps {
  id: keyof RoomFormValues;
  label: string;
  register: ReturnType<typeof useForm<RoomFormValues>>["register"];
  error: ReturnType<
    typeof useForm<RoomFormValues>
  >["formState"]["errors"][keyof RoomFormValues];
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  register,
  error,
  type = "text",
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm leading-6 font-medium text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        type={type}
        step={type === "time" ? 60 : undefined}
        {...register(id)}
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
          error ? "ring-red-500" : "ring-gray-300"
        } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6`}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomToEdit: Room | null;
}

type RoomFormValues = z.input<typeof roomFormSchema>;

export default function RoomFormModal({
  isOpen,
  onClose,
  roomToEdit,
}: RoomFormModalProps) {
  const isEditMode = !!roomToEdit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      local: "",
      capacity: 0,
      start_time: "08:00",
      end_time: "18:00",
    },
  });

  const {
    mutate: createRoom,
    isPending: isCreating,
    error: createError,
  } = useCreateRoom();

  const {
    mutate: updateRoom,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateRoom();

  const isSubmitting = isCreating || isUpdating;
  const apiError = createError || updateError;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && roomToEdit) {
        reset({
          ...roomToEdit,
          start_time: formatTimeForInput(roomToEdit.start_time),
          end_time: formatTimeForInput(roomToEdit.end_time),
        });
      } else {
        reset();
      }
    }
  }, [isOpen, isEditMode, roomToEdit, reset]);

  const onSubmit = (rawData: RoomFormValues) => {
    const data = roomFormSchema.parse(rawData);
    if (isEditMode && roomToEdit) {
      updateRoom(
        { id: roomToEdit.id, data },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      createRoom(data, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Editar Sala" : "Criar Nova Sala"}
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

        <FormInput
          id="name"
          label="Nome"
          register={register}
          error={errors.name}
        />
        <FormInput
          id="local"
          label="Local"
          register={register}
          error={errors.local}
        />
        <FormInput
          id="capacity"
          label="Capacidade"
          type="number"
          register={register}
          error={errors.capacity}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="start_time"
            label="Início do Funcionamento"
            type="time"
            register={register}
            error={errors.start_time}
          />
          <FormInput
            id="end_time"
            label="Fim do Funcionamento"
            type="time"
            register={register}
            error={errors.end_time}
          />
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
