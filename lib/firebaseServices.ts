// Firebase services for contact submissions and other general services

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const CONTACT_COLLECTION = "contact_submissions";
const MEMBERSHIP_COLLECTION = "membership_applications";
const MEMBERS_COLLECTION = "club_members";
const ADMIN_FLAGS_COLLECTION = "admin_flags";

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: "new" | "read" | "responded";
}

export interface MembershipApplication {
  id?: string;
  name: string;
  email: string;
  rollNumber: string;
  registerNumber: string;
  year: string;
  section: string;
  department: string;
  participation?: string;
  membershipId: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}

// Live response control flag used by admin dashboard
export interface AdminFlags {
  liveResponsesEnabled: boolean;
}

// Add contact submission to Firestore
export const addContactSubmission = async (
  contactData: Omit<ContactSubmission, "id" | "createdAt" | "status">
): Promise<string> => {
  try {
    console.log(
      "🔥 Adding contact submission to Firestore...",
      contactData.subject
    );

    const contactRef = collection(db, CONTACT_COLLECTION);
    const now = new Date();

    const dataToSave = {
      ...contactData,
      createdAt: now,
      status: "new" as const,
    };

    const docRef = await addDoc(contactRef, dataToSave);

    console.log("✅ Contact submission added to Firestore with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding contact submission to Firestore:", error);
    throw error;
  }
};

// Get all contact submissions
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    console.log("🔥 Fetching contact submissions from Firestore...");

    const contactRef = collection(db, CONTACT_COLLECTION);
    const q = query(contactRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const submissions: ContactSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      submissions.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        subject: data.subject || "",
        message: data.message || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
        status: data.status || "new",
      });
    });

    console.log(
      `✅ Fetched ${submissions.length} contact submissions from Firestore`
    );
    return submissions;
  } catch (error) {
    console.error("❌ Error fetching contact submissions:", error);
    throw error;
  }
};

// Add membership application to Firestore
export const addMembershipApplication = async (
  applicationData: Omit<MembershipApplication, "id" | "createdAt" | "status">
): Promise<string> => {
  try {
    console.log(
      "🔥 Adding membership application to Firestore...",
      applicationData.name
    );

    const membershipRef = collection(db, MEMBERSHIP_COLLECTION);
    const now = new Date();

    const newDocRef = doc(membershipRef);

    const dataToSave = {
      ...applicationData,
      createdAt: now,
      status: "pending" as const,
    };

    await setDoc(newDocRef, dataToSave);
    console.log(
      "✅ Membership application added to Firestore with ID:",
      newDocRef.id,
      "membershipId:",
      applicationData.membershipId
    );
    return newDocRef.id;
  } catch (error) {
    console.error(
      "❌ Error adding membership application to Firestore:",
      error
    );
    throw error;
  }
};
// Get all membership applications
export const getMembershipApplications = async (): Promise<
  MembershipApplication[]
> => {
  try {
    console.log("🔥 Fetching membership applications from Firestore...");

    const membershipRef = collection(db, MEMBERSHIP_COLLECTION);
    const q = query(membershipRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const applications: MembershipApplication[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;
      applications.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        rollNumber: data.rollNumber || "",
        registerNumber: data.registerNumber || "",
        year: data.year || "",
        section: data.section || "",
        department: data.department || "AI&DS",
        participation: data.participation || "",
        membershipId: data.membershipId || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
        status: data.status || "pending",
      });
    });

    console.log(
      `✅ Fetched ${applications.length} membership applications from Firestore`
    );
    return applications;
  } catch (error) {
    console.error("❌ Error fetching membership applications:", error);
    throw error;
  }
};

// Admin flags helpers
const ADMIN_FLAGS_DOC_ID = "global";

export const subscribeToAdminFlags = (
  callback: (flags: AdminFlags) => void,
  onError?: (error: Error) => void
) => {
  try {
    const ref = doc(db, ADMIN_FLAGS_COLLECTION, ADMIN_FLAGS_DOC_ID);
    return onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.data() as Partial<AdminFlags> | undefined;
        const flags: AdminFlags = {
          liveResponsesEnabled: data?.liveResponsesEnabled ?? true,
        };
        callback(flags);
      },
      (err) => onError?.(err as any)
    );
  } catch (err) {
    console.error("Error subscribing to admin flags", err);
    onError?.(err as any);
    return () => {};
  }
};

export const setLiveResponsesEnabled = async (enabled: boolean) => {
  const ref = doc(db, ADMIN_FLAGS_COLLECTION, ADMIN_FLAGS_DOC_ID);
  await setDoc(ref, { liveResponsesEnabled: enabled }, { merge: true });
};

// Club members Firestore helpers
export interface ClubMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  imageUrl?: string;
}

export const deleteClubMember = async (memberId: string) => {
  const ref = doc(db, MEMBERS_COLLECTION, memberId);
  await deleteDoc(ref);
};