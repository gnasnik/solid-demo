import {
    addUrl,
    addStringNoLocale,
    buildThing,
    createSolidDataset,
    createThing,
    setThing,
    saveSolidDatasetAt,
    SolidDataset,
    getSolidDataset,
  } from "@inrupt/solid-client";
  import { RDF, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
  import { fetch } from '@inrupt/solid-client-authn-browser'


export const createSolidThing = async (datasetUrl: string, filename: string, text: string, url: string): Promise<SolidDataset> => {
   const dataset = await getSolidDataset(
    datasetUrl,
    { fetch: fetch }
  );

  const resourceUrl = new URL(url)

   const thing =  buildThing(createThing({ name: filename }))
   .addStringNoLocale(RDF.NAMESPACE, "titan")
  .addStringNoLocale(SCHEMA_INRUPT.name, filename)
  .addStringNoLocale(SCHEMA_INRUPT.text, text)
  .addStringNoLocale(SCHEMA_INRUPT.url, url)
  .build();    

   const changedDataset = setThing(dataset, thing);
   return saveSolidDatasetAt(
    datasetUrl,
    changedDataset,
    { fetch: fetch } 
   )        
}
