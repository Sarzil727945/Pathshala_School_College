import WebHome from '@/app/(view)/(web)/web_home/page';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <div>
            <WebHome></WebHome>
            
            <Link href='excel_sheet'>Excel Sheet</Link>
        </div>
    );
};

export default Home;