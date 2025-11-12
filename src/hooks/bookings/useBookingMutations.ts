import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../services/booking";
import type {
  Booking,
  BookingCreate,
  BookingUpdate,
} from "../../types/booking";
import { AxiosError } from "axios";
import { BOOKINGS_QUERY_KEY } from "./useGetBookings";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, AxiosError, BookingCreate>({
    mutationFn: (newBookingData) => createBooking(newBookingData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, AxiosError, { id: number; data: BookingUpdate }>({
    mutationFn: ({ id, data }) => updateBooking(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, AxiosError, number>({
    mutationFn: (id) => deleteBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
};
