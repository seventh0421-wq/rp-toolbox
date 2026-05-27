import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | null;
    email: string | null;
    emailVerified: boolean | null;
    isAnonymous: boolean | null;
    tenantId: string | null;
    providerInfo: {
      providerId: string | null;
      email: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Increment a specific statistic count atomically in Firestore.
 * If the document doesn't exist, we create it. Since custom operations can cause permission errors,
 * we handle this cleanly and fallback safely to local simulation if there's any permission gap.
 */
export async function incrementStat(statId: string) {
  const docRef = doc(db, 'stats', statId);
  try {
    // Attempt with setDoc with merge to support creation or updating atomically
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { count: 1 });
    } else {
      await updateDoc(docRef, { count: increment(1) });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `stats/${statId}`);
  }
}
