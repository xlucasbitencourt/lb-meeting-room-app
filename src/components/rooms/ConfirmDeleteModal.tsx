import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDeleteRoom } from "../../hooks/rooms/useRoomMutations";
import type { Room } from "../../types/room";
import Modal from "../ui/Modal";
import ErrorMessage from "../ui/ErrorMessage";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  room,
}: ConfirmDeleteModalProps) {
  const {
    mutate: deleteRoom,
    isPending: isDeleting,
    isError,
    error,
  } = useDeleteRoom();

  const handleDelete = () => {
    if (!room) return;

    deleteRoom(room.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Sala">
      <div>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-base leading-6 font-semibold text-gray-900">
              Excluir sala "{room.name}"
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Você tem certeza que deseja excluir esta sala? Esta ação não
                pode ser desfeita. Todas as reservas associadas (futuras ou
                passadas) também podem ser afetadas.
              </p>
            </div>
          </div>
        </div>

        {isError && (
          <div className="mt-4">
            <ErrorMessage
              message={error?.message || "Falha ao excluir a sala."}
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
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
