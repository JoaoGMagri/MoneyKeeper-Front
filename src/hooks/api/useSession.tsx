
import { signInService, signUpService } from "../../service/session";
import { useAsync } from "../useAsync";

function useSignIn() {
    const {
      data: signIn,
      loading: signInLoading,
      error: signInError,
      act: functionSignIn
    } = useAsync(signInService, false);
    
    return {
      signInLoading,
      signInError,
      signIn,
      functionSignIn
    };
}

function useSignUp() {
  const {
    data: signUp, 
    loading: signUpLoading,
    error: signUpError,
    act: functionSignUp
  } = useAsync( signUpService, false );
  
  return {
    signUpLoading,
    signUpError,
    signUp,
    functionSignUp
  };
}

const sessionsHooks = {
    useSignIn,
    useSignUp
}

export default sessionsHooks;