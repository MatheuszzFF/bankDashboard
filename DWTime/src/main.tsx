import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/Firebase/Auth.tsx'
import { ChakraProvider } from "@chakra-ui/react";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from './App.tsx';
import { ErrorPage, LoginPage, SignupPage } from './pages';
import { StorageContextProvider } from './contexts/Firebase/Storage.tsx';
import { FirestoreContextProvider } from './contexts/Firebase/Firestore.tsx';
import { Homepage } from './pages/Home.tsx';

  
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [ 
            {
                index: true,
                element: <Homepage/>
            },
            {
                path: '/test',
                element: <h1>Hello, World!</h1>
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/signUp",
        element: <SignupPage/>,
        errorElement: <ErrorPage/>,
    }
])

createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <StorageContextProvider>
            <AuthContextProvider>
                <FirestoreContextProvider>
                    <RouterProvider router={router}/>
                </FirestoreContextProvider>
            </AuthContextProvider>
        </StorageContextProvider>
    </ChakraProvider>
)
