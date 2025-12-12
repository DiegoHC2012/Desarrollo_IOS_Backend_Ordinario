export default interface RegisterRequest {
  email: string;
  password: string;
  institutionId: string;
  studentData: {
    name: string;
    email: string;
    career: string;
    group: string;
    photo?: string;
  };
}
