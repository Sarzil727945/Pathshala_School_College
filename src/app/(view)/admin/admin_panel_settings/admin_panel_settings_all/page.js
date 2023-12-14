'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import '../../../admin_layout/modal/fa.css'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminPanelAll = () => {

   

    const getPageGroup = localStorage.getItem('pageGroup')

    const { data: adminPanelSettings = [], isLoading, refetch
    } = useQuery({
        queryKey: ['adminPanelSettings'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin_panel_settings`)

            const data = await res.json()
      
            return data
        }
    })



    const [adminPanelSettingsBtn, setAdminPanelSettingsBtn] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`)
            .then(Response => Response.json())
            .then(data => setAdminPanelSettingsBtn(data))
    }, [])

    console.log(adminPanelSettings)


    const filteredAdminPanelSettings = adminPanelSettingsBtn.filter(
        item => item.controller_name === 'admin_panel_settings'
    );

    console.log(filteredAdminPanelSettings)


    const filteredBtnIconEdit = filteredAdminPanelSettings.filter(btn =>
        btn.method_sort === 3
    );
    const filteredBtnIconCreate = filteredAdminPanelSettings.filter(btn =>
        btn.method_sort === 1
    );
    const filteredBtnIconDelete = filteredAdminPanelSettings.filter(btn =>
        btn.method_sort === 5
    );
    const filteredBtnIconCopy = filteredAdminPanelSettings.filter(btn =>
        btn.method_sort === 4
    );
    console.log(filteredBtnIconEdit, filteredBtnIconDelete, filteredBtnIconCopy, filteredBtnIconCreate)


    const handleDelete = (id, status) => {

        console.log(status)
        console.log(id);

        if (status === 1) {
            alert('Cannot delete this data')

            return;
        }

        const proceed = window.confirm('Are You Sure delete');
        if (proceed) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin_panel_settings/delete/${id}`, {
                method: 'DELETE',
            })
                .then((Response) => Response.json())
                .then((data) => {
                    console.log(data);

                    refetch();
                    toast.success('Delete Successfully')
                    // if (data.affectedRows > 0) {
                    //     Swal.fire({
                    //         title: 'Delete!',
                    //         text: 'User delete Successful !!',
                    //         icon: 'success',
                    //         confirmButtonText: 'Ok',
                    //     });
                    // }
                });
        }
    };


    return (
        <div>
            <div class="col-md-12 bg-light p-4 body-content">


                <div class=" border-primary shadow-sm border-0">
                    <div class="card-header custom-card-header py-1  clearfix  bg-gradient-primary text-white" style={{ backgroundColor: '#4267b2' }}>

                        <h5 class="card-title font-weight-bold mb-0  float-left mt-1 card-header-color">Admin Panel Settings</h5>
                        <div class="card-title font-weight-bold mb-0 float-right">
                            <Link href={`/Admin/admin_panel_settings/admin_panel_settings_create`}>

                                <button
                                    key={filteredBtnIconCreate[0]?.id}
                                    className='btn btn-info btn-sm'
                                >

                                    {filteredBtnIconCreate[0]?.display_name}
                                </button>
                            </Link>


                        </div>

                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-sm table-bordered table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Admin Panel Name</th>
                                        <th>Single Left Menu</th>
                                        <th>Created By</th>
                                        <th>Created Date</th>
                                        <th>Status </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? <>
                                         <div className='text-center'>
                                            <div className=' my-5 py-5 mr-5 text-center text-white'
                                            >
                                              <FontAwesomeIcon style={{
                                                height: '33px',
                                                width: '33px',
                                              }} icon={faSpinner} spin />
                                            </div>
                                          </div> 
                                          </>
                                          :


                                        adminPanelSettings.map(adminPanelSetting =>

                                            <>

                                                <tr>
                                                    <td>{adminPanelSetting.admin_panel_name}</td>
                                                    <td>
                                                        {
                                                            adminPanelSetting && adminPanelSetting.left_menu === 1 &&
                                                            <p>Active</p>
                                                        }
                                                        {
                                                            adminPanelSetting && adminPanelSetting.left_menu === 0 &&
                                                            <p>Null</p>
                                                        }
                                                    </td>
                                                    <td>{adminPanelSetting.created_by}</td>
                                                    <td>{adminPanelSetting.created_date}</td>

                                                    <td>
                                                        {
                                                            adminPanelSetting && adminPanelSetting.status === 1 &&
                                                            <p>Active</p>
                                                        }
                                                        {
                                                            adminPanelSetting && adminPanelSetting.status === 2 &&
                                                            <p>Not Active</p>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link href={`/Admin/admin_panel_settings/admin_panel_settings_edit/${adminPanelSetting.id}?page_group=${getPageGroup}`}>



                                                            <button
                                                                key={filteredBtnIconEdit[0]?.id}
                                                                title='Edit'
                                                                style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                className={filteredBtnIconEdit[0]?.btn}
                                                            >

                                                                <a
                                                                    dangerouslySetInnerHTML={{ __html: filteredBtnIconEdit[0]?.icon }}
                                                                ></a>
                                                            </button>


                                                        </Link>
                                                        <Link href={`/Admin/admin_panel_settings/admin_panel_settings_copy/${adminPanelSetting.id}?page_group=${getPageGroup}`}>

                                                            <button
                                                                key={filteredBtnIconCopy[0]?.id}
                                                                title='Copy'

                                                                style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                                className={filteredBtnIconCopy[0]?.btn}
                                                            >
                                                                <a
                                                                    dangerouslySetInnerHTML={{ __html: filteredBtnIconCopy[0]?.icon }}
                                                                ></a>
                                                            </button>
                                                        </Link>


                                                        <button
                                                            key={filteredBtnIconDelete[0]?.id}
                                                            title='Delete'
                                                            onClick={() => handleDelete(adminPanelSetting.id, adminPanelSetting.status)}
                                                            style={{ width: "35px ", height: '30px', marginLeft: '5px', marginTop: '5px' }}
                                                            className={filteredBtnIconDelete[0]?.btn}
                                                        >
                                                            <a
                                                                dangerouslySetInnerHTML={{ __html: filteredBtnIconDelete[0]?.icon }}
                                                            ></a>
                                                        </button>

                                                    </td>
                                                </tr>
                                            </>

                                        )
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        <div class="w-100 justify-content-around font-weight-bold">
                            <p class="float-left mb-0 my-2"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelAll;



