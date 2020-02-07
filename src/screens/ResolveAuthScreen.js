import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
