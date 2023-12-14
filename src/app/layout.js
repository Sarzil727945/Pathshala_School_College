'use client'
import './globals.css'

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import { Toaster } from 'react-hot-toast'

import { useState } from 'react'
import { useEffect } from 'react'


const queryClient = new QueryClient()


export default function RootLayout({ children }) {

 
const [categories, setCategories] = useState([])
const [css, setCss] = useState([])


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin_panel_settings`)
      .then(Response => Response.json())
      .then(data => setCategories(data))
  }, [])
  console.log(categories)



  const filteredCategories = categories.filter(category => category.status === 1);
  console.log(filteredCategories[0], 'filteredCategories[0]?.admin_template')

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`http://192.168.0.110:5003/get-css/${filteredCategories[0]?.admin_template}?v=${filteredCategories[0]?.version_code}`} />  
      </head>
      <body >
        <QueryClientProvider client={queryClient}>
          <Toaster></Toaster>

            {children}

        </QueryClientProvider>
      </body>
    </html>
   
  )
}
