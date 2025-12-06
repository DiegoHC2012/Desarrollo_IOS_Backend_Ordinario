import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import StudentRepository from "../domain/repository/studentRepository";
import CreateStudentBody from "../domain/dto/createStudentBody";
import UpdateStudentBody from "../domain/dto/updateStudentBody";

@injectable()
export class StudentRepositoryFirebase implements StudentRepository {

  async getStudent(institutionId: string, studentId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/students/${studentId}`);
    const snapshot = await ref.get();

    return snapshot.exists() ? snapshot.val() : null;
  }

  async getAllStudents(institutionId: string): Promise<any[]> {
    const ref = db.ref(`institutions/${institutionId}/students`);
    const snapshot = await ref.get();

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as any)
    }));
  }

  async createStudent(institutionId: string, studentId: string, data: CreateStudentBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/students/${studentId}`);
    await ref.set(data);
  }

  async updateStudent(institutionId: string, studentId: string, data: UpdateStudentBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/students/${studentId}`);
    await ref.update(data);
  }

  async deleteStudent(institutionId: string, studentId: string): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/students/${studentId}`);
    await ref.remove();
  }
}
