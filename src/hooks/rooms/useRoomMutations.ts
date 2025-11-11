import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom, updateRoom, deleteRoom } from "../../services/room";
import type { Room, RoomCreate, RoomUpdate } from "../../types/room";
import { AxiosError } from "axios";
import { ROOMS_QUERY_KEY } from "./useGetRooms";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<Room, AxiosError, RoomCreate>({
    mutationFn: (newRoomData) => createRoom(newRoomData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<Room, AxiosError, { id: number; data: RoomUpdate }>({
    mutationFn: ({ id, data }) => updateRoom(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<Room, AxiosError, number>({
    mutationFn: (id) => deleteRoom(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
};
