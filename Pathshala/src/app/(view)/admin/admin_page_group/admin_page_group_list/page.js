'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

const AdminPageGroupList = () => {
    const [controllerName, setControllerName] = useState('')

    const handlecontrollerNames = (controllerName) => {

        setControllerName(controllerName)
        sessionStorage.setItem('controllerName', controllerName)

    }


    const controllerNames = sessionStorage.getItem('controllerName')


    const { data: userss = [], isLoading, refetch } = useQuery({
        queryKey: ['userss'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
            const data = await res.json();
            return data;
        },
    });
    const page_groups = localStorage.getItem('pageGroup')
    const filterUser = userss.filter(u => u.page_group === page_groups)


    console.log(filterUser[0]?.controllers)

    const pageGroupNav = filterUser[0]?.controllers




    const formatString = (str) => {
        const words = str?.split('_');

        const formattedWords = words?.map((word) => {
            const capitalizedWord = word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return formattedWords?.join(' ');
    };
    console.log(
        pageGroupNav
            ?.map((page) =>
                page.display_names
                    .map((displayNames) => displayNames.method_names)
                    .flat() // If display_names is an array of arrays, use flat() to flatten it
            )
            .flat() // If pageGroupNav is an array of arrays, use flat() to flatten it
            .filter((methodName) => methodName.endsWith('_create'))
    );

    const createName = pageGroupNav
        ?.map((page) =>
            page.display_names
                .map((displayNames) => displayNames.method_names)
                .flat() // If display_names is an array of arrays, use flat() to flatten it
        )
        .flat() // If pageGroupNav is an array of arrays, use flat() to flatten it
        .filter((methodName) => methodName.endsWith('_create'))

    console.log(pageGroupNav, 'pageGroupNav')
    console.log(createName, 'createName')
    return (
        <div class="col-md-12 bg-light p-4">
            <h1 class="text-center text-uppercase">{formatString(page_groups)} DASHBOARD</h1>
            <p class="text-center">This section helps you to manage {formatString(page_groups)}</p>

            <div class=" border-primary text-center border-0 shadow-sm ">
                <div class="card-header py-1 text-center clearfix  text-white" style={{ background: `linear-gradient(180deg, #5e7ebe, #4267b2)` }}>
                    <h5 class="card-title font-weight-bold mb-0  text-center">Select a Task</h5>
                </div>
                <div class="card-body">
                    <div class="row row-cols-1 row-cols-md-5">

                        {
                            pageGroupNav?.map(page =>


                                <>


                                    <div class="col mb-4">
                                        <div class="card h-100" style={{ background: '#ff9900' }}>

                                            <div class="card-body" style={{ color: '#ffffff' }}>
                                                <div class="icon zt-5 "> <i class="fas fa-columns"></i> </div>
                                            </div>

                                            <div class="card-footer p-2">
                                                <h6 class="card-title mb-0"><Link
                                                    onClick={() => handlecontrollerNames(page?.controller_name)}
                                                   href={`/Admin/${page?.controller_name}/${page.display_names
                                                        .map((displayNames) => displayNames.method_names)
                                                        .flat()
                                                        .filter((methodName) => methodName.endsWith('_create'))
                                                        .join('/')}?page_group=${page_groups}`} class="stretched-link  text-decoration-none">{formatString(page.controller_name)}</Link></h6>
                                            </div>
                                        </div>
                                    </div>


                                </>
                            )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPageGroupList;



// 'use client'
// import { useQuery } from '@tanstack/react-query';
// import Link from 'next/link';
// import React from 'react';
// import { useState } from 'react';

// const AdminPageGroupList = () => {
//     const [controllerName, setControllerName] = useState('')
//     const [displayNames, setDisplayNames] = useState('')
//     const [pageGroup, setPageGroup] = useState('')

//     const handlecontrollerNames = (controllerName, displayNames, pageGroup) => {

//         setControllerName(controllerName)
//         setDisplayNames(displayNames)
//         setPageGroup(pageGroup)
//         sessionStorage.setItem('controllerName', controllerName)
//         sessionStorage.setItem('displayName', displayNames)
//         localStorage.setItem('pageGroup', pageGroup);

//     }


//     const controllerNames = sessionStorage.getItem('controllerName')


//     const { data: userss = [], isLoading, refetch } = useQuery({
//         queryKey: ['userss'],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
//             const data = await res.json();
//             return data;
//         },
//     });




//     const page_groups = localStorage.getItem('pageGroups')

//     const filterUser = userss.filter(u => u.page_group === page_groups)

// console.log(filterUser[0]?.page_group)
//     console.log(filterUser[0]?.controllers)

//     const pageGroupNav = filterUser[0]?.controllers




//     const formatString = (str) => {
//         const words = str?.split('_');

//         const formattedWords = words?.map((word) => {
//             const capitalizedWord = word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//             return capitalizedWord;
//         });

//         return formattedWords?.join(' ');
//     };
//     console.log(
//         pageGroupNav
//             ?.map((page) =>
//                 page.display_names
//                     .map((displayNames) => displayNames.method_names)
//                     .flat() // If display_names is an array of arrays, use flat() to flatten it
//             )
//             .flat() // If pageGroupNav is an array of arrays, use flat() to flatten it
//             .filter((methodName) => methodName.endsWith('_create'))
//     );

//     const createName = pageGroupNav
//         ?.map((page) =>
//             page.display_names
//                 .map((displayNames) => displayNames.method_names)
//                 .flat() // If display_names is an array of arrays, use flat() to flatten it
//         )
//         .flat() // If pageGroupNav is an array of arrays, use flat() to flatten it
//         .filter((methodName) => methodName.endsWith('_create'))

//     console.log(pageGroupNav, 'pageGroupNav')
//     console.log(createName, 'createName')
//     return (
//         <div class="col-md-12 bg-light p-4">
//             <h1 class="text-center text-uppercase">{formatString(page_groups)} DASHBOARD</h1>
//             <p class="text-center">This section helps you to manage {formatString(page_groups)}</p>

//             <div class=" border-primary text-center border-0 shadow-sm ">
//                 <div class="card-header py-1 text-center clearfix  text-white" style={{ background: `linear-gradient(180deg, #5e7ebe, #4267b2)` }}>
//                     <h5 class="card-title font-weight-bold mb-0  text-center">Select a Task</h5>
//                 </div>
//                 <div class="card-body">
//                     <div class="row row-cols-1 row-cols-md-5">

//                         {
                            
//                             pageGroupNav?.map(page =>


//                                 <>


//                                     <div class="col mb-4">
//                                         <div class="card h-100" style={{ background: '#ff9900' }}>

//                                             <div class="card-body" style={{ color: '#ffffff' }}>
//                                                 <div class="icon zt-5 "> <i class="fas fa-columns"></i> </div>
//                                             </div>

//                                             <div class="card-footer p-2">
//                                                 <h6 class="card-title mb-0"><Link
//                                                     onClick={() => handlecontrollerNames((page?.controller_name), (page.display_names
//                                                         .map((displayNames) => displayNames.method_names)
//                                                         .flat()
//                                                         .filter((methodName) => methodName.endsWith('_create'))))}
//                                                    href={`/Admin/${page?.controller_name}/${page.display_names
//                                                         .map((displayNames) => displayNames.method_names)
//                                                         .flat()
//                                                         .filter((methodName) => methodName.endsWith('_create'))
//                                                         .join('/')}?page_group=${page_groups}`} class="stretched-link  text-decoration-none">{formatString(page.controller_name)}</Link></h6>
//                                             </div>
//                                         </div>
//                                     </div>


//                                 </>
//                             )}


//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminPageGroupList;