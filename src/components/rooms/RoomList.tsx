import type { Room } from "../../types/room";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatTimeForInput } from "../../utils/formatters";

interface RoomListProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomList({ rooms, onEdit, onDelete }: RoomListProps) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Local
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Capacidade
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Horário
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                    {room.name}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {room.local}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {room.capacity} pessoas
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {formatTimeForInput(room.start_time)} -{" "}
                    {formatTimeForInput(room.end_time)}
                  </td>
                  <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                    <button
                      onClick={() => onEdit(room)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Editar"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      <span className="sr-only">Editar {room.name}</span>
                    </button>
                    <button
                      onClick={() => onDelete(room)}
                      className="ml-4 text-red-600 hover:text-red-900"
                      title="Excluir"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="sr-only">Excluir {room.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
