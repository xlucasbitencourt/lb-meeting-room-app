import { useQuery } from "@tanstack/react-query";
import { getRooms, type GetRoomsResponse } from "../../services/room";
import { AxiosError } from "axios";

export const ROOMS_QUERY_KEY = ["rooms"];

export const useGetRooms = (page = 1, limit = 10) => {
  return useQuery<GetRoomsResponse, AxiosError>({
    queryKey: [...ROOMS_QUERY_KEY, { page, limit }],

    queryFn: () => getRooms(page, limit),
  });
};
