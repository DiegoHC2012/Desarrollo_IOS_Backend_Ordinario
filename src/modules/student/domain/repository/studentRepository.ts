import CreateStudentBody from "../dto/createStudentBody";
import UpdateStudentBody from "../dto/updateStudentBody";

export default interface StudentRepository {
  getStudent(institutionId: string, studentId: string): Promise<any>;
  getAllStudents(institutionId: string): Promise<any[]>;
  createStudent(institutionId: string, studentId: string, data: CreateStudentBody): Promise<void>;
  updateStudent(institutionId: string, studentId: string, data: UpdateStudentBody): Promise<void>;
  deleteStudent(institutionId: string, studentId: string): Promise<void>;
}
