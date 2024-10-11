import React, { createContext, useState, useContext } from 'react';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { fireBaseStorage } from './Firebase';

type StorageContextType = {
  uploadFile: (file: File, path: string) => Promise<string>;
  deleteFile: (path: string) => Promise<void>;
  uploadProgress: number;
};

const StorageContext = createContext<StorageContextType>({
  uploadFile: async () => "",
  deleteFile: async () => {},
  uploadProgress: 0,
});

export const StorageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadFile = async (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(fireBaseStorage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Erro ao fazer upload:", error);
          reject(error);
        }, 
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Erro ao obter URL do arquivo:", error);
            reject(error);
          }
        }
      );
    });
  };

  const deleteFile = async (path: string): Promise<void> => {
    const fileRef = ref(fireBaseStorage, path);
    try {
      await deleteObject(fileRef);
      console.log("Arquivo deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
    }
  };

  return (
    <StorageContext.Provider value={{ uploadFile, deleteFile, uploadProgress }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => useContext(StorageContext);

export default StorageContext;
