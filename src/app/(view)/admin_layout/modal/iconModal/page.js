'use client'
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { HiTrash } from 'react-icons/hi';
import '../fa.css'
import { Button } from 'react-bootstrap';

const IconModal = ({ index, names, handleInputChange, inputValue, Icon, pageGroupIcons }) => {

    const [lgShow, setLgShow] = useState(false);
    const [icons, setIcons] = useState([])
    const [icon, setIcon] = useState([Icon])
    const [pageGroupIcon, setPageGroupIcon] = useState([pageGroupIcons])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/faIcons`)
            .then(res => res.json())
            .then(data => {
                setIcons(data)
            })
    }, [])

    const [cart, setCart] = useState([])
    const handleAddToCart = data => {

        const newCart = [...cart, data]
        setCart(newCart)

    }

    const iconValue = (cart?.map(c => c?.fa))

    const handleDeleteClick = (call) => {
        setCart([])
        if (call === 'delete') {
            setIcon([])
            setPageGroupIcon([])
        }
    };

    useEffect(() => {
        handleDeleteClick('input')
    }, [inputValue])


    return (
        <div >
            <div className=' d-flex'>
                <button className="btn btn-sm btn-success icon794_view" id="icon794_view" type="button">
                    <span
                        dangerouslySetInnerHTML={{ __html: iconValue[iconValue.length - 1] || icon[0] || pageGroupIcon }}
                    ></span>
                </button>
                <div className="input-group d-flex">
                    <input
                        type="text"
                        className="form-control form-control-sm page_group_icon"
                        name={names}
                        readOnly
                        placeholder="Enter Page Group Icon"
                        data-input={`icon[${index}]`}
                        value={iconValue[iconValue.length - 1] || icon[0] || pageGroupIcon}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-sm btn-danger icon_clear"
                            data-input={`icon[${index}]`}
                            type="button"
                            onClick={()=>handleDeleteClick('delete')}
                            onChange={() => handleInputChange(index, { target: { name: { names }, value: '' } })}
                        >
                            <HiTrash />
                        </button>

                        <button
                            onClick={() => setLgShow(true)}
                            className="btn btn-sm btn-secondary icon_modal"
                            data-input={`icon[${index}]`}
                            type="button"
                        >
                            <i className="fas fa-search"></i> Icon</button>
                    </div>
                </div>

                <Modal
                    className='text-black'
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header >
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                        </Modal.Title>
                        <Button variant="secondary" onClick={() => setLgShow(false)}>
                           x
                        </Button>
                    </Modal.Header>
                    <Modal.Body className='mt-5'>
                        <div className='row row-cols-2 row-cols-lg-6 row-cols-md-4 g-4 '>
                            {
                                icons?.map((icon) =>
                                    <div key={icon.id} className='mt-1' onClick={() => setLgShow(false)} >
                                        <div className=''
                                            onClick={() => handleAddToCart(icon)} >

                                            <div className="icon-el text-center bg-light m-1 show_fa_icon"
                                                onClick={() => handleAddToCart(icon)}
                                            >
                                                <a
                                                    dangerouslySetInnerHTML={{ __html: icon.fa }}
                                                ></a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default IconModal;



