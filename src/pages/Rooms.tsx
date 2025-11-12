import { useState } from "react";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import RoomList from "../components/rooms/RoomList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { type Room } from "../types/room";
import ConfirmDeleteModal from "../components/rooms/ConfirmDeleteModal";
import RoomFormModal from "../components/rooms/RoomFormModal";
import Pagination from "../components/ui/Pagination";

type ModalState =
  | { type: "create" }
  | { type: "edit"; room: Room }
  | { type: "delete"; room: Room }
  | null;

export default function RoomsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalState, setModalState] = useState<ModalState>(null);

  const { data, isLoading, isError, error } = useGetRooms(page, limit);

  const totalPages = data ? Math.ceil(data.total_count / limit) : 0;

  const handleOpenCreateModal = () => {
    setModalState({ type: "create" });
  };

  const handleOpenEditModal = (room: Room) => {
    setModalState({ type: "edit", room });
  };

  const handleOpenDeleteModal = (room: Room) => {
    setModalState({ type: "delete", room });
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
            message={error?.message || "Falha ao buscar as salas."}
          />
        </div>
      );
    }

    if (!data || data.items.length === 0) {
      return (
        <div className="px-4 py-5 sm:p-6">
          <p className="text-center text-gray-500">Nenhuma sala encontrada.</p>
        </div>
      );
    }

    return (
      <RoomList
        rooms={data.items}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />
    );
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Gerenciamento de Salas
        </h1>
        <button
          onClick={handleOpenCreateModal}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Criar Nova Sala
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

      <ConfirmDeleteModal
        isOpen={modalState?.type === "delete"}
        onClose={handleCloseModal}
        room={modalState?.type === "delete" ? modalState.room : null}
      />

      <RoomFormModal
        isOpen={modalState?.type === "create" || modalState?.type === "edit"}
        onClose={handleCloseModal}
        roomToEdit={modalState?.type === "edit" ? modalState.room : null}
      />
    </div>
  );
}
