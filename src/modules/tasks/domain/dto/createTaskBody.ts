export default interface CreateTaskBody {
  title: string;
  description: string;
  dueDate: string;        // formato: YYYY-MM-DD
  completed: boolean;
}
