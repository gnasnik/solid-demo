
import { login } from '@inrupt/solid-client-authn-browser';

export const SignInButton = () => {
  const oidcIssuer = "https://www.frank2022.buzz"
  const handleClick = () => {
    login({
      oidcIssuer,
      clientName: 'Tian&Solid Demo',
      redirectUrl: window.location.href,
    });
  };

  return (
    <div className="flex flex-row h-10 text-center item-center gap-4">
    <div className="hidden md:block px-4 middle py-2 bg-blue-500 text-white rounded hover:bg-opacity-80" onClick={handleClick}>Sign In</div>
  </div>
  );
};
