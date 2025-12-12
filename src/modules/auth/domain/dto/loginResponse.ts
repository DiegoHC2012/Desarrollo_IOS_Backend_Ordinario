export default interface LoginResponse {
  status: number;
  data?: {
    token: string;
    user: {
      uid: string;
      email: string;
    };
    student: {
      id: string;
      institutionId: string;
      name: string;
      email: string;
      career: string;
      group: string;
      photo?: string;
    };
  };
  error?: string;
}
