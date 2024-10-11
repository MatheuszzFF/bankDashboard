import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { fireStoreDb, fireBaseAuth } from './Firebase';
import React, { createContext, useEffect, useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { TUserSettings } from '../../types/userTypes';


type AuthContextType = {
  signUp: (email: string, password: string, settings: TUserSettings) => void,
  authState: AuthState,
  logout: () => void;
  login: (email: string, password: string) => void;
  setUserSettings: (userId: string, settings: TUserSettings) => void;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  uid: string | null;
};

const AuthContext = createContext<AuthContextType>(
  {
    signUp: () => {}, 
    authState: { user: null, loading: true, uid: null, error: null }, 
    logout: () => {}, 
    login: () => {},
    setUserSettings: () => {},
  } as AuthContextType);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    uid: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireBaseAuth, (currentUser) => {
      if (currentUser) {
        setAuthState({ 
          user: currentUser, 
          loading: false, 
          error: null,
          uid: currentUser.uid,
        });
      } else {
        setTimeout(() => {
          setAuthState({ user: null, loading: false, uid: null, error: null });
        }, 3000);
      }
  });
    return () => unsubscribe();
  }, []);

  const setUserSettings = async (userId: string, settings: TUserSettings) => {
    try {
      await setDoc(doc(fireStoreDb, "users", userId, "user_settings", "settings"), settings, { merge: true });
      console.log("Configurações do usuário foram salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações do usuário:", error);
    }
  };

  const login = (email:string, password: string) => {
    signInWithEmailAndPassword(fireBaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential)
        setAuthState({ user: userCredential.user, uid: userCredential.user.uid, loading: false, error: null });
        console.log('Usuário logado:', user);
      })
      .catch((error) => {
        setAuthState({ user: null, loading: false, uid: null, error: error.message });
        console.error('Erro de autenticação:', error.message);
      });
  };

  const signUp = (email: string, password: string, settings: TUserSettings) => {
    createUserWithEmailAndPassword(fireBaseAuth, email, password)
      .then(async (userCredential) => {
        const defaultSettings: TUserSettings = {
          theme: "light",
          notifications: false,
          locale: "pt-br",
          language: "pt-br",
          email: settings.email,
          name: settings.name,
          userName: settings.userName,
          birth: settings.birth,
          address: settings.address,
          city: settings.city,
          postalCode: settings.postalCode,
          country: settings.country,
        }
        setAuthState({ user: userCredential.user, loading: false, uid: userCredential.user.uid, error: null });
        await setUserSettings(userCredential.user.uid, defaultSettings)
      })
      .catch((error) => {
        setAuthState({ user: null, loading: false, uid: null, error: error.message });
        console.error('Erro ao criar conta:', error.message);
      });
  };

  const logout = async () => {
    setAuthState({ user: null, loading: true, uid: null, error: null });
    await signOut(fireBaseAuth);
    setAuthState({ user: null, loading: false, uid: null, error: null });
  };

  return (
    <AuthContext.Provider value={{signUp, authState, logout, login, setUserSettings}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;