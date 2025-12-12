import { RegisterUseCase } from "../../src/modules/auth/useCase/registerUseCase";
import { mockAuthRepository } from "./mockAuthRepository";

describe("RegisterUseCase", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe registrar un usuario correctamente", async () => {
    const requestData = {
      email: "test@example.com",
      password: "password123",
      institutionId: "inst1",
      studentData: {
        name: "Juan Pérez",
        email: "test@example.com",
        career: "Ingeniería en Sistemas",
        group: "5B",
      },
    };

    const mockResponse = {
      status: 201,
      data: {
        token: "mock_token",
        user: {
          uid: "mock_uid",
          email: "test@example.com",
        },
        student: {
          id: "mock_uid",
          institutionId: "inst1",
          name: "Juan Pérez",
          email: "test@example.com",
          career: "Ingeniería en Sistemas",
          group: "5B",
        },
      },
    };

    mockAuthRepository.register.mockResolvedValue(mockResponse);

    const useCase = new RegisterUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    expect(result.data?.user.email).toBe("test@example.com");
    expect(mockAuthRepository.register).toHaveBeenCalledWith(requestData);
  });

  it("debe retornar error si el email no está presente", async () => {
    const requestData = {
      email: "",
      password: "password123",
      institutionId: "inst1",
      studentData: {
        name: "Juan Pérez",
        email: "test@example.com",
        career: "Ingeniería en Sistemas",
        group: "5B",
      },
    };

    const useCase = new RegisterUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(400);
    expect(result.error).toBe("Email y contraseña son requeridos");
  });

  it("debe retornar error si la contraseña es muy corta", async () => {
    const requestData = {
      email: "test@example.com",
      password: "12345",
      institutionId: "inst1",
      studentData: {
        name: "Juan Pérez",
        email: "test@example.com",
        career: "Ingeniería en Sistemas",
        group: "5B",
      },
    };

    const useCase = new RegisterUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(400);
    expect(result.error).toBe("La contraseña debe tener al menos 6 caracteres");
  });

  it("debe retornar error si falta institutionId", async () => {
    const requestData = {
      email: "test@example.com",
      password: "password123",
      institutionId: "",
      studentData: {
        name: "Juan Pérez",
        email: "test@example.com",
        career: "Ingeniería en Sistemas",
        group: "5B",
      },
    };

    const useCase = new RegisterUseCase(mockAuthRepository as any);
    const result = await useCase.execute(requestData);

    expect(result.status).toBe(400);
    expect(result.error).toBe("El ID de institución es requerido");
  });

});
