import { db } from "./firebase"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore"

export type ModalType = "nps" | "sentiment"
export type TriggerType = "time" | "scroll" | "exit" | "click" | "manual"

export interface ModalData {
  id?: string
  userId: string
  type: ModalType
  title: string
  subtitle: string
  thankYouTitle: string
  thankYouMessage: string
  isActive: boolean
  triggerType: TriggerType
  triggerValue?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export async function createModal(data: Omit<ModalData, "createdAt" | "updatedAt">) {
  try {
    const now = Timestamp.now()
    const modalData: ModalData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await addDoc(collection(db, "modals"), modalData)
    return { ...modalData, id: docRef.id }
  } catch (error) {
    console.error("Error creating modal:", error)
    throw error
  }
}

export async function getModalById(id: string) {
  try {
    const docRef = doc(db, "modals", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ModalData
    } else {
      throw new Error("Modal not found")
    }
  } catch (error) {
    console.error("Error getting modal:", error)
    throw error
  }
}

export async function updateModal(id: string, data: Partial<ModalData>) {
  try {
    const docRef = doc(db, "modals", id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })

    return getModalById(id)
  } catch (error) {
    console.error("Error updating modal:", error)
    throw error
  }
}

export async function deleteModal(id: string) {
  try {
    const docRef = doc(db, "modals", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting modal:", error)
    throw error
  }
}

export async function getModalsByUserId(userId: string) {
  try {
    const q = query(collection(db, "modals"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ModalData[]
  } catch (error) {
    console.error("Error getting modals by user ID:", error)
    throw error
  }
}

