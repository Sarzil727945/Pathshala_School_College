'use client'

import React, { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import IconModal from '../../admin_layout/modal/iconModal/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPageListC() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [rowError, setRowErrors] = useState([]);
    const [inputValues, setInputValues] = useState([
        {
            controller_name: '',
            controller_bg: '',
            controller_color: '',
            page_group: '',
            icon: '',
            page_group_icon: '',
        },
    ]);
    const [numToAdd, setNumToAdd] = useState(1);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputValues = [...inputValues];
        newInputValues[index][name] = value;
        setInputValues(newInputValues);
        setError('')
        setRowErrors('')
    };

    const handleDeleteRow = (index) => {
        const newInputValues = [...inputValues];
        newInputValues.splice(index, 1);
        setInputValues(newInputValues);
    };




    const formDatabasePost = (event) => {
        event.preventDefault();
        const newErrors = new Array(inputValues.length).fill('');

        const isValid = inputValues.every((inputValue, index) => {
            if (!inputValue.controller_name.trim()) {
                newErrors[index] = 'Controller Name must be filled.';
                return false;
            }
            return true;
        });

        if (!isValid) {
            setRowErrors(newErrors);
            return;
        }
        setRowErrors(new Array(inputValues.length).fill(''));

        const form = event.target;

        for (let index = 0; index < inputValues.length; index++) {
            const controller_name = form.controller_name.value || form?.controller_name[index]?.value
            const controller_bg = form.controller_bg.value || form?.controller_bg[index]?.value
            const controller_color = form.controller_color.value || form?.controller_color[index]?.value
            const page_group = form.page_group?.value || form?.page_group[index]?.value
            const icon = form?.icon?.value || form?.icon[index]?.value
            const page_group_icon = form?.page_group_icon?.value || form?.page_group_icon[index]?.value
            const parent_id = 0
            const default_page = index
            const controller_sort = index
            const page_group_sort = index
            const status = index
            const controller_code = index

            const addValue = {
                controller_name, parent_id, icon, default_page, page_group, page_group_icon, controller_sort, page_group_sort, controller_bg, controller_color, status, controller_code
            }


          if (!page_group) {
            setError('Page Group must be filled.')
          }else{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addValue)
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
                    router.push('/Admin/module_info/module_info_all');
                    // server data post exit 
                })
          }

        }
    }

    const handleAddMore = () => {
        const numToAddInt = parseInt(numToAdd);
        if (!isNaN(numToAddInt) && numToAddInt > 0) {
            const newInputValues = [...inputValues];
            for (let i = 0; i < numToAddInt; i++) {
                newInputValues.push({
                    controller_name: '',
                    controller_bg: '',
                    controller_color: '',
                    page_group: '',
                    icon: '',
                    page_group_icon: '',
                });
            }
            setInputValues(newInputValues);
            setNumToAdd(1); // Reset the input field after adding
        }
    };

    return (
        <div className='p-3'>
            <div className=" mx-auto ">
                <section className="border  shadow-lg rounded mx-auto">
                    <div className='mb-3'>
                        <li className="list-group-item text-light  p-1 px-4 " aria-current="true" style={{ background: '#4267b2' }}>
                            <div className='d-flex justify-content-between mb-0'>
                                <h5 className='mt-2'> Module Info Create
                                </h5>
                                <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1 rounded'><Link href={`/Admin/module_info/module_info_all`}>Back To Module Info List</Link></button>
                            </div>
                        </li>
                        <div className=" mx-auto px-4  ">
                            <p style={{ backgroundColor: '#ffeeba', fontWeight: 'bold' }} className=' text-danger rounded p-3 mt-4'>(*) field required</p>
                            <section className=" border  rounded mx-auto">
                                <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className='mt-2'> Module Info
                                        </h5>

                                        <div
                                            style={{ marginBottom: '1px' }} className="form-group row gap-5">
                                            <div className=" col-sm-12">
                                                <div className="input-group">
                                                    <input style={{ width: '80px' }}
                                                        type="number"
                                                        min="1"
                                                        className="form-control "
                                                        placeholder="Enter number of forms to add"
                                                        value={numToAdd}
                                                        onChange={(event) => setNumToAdd(event.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-sm py-1 add_more "
                                                            onClick={handleAddMore}
                                                        >
                                                            Add More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                                <div className="card-body">
                                    <form className="form-horizontal" autoComplete="off" onSubmit={formDatabasePost}>
                                        <div className="form-group row">
                                            <div className="col-md-12">
                                                <div className=" card-default">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <div className="table-responsive">
                                                                <table role="presentation" className="table table-striped table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Controller Name</th>
                                                                            <th>Controller Background</th>
                                                                            <th>Controller Color</th>
                                                                            <th>Controller Icon</th>
                                                                            <th>Page Group</th>
                                                                            <th>Page Group Icon</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>

                                                                    {inputValues.map((inputValue, index) => (
                                                                        <tbody key={index} formindex={index} className="files">
                                                                            <tr>
                                                                                <td>
                                                                                    <input
                                                                                        onChange={(event) => handleInputChange(index, event)}
                                                                                        type="text"

                                                                                        name="controller_name"
                                                                                        className="form-control form-control-sm  row_unique_controller_name"
                                                                                        placeholder="Enter Controller Name"
                                                                                        value={inputValue.controller_name}
                                                                                        required
                                                                                    />
                                                                                    {
                                                                                        rowError[index] && <p className='text-danger'>{rowError[index]}</p>
                                                                                    }

                                                                                </td>
                                                                                <td>
                                                                                    <div className=' d-flex'>
                                                                                        <input
                                                                                            onChange={(event) => handleInputChange(index, event)}
                                                                                            type="color"
                                                                                            name="controller_bg"
                                                                                            className="form-control form-control-sm "
                                                                                            placeholder="Enter Controller bg"
                                                                                            value={inputValue.controller_bg}
                                                                                        />
                                                                                        <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd mt-1">▼</div></div>
                                                                                    </div>

                                                                                </td>

                                                                                <td>
                                                                                    <div className=' d-flex'>
                                                                                        <input
                                                                                            onChange={(event) => handleInputChange(index, event)}
                                                                                            type="color"


                                                                                            name="controller_color"
                                                                                            className="form-control form-control-sm "
                                                                                            placeholder="Enter Controller Name"
                                                                                            value={inputValue.controller_color}
                                                                                        />
                                                                                        <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd mt-1">▼</div></div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="input-group">
                                                                                        <IconModal
                                                                                            index={index}
                                                                                            names="icon"
                                                                                            handleInputChange={handleInputChange}
                                                                                            handleDeleteRow={handleDeleteRow}
                                                                                            page_group_icon={inputValue.icon}
                                                                                            inputValue={inputValue}
                                                                                        ></IconModal>
                                                                                    </div>
                                                                                </td>

                                                                                <td>                                                                      
                                                                                    <select
                                                                                       name="page_group"
                                                                                       className="form-control form-control-sm trim"
                                                                                       value={inputValue.page_group}
                                                                                       onChange={(event) => handleInputChange(index, event)}
                                                                                       required
                                                                                    >
                                                                                        <option value="" disabled selected>Select Page Group</option>
                                                                                     
                                                                                        <option defaultValue="academic_setup">academic_setup</option>
                                                                                        <option defaultValue="account_management">account_management</option>
                                                                                        <option defaultValue="certificate">certificate</option>
                                                                                        <option defaultValue="dev">dev</option>
                                                                                        <option defaultValue="dynamic_website">dynamic_website</option>
                                                                                        <option defaultValue="exam_management">exam_management</option>
                                                                                        <option defaultValue="fees_collection">fees_collection</option>
                                                                                        <option defaultValue="HR_management">HR_management</option>
                                                                                        <option defaultValue="library_management">library_management</option>
                                                                                        <option defaultValue="online_class">online_class</option>
                                                                                        <option defaultValue="results">results</option>
                                                                                        <option defaultValue="sms_management">sms_management</option>
                                                                                        <option defaultValue="student_management">student_management</option>
                                                                                        <option defaultValue="system_setup">system_setup</option>

                                                                                    </select>
                                                                                   
                                                                                </td>
                                                                                <td>
                                                                                    <div className="input-group">
                                                                                        <div>
                                                                                            <IconModal
                                                                                                index={index}
                                                                                                names="page_group_icon"
                                                                                                handleInputChange={handleInputChange}
                                                                                                handleDeleteRow={handleDeleteRow}
                                                                                                page_group_icon={inputValue.page_group_icon}
                                                                                                inputValue={inputValue}
                                                                                            ></IconModal>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-danger btn-sm"
                                                                                        onClick={() => handleDeleteRow(index)}
                                                                                    >
                                                                                        <HiTrash />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    ))}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row mt-3 mb-4">
                                            <div className="offset-md-3 col-sm-6">
                                                <input type="submit" name="create" className="btn btn-success btn-sm" defaultValue="Submit" />
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </section>
                        </div>
                    </div>


                </section>
            </div>
        </div>
    );
}

