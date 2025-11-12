import { useState } from "react";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import RoomList from "@components/rooms/RoomList";
import type { Room } from "../types/room";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import ErrorMessage from "@components/ui/ErrorMessage";
import ConfirmDeleteModal from "@components/rooms/ConfirmDeleteModal";

type ModalState =
  | { type: "create" }
  | { type: "edit"; room: Room }
  | { type: "delete"; room: Room }
  | null;

export default function Rooms() {
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<ModalState>(null);

  const { data: rooms, isLoading, isError, error } = useGetRooms(page);

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
      return <LoadingSpinner />;
    }

    if (isError) {
      return (
        <ErrorMessage message={error?.message || "Falha ao buscar as salas."} />
      );
    }

    if (!rooms || rooms.length === 0) {
      return <p>Nenhuma sala encontrada.</p>;
    }

    return (
      <RoomList
        rooms={rooms}
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

      <div className="bg-white shadow-sm sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">{renderContent()}</div>
      </div>

      <ConfirmDeleteModal
        isOpen={modalState?.type === "delete"}
        onClose={handleCloseModal}
        room={modalState?.type === "delete" ? modalState.room : null}
      />
    </div>
  );
}
