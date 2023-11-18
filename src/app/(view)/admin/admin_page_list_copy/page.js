'use client'
import React, { useEffect, useState } from 'react';
import { getAllAdminData } from '@/api/adminPage';
import '../../admin_layout/modal/fa.css'
import IconModal from '../../admin_layout/modal/iconModal/page';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ContentLoader from 'react-content-loader';

const AdminPageCopyAll = ({ Id, props }) => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        allAdminData();
    }, []);

    const allAdminData = () => {
        getAllAdminData().then(data => {
            setUsers(data)
            setLoading(false)
        })
    };


    const selectAllData = [];
    const parentUser = users?.filter(user => user?.id === +Id);
    selectAllData.push(...parentUser);

    const pageGroupSame = users?.filter(user => user?.page_group === parentUser[0]?.page_group);


    let maxMethodSort = pageGroupSame[0]?.method_sort

    for (let index = 0; index < pageGroupSame.length; index++) {
        const element = pageGroupSame[index].method_sort;
        if (element > maxMethodSort) {
            maxMethodSort = element
        }
    }

    const methodSortValue = (+maxMethodSort) + 1


    const menuType = [
        [
            { mt: 'Non Menu' },
            { mt: 'Menu' },
            { mt: 'Setup' }
        ],
        [
            { mt: 'Menu' },
            { mt: 'Non Menu' },
            { mt: 'Setup' }
        ],
        [
            { mt: 'Setup' },
            { mt: 'Menu' },
            { mt: 'Non Menu' }
        ]
    ]

    const DefaultPage = [
        [
            { dp: 'Non Default' },
            { dp: 'Default' }
        ],
        [
            { dp: 'Default' },
            { dp: 'Non Default' }
        ]

    ]

    const sortArr = [];
    for (let index = 1; index <= 300; index++) {
        sortArr.push(index)
    }

    const handelEditFrom = (event) => {
        event.preventDefault();
        const form = event.target;

        for (let index = 0; index < selectAllData.length; index++) {
            const display_name = form.display_name.value || form?.display_name[index]?.value
            const controller_name = form.controller_name.value || form?.controller_name[index]?.value
            const method_name = form.method_name.value || form?.method_name[index]?.value
            const parent_id = form.parent_id?.value || form?.parent_id[index]?.value
            const menu_type = form?.menu_type?.value || form?.menu_type[index]?.value
            const icon = form?.icon?.value || form?.icon[index]?.value
            const btn = form?.btn?.value || form?.btn[index]?.value
            const default_page = form?.default_page?.value || form?.default_page[index]?.value
            const page_group = form?.page_group?.value || form?.page_group[index]?.value
            const controller_bg = form?.controller_bg?.value || form?.controller_bg[index]?.value
            const page_group_icon = form?.page_group_icon?.value || form?.page_group_icon[index]?.value
            const controller_sort = form?.controller_sort?.value || form?.controller_sort[index]?.value
            const page_group_sort = form?.page_group_sort?.value || form?.page_group_sort[index]?.value
            const method_sort = form?.method_sort?.value || form?.method_sort[index]?.value
            const controller_color = form?.controller_color?.value || form?.controller_color[index]?.value
            const status = index
            const controller_code = index

            const EditValue = {
                display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, controller_bg, page_group_icon, controller_sort, page_group_sort, method_sort, controller_color, status, controller_code
            }
            console.log(EditValue);

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/copy`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(EditValue)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'admin data post Successful !!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                    router.push('/Admin/admin_page_list/admin_page_list_all');

                })

        }
    }


    return (
        <div className='shadow-lg'>

            {
                loading ? <>
                <ContentLoader

                    viewBox="0 0 1000 550"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                    {...props}
                >
                    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                    <circle cx="879" cy="123" r="11" />
                    <circle cx="914" cy="123" r="11" />
                    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                    <circle cx="880" cy="184" r="11" />
                    <circle cx="915" cy="184" r="11" />
                    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="242" r="11" />
                    <circle cx="916" cy="242" r="11" />
                    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="303" r="11" />
                    <circle cx="917" cy="303" r="11" />
                    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="363" r="11" />
                    <circle cx="916" cy="363" r="11" />
                    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="424" r="11" />
                    <circle cx="917" cy="424" r="11" />
                    <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                    <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                    <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                    <circle cx="882" cy="484" r="11" />
                    <circle cx="917" cy="484" r="11" />
                    <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                </ContentLoader>
            </> : <>
            <div className=' px-3 mb-5'>
                <div className="list-group-item text-light rounded  p-1 px-2" aria-current="true" style={{ background: '#4267b2' }}>
                    <div className='d-flex justify-content-between py-1 px-2'>
                        <h5 className=' pt-2'> Edit Admin Page List
                        </h5>
                        <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1 rounded'><Link href='/Admin/admin_page_list/admin_page_list_all'>Back To Admin Page List List</Link></button>
                    </div>
                </div>
            </div>
            <form onSubmit={handelEditFrom}>
                {
                    selectAllData.map((data, index) => (
                        <div key={data.id}>
                            <div >
                                <div className="row border-bottom pb-3  mx-4">
                                    <div className="col-md-4">
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-6">Display Name:</label>
                                            <div className="col-md-6">
                                                <input type="text" required="" name="display_name" className="form-control form-control-sm required" id="display_name" placeholder="Enter Display Name" defaultValue={data.display_name} />
                                            </div>
                                            <label className="col-form-label col-md-6">Controller Name:</label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="controller_name"
                                                    className="form-control form-control-sm required controller_name"
                                                    name="controller_name"
                                                    defaultValue={data.controller_name}
                                                />

                                            </div>
                                            <label className="col-form-label col-md-6">Method Name:</label>
                                            <div className="col-md-6">
                                                <input type="text" name="method_name" className="form-control form-control-sm " id="method_name" placeholder="Enter Method Name" defaultValue={data.method_name} />
                                            </div>
                                            <label className="col-form-label col-md-6">Parent Id:</label>
                                            <div className="col-md-6">
                                                <input type="number" step="1" name="parent_id" className="form-control form-control-sm " id="parent_id" placeholder="Enter Parent Id" defaultValue={data.parent_id} />
                                            </div>
                                            <label className="col-form-label col-md-6">Menu Type:</label>
                                            <div className="col-md-6">
                                                <select required="" name="menu_type" className="form-control form-control-sm  trim" id="menu_type">
                                                    {
                                                        (data?.menu_type === 0) ? <>
                                                            {menuType[0].map((md, index) =>
                                                                <option key={index} defaultValue={index}>{md.mt}</option>
                                                            )}
                                                        </> :
                                                            (data?.menu_type === 1) ? <>
                                                                {menuType[1].map((md, index) =>
                                                                    <option key={index} defaultValue={index}>{md.mt}</option>
                                                                )}
                                                            </> :
                                                                <>
                                                                    {menuType[2].map((md, index) =>
                                                                        <option key={index} defaultValue={index}>{md.mt}</option>
                                                                    )}
                                                                </>
                                                    }

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-5">Icon:</label>
                                            <div className="col-md-7">
                                                <div className="input-group d-flex">
                                                    <div className="input-group-append">
                                                        <IconModal
                                                            names="icon"
                                                            index={index}
                                                            Icon={data.icon}
                                                        ></IconModal>

                                                    </div>
                                                </div>
                                            </div>
                                            <label className="col-form-label col-md-5">Btn:</label>
                                            <div className="col-md-7">
                                                <input type="text" name="btn" className="form-control form-control-sm " id="btn" placeholder="Enter Btn" defaultValue={data.btn} />
                                            </div>
                                            <label className="col-form-label col-md-5">Default Page:</label>
                                            <div className="col-md-7">
                                                <select name="default_page" className="form-control form-control-sm trim" id="default_page">
                                                    {
                                                        ((data?.default_page === 0)) ? <>
                                                            {DefaultPage[0].map((dd, index) =>
                                                                <option key={index} defaultValue={index}>{dd.dp}</option>
                                                            )}
                                                        </> : <>
                                                            {DefaultPage[1].map((dd, index) =>
                                                                <option key={index} defaultValue={index}>{dd.dp}</option>
                                                            )}
                                                        </>
                                                    }

                                                </select>
                                            </div>
                                            <label className="col-form-label col-md-5">Page Group:</label>
                                            <div className="col-md-7">
                                                <input
                                                    type="text"
                                                    id="page_group"
                                                    className="form-control form-control-sm page_group"
                                                    name="page_group"
                                                    defaultValue={data.page_group}
                                                />
                                            </div>
                                            <label className="col-form-label col-md-5">Controller Background:</label>
                                            <div className="col-md-7">
                                                <div className=' d-flex'>
                                                    <input
                                                        type="color"
                                                        name="controller_bg"
                                                        className="form-control form-control-sm "
                                                        placeholder="Enter Controller bg"
                                                        defaultValue={data.controller_bg}
                                                    />
                                                    <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd mt-1">▼</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-6">Page Group Icon:</label>
                                            <div className="col-md-6">
                                                <div className="input-group d-flex">
                                                    <div className="input-group-append">
                                                        <IconModal
                                                            names="page_group_icon"
                                                            index={index}
                                                            pageGroupIcons={data.page_group_icon}
                                                        ></IconModal>

                                                    </div>
                                                </div>
                                            </div>
                                            <label className="col-form-label col-md-6">Controller Sort:</label>
                                            <div className="col-md-6">
                                                <select required="" name="controller_sort" className="form-control form-control-sm controller_sort trim" id="controller_sort" defaultValue={data.controller_sort}>

                                                    {
                                                        sortArr.map((d, ind) => <option key={ind} value={d}>{d}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <label className="col-form-label col-md-6">Page Group Sort:</label>
                                            <div className="col-md-6">
                                                <select
                                                    required=""
                                                    name="page_group_sort"
                                                    className="form-control form-control-sm page_group_sort trim"
                                                    id="page_group_sort"
                                                    defaultValue={data.page_group_sort}
                                                >
                                                    {sortArr.map((d, ind) => (
                                                        <option key={ind} value={d}>
                                                            {d}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <label className="col-form-label col-md-6">Method Sort:</label>
                                            <div className="col-md-6">
                                                <select required="" name="method_sort" className="form-control form-control-sm method_sort trim" id="method_sort"
                                                    // defaultValue={data?.method_sort}
                                                    defaultValue={methodSortValue}
                                                >
                                                    {
                                                        sortArr.map((d, ind) => <option key={ind} value={ind}>{ind}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <label className="col-form-label col-md-6">Controller Color:</label>
                                            <div className="col-md-6">
                                                <div className=' d-flex'>
                                                    <input
                                                        type="color"
                                                        name="controller_color"
                                                        className="form-control form-control-sm "
                                                        placeholder="Enter controller color"
                                                        defaultValue={data.controller_color}
                                                    />
                                                    <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd mt-1">▼</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                {
                    loading && <div className='text-center'>
                        <div colSpan='100%' className='my-5 py-5 border-bottom-0 '>
                            <div className=' my-5 py-5 text-primary'>
                                <FontAwesomeIcon style={{
                                    height: '40px',
                                    width: '40px',
                                }} icon={faSpinner} spin />
                            </div>
                        </div>
                    </div>
                }

                {
                    loading || <div className="offset-md-3 col-sm-6 my-3 pb-5">
                        <input type="submit" name="create" className="btn btn-success btn-sm" value="Submit" />
                    </div>
                }

            </form>
            </>
            }
            
        </div>
    );
};

export default AdminPageCopyAll;







