export interface Room {
  id: number;
  name: string;
  local: string;
  capacity: number;
  start_time: string;
  end_time: string;
}

export type RoomCreate = Omit<Room, "id">;

export interface RoomUpdate {
  name?: string;
  local?: string;
  capacity?: number;
  start_time?: string;
  end_time?: string;
}
