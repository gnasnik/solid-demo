import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { Head } from '~/components/shared/Head';

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { useSignIn, useSignOut } from "~/components/contexts/UserContext";
import { handleIncomingRedirect} from '@inrupt/solid-client-authn-browser';

function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  const navigate = useNavigate();

  useEffect(() => {
    handleIncomingRedirect({ restorePreviousSession: true })
    .then(session => {
        console.log('handleIncomingRequest', session)
        if (session && session.isLoggedIn && session.webId) {
            console.log("session: " + session)
            signIn({webId: session.webId})
            navigate( "/profile")
        } else {
            signOut()
            navigate("/")
        }
    })
  }, [])

  return (
    <>
      <Head title="Titan Network" />
      <div className="hero min-h-screen flex">
        <div className="text-center hero-conten">
           
        </div>
      </div>
    </>
  );
}

export default Index;
