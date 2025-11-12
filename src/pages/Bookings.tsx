import { useState } from "react";
import { useGetBookings } from "../hooks/bookings/useGetBookings";
import BookingList from "../components/bookings/BookingList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import Pagination from "../components/ui/Pagination";
import ConfirmDeleteBookingModal from "../components/bookings/ConfirmDeleteBookingModal";
import type { Booking } from "../types/booking";

type ModalState =
  | { type: "create" }
  | { type: "edit"; booking: Booking }
  | { type: "delete"; booking: Booking }
  | null;

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalState, setModalState] = useState<ModalState>(null);

  const { data, isLoading, isError, error } = useGetBookings(page, limit);

  const totalPages = data ? Math.ceil(data.total_count / limit) : 0;

  const handleOpenDeleteModal = (booking: Booking) => {
    setModalState({ type: "delete", booking });
  };

  const handleCloseModal = () => {
    setModalState(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="px-4 py-5 sm:p-6">
          <LoadingSpinner />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="px-4 py-5 sm:p-6">
          <ErrorMessage
            message={error?.message || "Falha ao buscar as reservas."}
          />
        </div>
      );
    }

    if (!data || data.items.length === 0) {
      return (
        <div className="px-4 py-5 sm:p-6">
          <p className="text-center text-gray-500">
            Nenhuma reserva encontrada.
          </p>
        </div>
      );
    }

    return (
      <BookingList
        bookings={data.items}
        onEdit={() => {}}
        onDelete={handleOpenDeleteModal}
      />
    );
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Gerenciamento de Reservas
        </h1>
        <button
          onClick={() => {}}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Criar Nova Reserva
        </button>
      </div>

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        {renderContent()}

        {totalPages > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
      <ConfirmDeleteBookingModal
        isOpen={modalState?.type === "delete"}
        onClose={handleCloseModal}
        booking={modalState?.type === "delete" ? modalState.booking : null}
      />
    </div>
  );
}
