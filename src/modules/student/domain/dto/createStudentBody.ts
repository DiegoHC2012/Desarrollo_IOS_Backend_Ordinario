export default interface CreateStudentBody {
  name: string;
  email: string;
  career: string;
  group: string;
  photo?: string; // opcional
}
