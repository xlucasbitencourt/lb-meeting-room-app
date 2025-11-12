import { api } from "./api";
import type { Booking, BookingCreate, BookingUpdate } from "../types/booking";

export interface GetBookingsResponse {
  items: Booking[];
  total_count: number;
}

/**
 * Busca a lista de reservas (paginada)
 */
export const getBookings = async (
  page = 1,
  limit = 10,
): Promise<GetBookingsResponse> => {
  const response = await api.get<GetBookingsResponse>("/bookings/", {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Busca uma reserva específica pelo ID
 */
export const getBookingById = async (id: number): Promise<Booking> => {
  const response = await api.get<Booking>(`/bookings/${id}`);
  return response.data;
};

/**
 * Cria uma nova reserva
 */
export const createBooking = async (
  bookingData: BookingCreate,
): Promise<Booking> => {
  const response = await api.post<Booking>("/bookings/", bookingData);
  return response.data;
};

/**
 * Atualiza uma reserva
 */
export const updateBooking = async (
  id: number,
  bookingData: BookingUpdate,
): Promise<Booking> => {
  const response = await api.patch<Booking>(`/bookings/${id}`, bookingData);
  return response.data;
};

/**
 * Deleta uma reserva
 */
export const deleteBooking = async (id: number): Promise<Booking> => {
  const response = await api.delete<Booking>(`/bookings/${id}`);
  return response.data;
};
