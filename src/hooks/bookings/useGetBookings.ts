import { useQuery } from "@tanstack/react-query";
import { getBookings, type GetBookingsResponse } from "../../services/booking";
import { AxiosError } from "axios";

export const BOOKINGS_QUERY_KEY = ["bookings"];

export const useGetBookings = (page = 1, limit = 10) => {
  return useQuery<GetBookingsResponse, AxiosError>({
    queryKey: [...BOOKINGS_QUERY_KEY, { page, limit }],
    queryFn: () => getBookings(page, limit),
  });
};
