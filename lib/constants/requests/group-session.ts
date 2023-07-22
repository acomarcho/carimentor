export interface CreateNewGroupSessionRequest {
  name: string;
  date: Date | null;
  meetingUrl: string;
  description: string;
  maxParticipant: number | "" | undefined;
}
