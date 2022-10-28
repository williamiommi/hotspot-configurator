import React from 'react';
import { Paragraph } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { Button } from 'ui';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <Paragraph>
      Hello Entry Field Component (AppId: {sdk.ids.app})<span className="bg-emerald-500">CIAO</span>
      <br />
      e il monorepo worka ma forse non con pnpm!!!
      <br />
      <Button />
    </Paragraph>
  );
};

export default Field;
