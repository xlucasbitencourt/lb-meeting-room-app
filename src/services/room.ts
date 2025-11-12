import { api } from "./api";
import type { Room, RoomCreate, RoomUpdate } from "../types/room";

export interface GetRoomsResponse {
  items: Room[];
  total_count: number;
}

/**
 * Busca a lista de salas (paginada)
 */
export const getRooms = async (
  page = 1,
  limit = 10,
): Promise<GetRoomsResponse> => {
  const response = await api.get<GetRoomsResponse>("/rooms/", {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Busca uma sala específica pelo ID
 */
export const getRoomById = async (id: number): Promise<Room> => {
  const response = await api.get<Room>(`/rooms/${id}`);
  return response.data;
};

/**
 * Cria uma nova sala
 */
export const createRoom = async (roomData: RoomCreate): Promise<Room> => {
  const response = await api.post<Room>("/rooms/", roomData);
  return response.data;
};

/**
 * Atualiza uma sala (parcialmente)
 */
export const updateRoom = async (
  id: number,
  roomData: RoomUpdate,
): Promise<Room> => {
  const response = await api.patch<Room>(`/rooms/${id}`, roomData);
  return response.data;
};

/**
 * Deleta uma sala
 */
export const deleteRoom = async (id: number): Promise<Room> => {
  const response = await api.delete<Room>(`/rooms/${id}`);
  return response.data;
};
