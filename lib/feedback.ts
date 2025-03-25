import { db } from "./firebase"
import { collection, addDoc, getDocs, query, where, orderBy, limit, Timestamp } from "firebase/firestore"

export type FeedbackType = "nps" | "sentiment"

export interface FeedbackData {
  modalId: string
  userId?: string
  type: FeedbackType
  score: number | string
  comment?: string
  createdAt: Timestamp
  metadata?: {
    url?: string
    device?: string
    browser?: string
  }
}

export async function submitFeedback(data: Omit<FeedbackData, "createdAt">) {
  try {
    const feedbackData: FeedbackData = {
      ...data,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "feedback"), feedbackData)
    return docRef.id
  } catch (error) {
    console.error("Error submitting feedback:", error)
    throw error
  }
}

export async function getRecentFeedback(limitCount = 10): Promise<FeedbackData[]> {
  try {
    const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as FeedbackData;
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
      };
    }) as FeedbackData[]
  } catch (error) {
    console.error("Error getting recent feedback:", error)
    throw error
  }
}

export async function getFeedbackByModalId(modalId: string): Promise<FeedbackData[]> {
  try {
    const q = query(collection(db, "feedback"), where("modalId", "==", modalId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as FeedbackData;
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
      };
    }) as FeedbackData[]
  } catch (error) {
    console.error("Error getting feedback by modal ID:", error)
    throw error
  }
}

