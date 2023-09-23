import { Image } from '@arco-design/web-react';
import { SignInButton } from '../domain/auth/SignInButton';
import { SignOutButton } from '../domain/auth/SignOutButton';
import { fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'


const Header = () => {
    const session = getDefaultSession().info;

    return (
      <header className="p-2 top-0 left-0 w-full z-50 bg-gray-900 fixed">
        <div className="flex justify-center md:justify-between items-center">
          <a className="flex items-center space-x-2 hover" href="/">
            <Image
                width={30}
                src='../../assets/logo.png'
                alt='logo'
            />
            <h1 className="px-4 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">DeSo</h1>
          </a>
          {session.isLoggedIn ? <SignOutButton /> : <SignInButton />}
        
        </div>
      </header>
    );
  };
  
  export default Header;