export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  vendor: string;
  imageUrl?: string;
  maxAttendees?: number;
  currentAttendees?: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  attendeeName: string;
  companyName: string;
  email: string;
  phone: string;
  jobTitle: string;
  numberOfAttendees: number;
  specialRequirements?: string;
  createdAt: string;
}
