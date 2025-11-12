import type { Booking } from "../../types/booking";
import {
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { formatDateTime } from "../../utils/formatters";

interface BookingListProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}

export default function BookingList({
  bookings,
  onEdit,
  onDelete,
}: BookingListProps) {
  return (
    <div className="flow-root">
      <div className="mx-4 -my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Responsável
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Sala
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Participantes
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Início
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Fim
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Café
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                    {booking.responsible_name}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {booking.room.name}{" "}
                    <span className="text-xs text-gray-400">
                      (ID: {booking.room.id})
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    <div className="flex items-center">
                      <UsersIcon className="mr-1 h-4 w-4 text-gray-400" />
                      {booking.attendees}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {formatDateTime(booking.start_time)}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {formatDateTime(booking.end_time)}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {booking.has_coffee ? "Sim" : "Não"}
                  </td>
                  <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                    <button
                      onClick={() => onEdit(booking)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Editar"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      <span className="sr-only">Editar {booking.id}</span>
                    </button>
                    <button
                      onClick={() => onDelete(booking)}
                      className="ml-4 text-red-600 hover:text-red-900"
                      title="Excluir"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="sr-only">Excluir {booking.id}</span>
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
