export interface SubjectDTO {
  id: string;
  name: string;
  teacher: string;
  schedule: string;
  description: string;
}

export default interface GetSubjectsResponse {
  status: number;
  data?: SubjectDTO[];
  error?: string;
}
