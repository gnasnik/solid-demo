import { useState, useEffect } from 'react';
import { IconUser } from '@arco-design/web-react/icon';
import { fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { getStringNoLocale, getSolidDataset, getThingAll, Thing } from "@inrupt/solid-client";
import { 
  List, 
  Pagination, 
  Avatar, 
  Button, 
  Modal, 
  Upload, 
  Form, 
  Image, 
  Input, 
  Grid,
} from '@arco-design/web-react';

import {createSolidThing} from '../../api/api'

import { RDF, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import Item from '@arco-design/web-react/es/Breadcrumb/item';



interface Resource {
  title: string,
  text: string,
  url: string,
}{}

function Profile() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const session = getDefaultSession().info;
    const [resources, setResources] = useState(Array<Thing>);

    useEffect(() => {
      form.setFieldsValue({})
      resourceList()
    }, [])

    
    async function resourceList() {
      const dataSet = await getSolidDataset(
        session.webId || '',
        { fetch: fetch }
      );

      const things = await getThingAll(dataSet).filter(item => getStringNoLocale(item, SCHEMA_INRUPT.name));
      setResources(things)
    }

    async function submitUpload() {
      setVisible(false)
      const datasetUrl = session.webId  + '/'
      const data = form.getFields() as Resource

      await createSolidThing(datasetUrl, data.title, data.text, data.url)
        
      form.resetFields()
      resourceList()
    }



    return (
      <>
        <div className="py-20 p-2 flex flex-col">
          <div className='w-full min-h-max border flex py-8 px-8 justify-center rounded-lg drop-shadow-md'>
            <div className='min-w-max flex flex-col text-center justify-center'>
                <div><Avatar  size={64}><IconUser /></Avatar></div>
                <div className='my-2'>
                  { !session.isLoggedIn ? 'Please Log In': 
                  <div>
                    <div>Your WebId: { session.webId}</div>
                    {/* <div>TitanKey: </div> */}
                  </div>
                  }</div>
            </div>
              
          </div>
          <div className='min-w-max min-h-max border my-4 p-4 shadow'>
            <div className='flex justify-between px-2'>
              <h1>Recources</h1>
             <div className='pt-5'> <Button type='outline' onClick={() => setVisible(true)}>Create</Button></div>
             <Modal
              title='Upload File'
              visible={visible}
              okText='ok'
              cancelText='Cancel'
              onOk={submitUpload}
              onCancel={() => setVisible(false)}
              autoFocus={false}
              focusLock={true}
              mountOnEnter={false}
            >
              <p>
                <Form form={form} colon labelAlign='left' style={{ width: 400 }} autoComplete='off'>
                  <Form.Item label='Title' field="title">
                    <Input />
                  </Form.Item>
                  <Form.Item label='Comment' field="text">
                    <Input />
                  </Form.Item>
                  <Form.Item label='URL' field="url">
                    <Input />
                  </Form.Item>
                </Form>                
              </p>
            </Modal>

            </div>

            <List
              className="w-full"
              dataSource={resources}
              pagination={{ pageSize: 3 }}
              render={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={getStringNoLocale(item, SCHEMA_INRUPT.name)}
                    description={getStringNoLocale(item,SCHEMA_INRUPT.text)}
                  />
                {getStringNoLocale(item,SCHEMA_INRUPT.url) ?<Image width={200} src={getStringNoLocale(item,SCHEMA_INRUPT.url) || ''}/> : <div></div>}   
               
                </List.Item>
              )}
            />
          
          </div>
        </div>
      </>
    );
  }
  
  export default Profile;