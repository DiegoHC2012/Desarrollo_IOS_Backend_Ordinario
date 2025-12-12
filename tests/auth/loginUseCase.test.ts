import { LoginUseCase } from "../../src/modules/auth/useCase/loginUseCase";
import { mockAuthRepository } from "./mockAuthRepository";

describe("LoginUseCase", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe realizar login correctamente", async () => {
    const requestData = {
      email: "test@example.com",
      password: "password123",
    };

    const mockResponse = {
      status: 200,
      data: {
        token: "mock_token",
        user: {
          uid: "mock_uid",
          email: "test@example.com",
        },
        student: {
          id: "student1",
          institutionId: "inst1",
          name: "Juan Pérez",
          email: "test@example.com",
          career: "Ingeniería en Sistemas",
          group: "5B",
        },
      },
    };

    mockAuthRepository.login.mockResolvedValue(mockResponse);

    const useCase = new LoginUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
    expect(result.data?.user.email).toBe("test@example.com");
    expect(mockAuthRepository.login).toHaveBeenCalledWith(requestData);
  });

  it("debe retornar error si el email no está presente", async () => {
    const requestData = {
      email: "",
      password: "password123",
    };

    const useCase = new LoginUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(400);
    expect(result.error).toBe("Email y contraseña son requeridos");
  });

  it("debe retornar error si la contraseña no está presente", async () => {
    const requestData = {
      email: "test@example.com",
      password: "",
    };

    const useCase = new LoginUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(400);
    expect(result.error).toBe("Email y contraseña son requeridos");
  });

});
