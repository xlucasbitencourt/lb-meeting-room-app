import { useDeleteBooking } from "../../hooks/bookings/useBookingMutations";
import type { Booking } from "../../types/booking";
import { formatDateTime } from "../../utils/formatters";
import { AxiosError } from "axios";
import Modal from "../ui/Modal";
import ErrorMessage from "../ui/ErrorMessage";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type FastAPIErrorDetail = {
  detail: string;
};

interface ConfirmDeleteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export default function ConfirmDeleteBookingModal({
  isOpen,
  onClose,
  booking,
}: ConfirmDeleteBookingModalProps) {
  const {
    mutate: deleteBooking,
    isPending: isDeleting,
    isError,
    error,
  } = useDeleteBooking();

  const handleDelete = () => {
    if (booking) {
      deleteBooking(booking.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const apiError = error as AxiosError<FastAPIErrorDetail>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Reserva">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Tem a certeza de que deseja excluir a reserva de{" "}
              <strong className="text-gray-900">
                {booking?.responsible_name}
              </strong>
              ?
            </p>
            {booking && (
              <p className="mt-2 text-sm text-gray-500">
                <strong>Sala:</strong> {booking.room.name}
                <br />
                <strong>Horário:</strong> {formatDateTime(booking.start_time)} -{" "}
                {formatDateTime(booking.end_time)}
              </p>
            )}
            <p className="mt-2 text-sm font-semibold text-red-700">
              Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>
      </div>

      {isError && (
        <div className="mt-4">
          <ErrorMessage
            message={
              apiError?.response?.data?.detail || "Falha ao excluir a reserva."
            }
          />
        </div>
      )}

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 sm:ml-3 sm:w-auto"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Excluir"}
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
