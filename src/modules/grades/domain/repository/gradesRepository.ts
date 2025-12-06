import CreateGradeBody from "../dto/createGradeBody";
import UpdateGradeBody from "../dto/updateGradeBody";

export default interface GradesRepository {
  getGrades(institutionId: string, studentId: string, subjectId: string): Promise<any[]>;
  getGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string): Promise<any>;

  createGrade(institutionId: string, studentId: string, subjectId: string, data: CreateGradeBody): Promise<string>;
  updateGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string, data: UpdateGradeBody): Promise<void>;
  deleteGrade(institutionId: string, studentId: string, subjectId: string, gradeId: string): Promise<void>;
}
