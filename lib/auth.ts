import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

// Defina uma interface para os dados do usuário no Firestore
interface UserData {
  email: string;
  displayName: string;
  role: "admin" | "user" | "editor"; // Defina as roles que você usa
  createdAt: string; // Adicione a data de criação
  password: string; // Adicione a senha
  // Adicione outros campos aqui, se necessário
}

export async function login(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verifique se o usuário está aprovado
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists() || !userDoc.data()) {
      throw new Error("Your account is not approved. Please contact support.");
    }

    return user;
  } catch (error: any) {
    console.error("Error logging in:", error);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-email":
          throw new Error("Email inválido.");
        case "auth/wrong-password":
          throw new Error("Senha incorreta.");
        case "auth/user-not-found":
          throw new Error("Usuário não encontrado.");
        default:
          throw new Error("Erro ao fazer login: " + error.message);
      }
    } else {
      throw new Error("Erro desconhecido ao fazer login.");
    }
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

let cachedToken: string | null = null;

// Função utilitária para criar/atualizar documentos de usuário no Firestore
export async function createUserDocument(userId: string, userData: UserData): Promise<void> {
  try {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    console.log(`Documento do usuário ${userId} criado/atualizado com sucesso!`);
  } catch (error) {
    console.error(`Erro ao criar/atualizar documento do usuário ${userId}:`, error);
    throw error;
  }
}