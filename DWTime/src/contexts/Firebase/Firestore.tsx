import React, { createContext, useContext } from 'react';
import { collection, doc, getDoc, setDoc, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { fireStoreDb } from './Firebase';

type FirestoreContextType = {
  getDocument: (collectionName: string, docId: string) => Promise<any>;
  setDocument: (collectionName: string, data: any) => Promise<void>;
  addDocument: (collectionName: string, data: any) => Promise<void>;
  deleteDocument: (collectionName: string, docId: string) => Promise<void>;
  queryDocuments: (collectionName: string, field: string, operator: any, value: any) => Promise<any[]>;
};

const FirestoreContext = createContext<FirestoreContextType>({
  getDocument: async () => null,
  setDocument: async () => {},
  addDocument: async () => {},
  deleteDocument: async () => {},
  queryDocuments: async () => [],
});

export const FirestoreContextProvider = ({ children }: { children: React.ReactNode }) => {

  const getDocument = async (collectionName: string): Promise<any> => {
    const collectionRef = collection(fireStoreDb, collectionName);
    const data = await getDocs(collectionRef);
    return data.docs.map(doc => ({ id: doc.id,...doc.data() }));
  };

  const setDocument = async (collectionName, data: any): Promise<void> => {
    const docRef = doc(fireStoreDb, collectionName);
    await setDoc(docRef, data, { merge: true });
    console.log("Documento salvo/atualizado com sucesso!");
  };

  const addDocument = async (collectionName: string, data: any): Promise<void> => {
    await addDoc(collection(fireStoreDb, collectionName), data);
    console.log("Documento adicionado com sucesso!");
  };

  const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
    const docRef = doc(fireStoreDb, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Documento deletado com sucesso!");
  };

  const queryDocuments = async (collectionName: string, field: string, operator: any, value: any): Promise<any[]> => {
    const q = query(collection(fireStoreDb, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  return (
    <FirestoreContext.Provider value={{ getDocument, setDocument, addDocument, deleteDocument, queryDocuments }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);

export default FirestoreContext;
