import { useContext, useEffect } from "react";
import { GlobalContainer } from "./components";
import AuthContext from "./contexts/Firebase/Auth";
import { useNavigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'

function App() {
  const auth = useContext(AuthContext);
  const authState = auth.authState;

  const navigate = useNavigate();

  useEffect(() => {
    if (authState.loading) return; 
    if (authState.user === null) {
      navigate("/login");
    }
  }, [authState.user, authState.loading, navigate]);

  if (authState.loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
       <Spinner className="w-[200px] h-[200px]"/>
      </div>
    ); 
  }

  return (
    <GlobalContainer />
  );
}

export default App;