export interface Train {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  offDay: string;
  classes: TrainClass[];
}

export interface TrainClass {
  type: string;
  fare: number;
  available: number;
}

export interface Passenger {
  name: string;
  phone: string;
  gender: "male" | "female" | "other";
  age: string;
}

export interface BookingContextType {
  from: string;
  to: string;
  date: string;
  class: string;
  selectedSeats: string[];
  passengers: Passenger[];
  totalAmount: number;
}

export interface Ticket {
  id: string;
  trainName: string;
  from: string;
  to: string;
  date: string;
  seats: string[];
  totalAmount: number;
  status: "confirmed" | "cancelled" | "pending";
  passengerName: string;
  passengerPhone: string;
  passengers: Passenger[];
}

export interface RSNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning";
  read: boolean;
}
