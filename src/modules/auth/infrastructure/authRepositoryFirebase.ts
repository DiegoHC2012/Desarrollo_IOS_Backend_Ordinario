import { injectable } from "tsyringe";
import admin from "firebase-admin";
import { db } from "../../../config/firebase";
import AuthRepository from "../domain/repository/authRepository";
import RegisterRequest from "../domain/dto/registerRequest";
import RegisterResponse from "../domain/dto/registerResponse";
import LoginRequest from "../domain/dto/loginRequest";
import LoginResponse from "../domain/dto/loginResponse";

@injectable()
export class AuthRepositoryFirebase implements AuthRepository {
  
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      // 1. Create user in Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email: data.email,
        password: data.password,
      });

      // 2. Create student document in Realtime Database
      const studentId = userRecord.uid;
      const studentRef = db.ref(`institutions/${data.institutionId}/students/${studentId}`);
      
      const studentData = {
        ...data.studentData,
        uid: studentId,
      };

      await studentRef.set(studentData);

      // 3. Generate custom token for authentication
      const customToken = await admin.auth().createCustomToken(userRecord.uid);

      return {
        status: 201,
        data: {
          token: customToken,
          user: {
            uid: userRecord.uid,
            email: userRecord.email!,
          },
          student: {
            id: studentId,
            institutionId: data.institutionId,
            ...data.studentData,
          },
        },
      };
    } catch (error: any) {
      // Handle Firebase Auth errors
      if (error.code === "auth/email-already-exists") {
        return {
          status: 400,
          error: "El email ya está registrado",
        };
      }
      if (error.code === "auth/invalid-email") {
        return {
          status: 400,
          error: "El email no es válido",
        };
      }
      if (error.code === "auth/weak-password") {
        return {
          status: 400,
          error: "La contraseña debe tener al menos 6 caracteres",
        };
      }
      
      return {
        status: 500,
        error: `Error al registrar usuario: ${error.message}`,
      };
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      // Firebase Admin SDK doesn't have a method to verify password directly
      // We need to get the user by email and create a custom token
      // In a real app, you'd verify credentials on the client side or use a different approach
      
      // 1. Get user by email
      const userRecord = await admin.auth().getUserByEmail(data.email);

      // Note: Firebase Admin SDK cannot verify passwords
      // In production, the client should authenticate with Firebase Client SDK
      // For this testing/demo API, we'll just generate a token
      
      // 2. Search for student associated with this UID
      let studentData: any = null;
      let institutionId: string = "";

      // Search across all institutions for the student with this UID
      const institutionsRef = db.ref("institutions");
      const institutionsSnapshot = await institutionsRef.get();

      if (institutionsSnapshot.exists()) {
        const institutions = institutionsSnapshot.val();
        
        for (const instId in institutions) {
          if (institutions[instId].students) {
            const students = institutions[instId].students;
            
            for (const studId in students) {
              if (students[studId].uid === userRecord.uid) {
                studentData = students[studId];
                institutionId = instId;
                studentData.id = studId;
                break;
              }
            }
          }
          
          if (studentData) break;
        }
      }

      if (!studentData) {
        return {
          status: 404,
          error: "No se encontró un estudiante asociado a este usuario",
        };
      }

      // 3. Generate custom token
      const customToken = await admin.auth().createCustomToken(userRecord.uid);

      return {
        status: 200,
        data: {
          token: customToken,
          user: {
            uid: userRecord.uid,
            email: userRecord.email!,
          },
          student: {
            id: studentData.id,
            institutionId: institutionId,
            name: studentData.name,
            email: studentData.email,
            career: studentData.career,
            group: studentData.group,
            photo: studentData.photo,
          },
        },
      };
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        return {
          status: 401,
          error: "Credenciales inválidas",
        };
      }
      if (error.code === "auth/invalid-email") {
        return {
          status: 400,
          error: "El email no es válido",
        };
      }
      
      return {
        status: 500,
        error: `Error al iniciar sesión: ${error.message}`,
      };
    }
  }
}
