export interface GradeDTO {
  id: string;
  title: string;
  value: number;
}

export default interface GetGradesResponse {
  status: number;
  data?: GradeDTO[];
  error?: string;
  average?: number; // opcional si se solicita el promedio
}
