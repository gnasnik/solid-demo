import { useAuthState } from '../contexts/UserContext';
import { IconUser } from '@arco-design/web-react/icon';
import { Avatar } from '@arco-design/web-react';
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";


import {
  useSession,
  CombinedDataProvider,
  Image,
  Text,
} from "@inrupt/solid-ui-react";


function Profile() {

    const { state } = useAuthState();
    const session = getDefaultSession().info;

    console.log("sesson: ", session)

    async function readTodoList() {

      // Make authenticated requests by passing `fetch` to the solid-client functions.
      // The user must have logged in as someone with the appropriate access to the specified URL.
    
      // For example, the user must be someone with Read access to the specified URL.
      const dataSet = await getSolidDataset(
        session.webId || '',
        { fetch: fetch }
      );

      console.log('dataset: ', dataSet);
    }

    // readTodoList()

    return (
      <>
        <div className="py-20 p-2 flex flex-col">
          <div className='w-full min-h-max border flex  py-8 px-8 justify-center'>
            <div className='min-w-max flex flex-col text-center justify-center'>
                <div><Avatar size={64}><IconUser /></Avatar></div>
                <div className='my-2'>{ session.isLoggedIn ? 'Your WebId: ' + session.webId: 'Please Log In' }</div>
            </div>
              
          </div>
          <div className='min-w-max min-h-max border my-4 p-4'>
        
          </div>
        </div>
      </>
    );
  }
  
  export default Profile;