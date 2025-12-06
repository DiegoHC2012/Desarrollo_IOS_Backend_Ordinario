import { injectable } from "tsyringe";
import { db } from "../../../config/firebase";
import SubjectsRepository from "../domain/repository/subjectsRepository";
import CreateSubjectBody from "../domain/dto/createSubjectBody";
import UpdateSubjectBody from "../domain/dto/updateSubjectBody";

@injectable()
export class SubjectsRepositoryFirebase implements SubjectsRepository {
  
  async getSubjects(institutionId: string, studentId: string): Promise<any[]> {
    const ref = db.ref(`institutions/${institutionId}/subjects/${studentId}`);
    const snapshot = await ref.get();

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as any),
    }));
  }

  async getSubject(institutionId: string, studentId: string, subjectId: string): Promise<any> {
    const ref = db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
    const snapshot = await ref.get();

    return snapshot.exists() ? { id: subjectId, ...snapshot.val() } : null;
  }

  async createSubject(institutionId: string, studentId: string, data: CreateSubjectBody): Promise<string> {
    const ref = db.ref(`institutions/${institutionId}/subjects/${studentId}`).push();
    await ref.set(data);
    return ref.key!;
  }

  async updateSubject(institutionId: string, studentId: string, subjectId: string, data: UpdateSubjectBody): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
    await ref.update(data);
  }

  async deleteSubject(institutionId: string, studentId: string, subjectId: string): Promise<void> {
    const ref = db.ref(`institutions/${institutionId}/subjects/${studentId}/${subjectId}`);
    await ref.remove();
  }
}
