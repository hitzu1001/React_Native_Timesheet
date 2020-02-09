import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserList } from '../context/UserContext';


const ResolveAuthScreen = () => {
  const { tryLocalSignin, getUser } = useContext(AuthContext);
  const { getAllUser } = useContext(UserList);

  useEffect(() => {
    tryLocalSignin()
    getUser()
    getAllUser()
  }, []);

  return null;
};

export default ResolveAuthScreen;
