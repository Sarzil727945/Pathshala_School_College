import WebFooter from '@/app/(view)/(web)/web-layout/footer/page';
import WebHeader from '@/app/(view)/(web)/web-layout/header/page';
import React from 'react';

export const metadata = {
    title: 'Pathshala School & College',
    description: 'Pathshala School & College',
  }

const WebTemplate = ({ children }) => {
    return (
        <div className=' container'>
            <WebHeader></WebHeader>
            {children}
            <WebFooter></WebFooter>
        </div>
    );
};

export default WebTemplate;