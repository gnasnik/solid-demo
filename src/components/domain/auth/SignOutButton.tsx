
import { logout } from '@inrupt/solid-client-authn-browser';
import { useNavigate } from 'react-router-dom';
import {useSignOut} from  '../../contexts/UserContext';

type Props = {};

export const SignOutButton = (props: Props) => {
  const { signOut } = useSignOut();
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    signOut()
    navigate("/")
  };

  return (
    <div className="flex flex-row h-10 text-center item-center gap-4">
    <div className="hidden md:block px-4 middle py-2 bg-blue-500 text-white rounded hover:bg-opacity-80" onClick={handleClick}>Sign Out</div>
  </div>
  );
};
