import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import GradesRepository from "../domain/repository/gradesRepository";
import CreateGradeBody from "../domain/dto/createGradeBody";
import UpdateGradeBody from "../domain/dto/updateGradeBody";

@injectable()
export class GradesRepositoryFirebase implements GradesRepository {

  async getGrades(institutionId: string, studentId: string, subjectId: string): Promise<any[]> {
    const ref = db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}`);
    const snapshot = await ref.get();

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as any)
    }));
  }

  async getGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
    const snapshot = await ref.get();

    return snapshot.exists() ? { id: gradeId, ...snapshot.val() } : null;
  }

  async createGrade(institutionId: string, studentId: string, subjectId: string, data: CreateGradeBody): Promise<string> {
    const ref = db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}`).push();
    await ref.set(data);
    return ref.key!;
  }

  async updateGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string, data: UpdateGradeBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
    await ref.update(data);
  }

  async deleteGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/grades/${studentId}/${subjectId}/${gradeId}`);
    await ref.remove();
  }
}
