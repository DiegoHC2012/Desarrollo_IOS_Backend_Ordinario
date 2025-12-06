import CreateSubjectBody from "../dto/createSubjectBody";
import UpdateSubjectBody from "../dto/updateSubjectBody";

export default interface SubjectsRepository {
  getSubjects(institutionId: string, studentId: string): Promise<any[]>;
  getSubject(institutionId: string, studentId: string, subjectId: string): Promise<any>;

  createSubject(institutionId: string, studentId: string, data: CreateSubjectBody): Promise<string>;
  updateSubject(institutionId: string, studentId: string, subjectId: string, data: UpdateSubjectBody): Promise<void>;
  deleteSubject(institutionId: string, studentId: string, subjectId: string): Promise<void>;
}
