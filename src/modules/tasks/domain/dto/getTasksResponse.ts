export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default interface GetTasksResponse {
  status: number;
  data?: TaskDTO[];
  error?: string;
}
