import { useEffect, useMemo } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Booking } from '../../types/booking';
import type { Room } from '../../types/room';
import { type BookingFormData, bookingFormSchema } from './bookingFormSchema';
import {
  useCreateBooking,
  useUpdateBooking,
} from '../../hooks/bookings/useBookingMutations';
import {
  formatISOToDateInput,
  formatISOToTimeInput,
  combineDateAndTime,
} from '../../utils/formatters';
import { AxiosError } from 'axios';
import Modal from '../ui/Modal';
import ErrorMessage from '../ui/ErrorMessage';

type FastAPIErrorDetail = {
  detail: string;
};

interface FormInputProps {
  id: keyof BookingFormData;
  label: string;
  register: ReturnType<typeof useForm<BookingFormData>>['register'];
  error: ReturnType<typeof useForm<BookingFormData>>['formState']['errors'][keyof BookingFormData];
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  register,
  error,
  type = 'text',
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        type={type}
        {...register(id, type === 'number' ? { valueAsNumber: true } : undefined)}
        className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
          error ? 'ring-red-500' : 'ring-gray-300'
        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingToEdit: Booking | null;
  availableRooms: Room[];
}

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
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema) as Resolver<BookingFormData>,
    defaultValues: {
      responsible_name: '',
      attendees: 1,
      room_id: 0,
      booking_date: new Date().toISOString().split('T')[0],
      start_time: '09:00',
      end_time: '10:00',
      has_coffee: false,
      coffee_description: '',
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

  const selectedRoomId = watch('room_id');
  const hasCoffee = watch('has_coffee');
  const selectedRoom = useMemo(
    () => availableRooms.find(room => room.id === selectedRoomId),
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
          coffee_description: bookingToEdit.coffee_description || '',
        });
      } else {
        reset();
      }
    }
  }, [isOpen, isEditMode, bookingToEdit, reset, resetCreate, resetUpdate]);

  const onSubmit = (data: BookingFormData) => {
    const bookingPayload = {
      responsible_name: data.responsible_name,
      attendees: data.attendees,
      room_id: data.room_id,
      has_coffee: data.has_coffee,
      coffee_description: data.has_coffee ? data.coffee_description : null,
      start_time: combineDateAndTime(data.booking_date, data.start_time),
      end_time: combineDateAndTime(data.booking_date, data.end_time),
    };

    if (isEditMode && bookingToEdit) {
      updateBooking({ id: bookingToEdit.id, data: bookingPayload }, {
        onSuccess: () => onClose(),
      });
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
      title={isEditMode ? 'Editar Reserva' : 'Criar Nova Reserva'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {apiError && (
          <ErrorMessage
            message={
              (apiError as AxiosError<FastAPIErrorDetail>)?.response?.data
                ?.detail || 'Ocorreu um erro.'
            }
          />
        )}

        <FormInput
          id="responsible_name"
          label="Nome do Responsável"
          register={register}
          error={errors.responsible_name}
        />

        <div>
          <label
            htmlFor="room_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sala
          </label>
          <div className="mt-2">
            <select
              id="room_id"
              {...register('room_id', { valueAsNumber: true })}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.room_id ? 'ring-red-500' : 'ring-gray-300'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            >
              <option value={0} disabled>
                Selecione uma sala...
              </option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name} (Cap: {room.capacity})
                </option>
              ))}
            </select>
          </div>
          {errors.room_id && (
            <p className="mt-2 text-sm text-red-600">{errors.room_id.message}</p>
          )}
        </div>

        <FormInput
          id="attendees"
          label="Nº de Participantes"
          type="number"
          register={register}
          error={errors.attendees}
        />
        {selectedRoom && (
          <p className="-mt-2 ml-1 text-sm text-gray-500">
            Capacidade da sala selecionada: {selectedRoom.capacity}
          </p>
        )}

        <FormInput
          id="booking_date"
          label="Data da Reserva"
          type="date"
          register={register}
          error={errors.booking_date}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="start_time"
            label="Hora de Início"
            type="time"
            register={register}
            error={errors.start_time}
          />
          <FormInput
            id="end_time"
            label="Hora de Término"
            type="time"
            register={register}
            error={errors.end_time}
          />
        </div>

        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="has_coffee"
              {...register('has_coffee')}
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

        {hasCoffee && (
          <div className="pl-9">
            <label
              htmlFor="coffee_description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Descrição do Café (Opcional)
            </label>
            <div className="mt-2">
              <textarea
                id="coffee_description"
                {...register('coffee_description')}
                rows={2}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.coffee_description ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder="Ex: 2 garrafas de café, 1 de leite, adoçante"
              />
            </div>
            {errors.coffee_description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.coffee_description.message}
              </p>
            )}
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
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
            {isSubmitting ? 'Salvando...' : 'Salvar Reserva'}
          </button>
        </div>
      </form>
    </Modal>
  );
}