import RegisterRequest from "../dto/registerRequest";
import RegisterResponse from "../dto/registerResponse";
import LoginRequest from "../dto/loginRequest";
import LoginResponse from "../dto/loginResponse";

export default interface AuthRepository {
  register(data: RegisterRequest): Promise<RegisterResponse>;
  login(data: LoginRequest): Promise<LoginResponse>;
}
