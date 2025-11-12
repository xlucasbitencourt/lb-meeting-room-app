export interface RoomInBooking {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  responsible_name: string;
  start_time: string;
  end_time: string;
  has_coffee: boolean;
  coffee_description: string | null;
  room: RoomInBooking;
}

export interface BookingCreate {
  responsible_name: string;
  start_time: string;
  end_time: string;
  has_coffee: boolean;
  coffee_description?: string | null;
  room_id: number;
}

export interface BookingUpdate {
  responsible_name?: string;
  start_time?: string;
  end_time?: string;
  has_coffee?: boolean;
  coffee_description?: string | null;
  room_id?: number;
}
