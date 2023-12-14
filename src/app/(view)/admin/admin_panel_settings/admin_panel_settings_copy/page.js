'use client'
import React, { useState } from 'react';

import { FaAngleDown, FaAngleRight, FaBars, FaCaretDown, FaEdit, FaTasks, FaTimes, FaUpload, FaUserGraduate } from 'react-icons/fa';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import '../admin_panel_settings_create/adminPanel.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';




const AdminSettingsCopy = ({ id }) => {

    
    const { data: adminPanelSettingsEdit = [], isLoading, refetch
    } = useQuery({
        queryKey: ['adminPanelSettingsEdit'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin_panel_settings/${id}`)

            const data = await res.json()
            return data
        }
    })
    console.log(adminPanelSettingsEdit[0], 'adminPanelSettingsEdit')

    const inputStyle = {
        border: 'none',
        outline: 'none',



    };

    // 	const [selectedFile, setSelectedFile] = useState([]);

    //   const handleFileChange = (e) => {
    //     const files = e.target.files;

    //     if (files.length > 0) {
    //       const newImagePreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    //       setSelectedFile((prevImagePreviews) => [...prevImagePreviews, ...newImagePreviews]);
    //     }
    //   };
    //   const handleRemoveImage = (index) => {
    //     setSelectedFile((prevImagePreviews) => {
    //       const updatedImagePreviews = [...prevImagePreviews];
    //       updatedImagePreviews.splice(index, 1);
    //       return updatedImagePreviews;
    //     });
    //   };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {


        const files = e.target.files[0];


        setSelectedFile(files);



    };


    const upload = () => {
        const formData = new FormData()
        formData.append('files', selectedFile)
        formData.append('files', contentBgImage)
        formData.append('files', bodyBgImage)
        axios.post('http://localhost:5003/upload', formData)
            .then(res => { })
            .catch(er => console.log(er))
    }


    console.log(selectedFile)

    const handleRemoveImage = () => {
        const confirm = window.confirm('Are you sure want to delete this')
        if (confirm) {


            setSelectedFile(null);
        }
    };
    console.log(selectedFile)


    const [contentBgImage, setContentBgImage] = useState(null)
    const handleContentBgImage = (e) => {
        const contentImg = e.target.files[0];
        setContentBgImage(contentImg);
    }
    const handleRemoveContentBgImage = () => {
        const confirm = window.confirm('Are you sure want to delete this')
        if (confirm) {


            setContentBgImage(null);
        }
    };

    const [bodyBgImage, setBodyBgImage] = useState(null)
    const handleBodyBgImage = (e) => {
        const bodyImg = e.target.files[0];
        setBodyBgImage(bodyImg);
    }
    const handleRemoveBodyBgImage = () => {
        const confirm = window.confirm('Are you sure want to delete this')
        if (confirm) {

            setBodyBgImage(null);
        }
    };

    // const [backgroundColor, setBackgroundColor] = useState(null); // Initial background color

    // const handleColorChange = (event) => {
    // 	const newColor = event.target.value;
    // 	setBackgroundColor(newColor);
    // };


    // side bar start

    const [backgroundColor, setBackgroundColor] = useState('');
    const [selectedGradientDirection, setSelectedGradientDirection] = useState('');
    const [selectedGradientColor, setSelectedGradientColor] = useState('');
    const [selectedOpacity, setSelectedOpacity] = useState('');

    const handleOpacityChange = (e) => {
        setSelectedOpacity(e.target.value);
    };


    const handleColorChange = (event) => {
        const newValue = event.target.value
        setBackgroundColor(newValue);
    };


    const handleGradientDirectionChange = (e) => {
        setSelectedGradientDirection(e.target.value);
    };


    const handleGradientColorChange = (e) => {
        setSelectedGradientColor(e.target.value);
    };


    // level 1 

    const [textColor, setTextColor] = useState(null);
    const handleTextColorChange = (event) => {
        const newColor = event.target.value;
        setTextColor(newColor);
    };

    const [levelOneBgChange, setLevelOneBgChange] = useState('');
    const handleLevelOneBgChange = (event) => {
        const newColor = event.target.value;
        setLevelOneBgChange(newColor);
    };
    const [levelOneGradientDirectionChange, setLevelOneGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeLevelOne = (event) => {
        const newColor = event.target.value;
        setLevelOneGradientDirectionChange(newColor);
    };

    const [levelOneGradientColorChange, setLevelOneGradientColorChange] = useState('');
    const handleGradientColorChangeLevelOne = (event) => {
        const newColor = event.target.value;
        setLevelOneGradientColorChange(newColor);
    };
    const [selectedOpacityLevelOne, setSelectedOpacityLevelOne] = useState('');

    const handleLevelOneOpacityChange = (e) => {
        setSelectedOpacityLevelOne(e.target.value);
    };





    const [levelOneBorderChange, setLevelOneBorderChange] = useState(null);
    const handleLevelOneBorderChange = (event) => {
        const newColor = event.target.value;
        setLevelOneBorderChange(newColor);
    };


    // level 2


    const [levelTwoTextColor, setLevelTwoTextColor] = useState(null);
    const handleLevelTwoTextColorChange = (event) => {
        const newColor = event.target.value;
        setLevelTwoTextColor(newColor);
    };
    const [levelTwoBgChange, setLevelTwoBgChange] = useState('');
    const handleLevelTwoBgChange = (event) => {
        const newColor = event.target.value;
        setLevelTwoBgChange(newColor);
    };


    const [levelTwoGradientDirectionChange, setLevelTwoGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeLevelTwo = (event) => {
        const newColor = event.target.value;
        setLevelTwoGradientDirectionChange(newColor);
    };

    const [levelTwoGradientColorChange, setLevelTwoGradientColorChange] = useState('');
    const handleGradientColorChangeLevelTwo = (event) => {
        const newColor = event.target.value;
        setLevelTwoGradientColorChange(newColor);
    };
    const [selectedOpacityLevelTwo, setSelectedOpacityLevelTwo] = useState('');

    const handleLevelTwoOpacityChange = (e) => {
        setSelectedOpacityLevelTwo(e.target.value);
    };


    const [levelTwoBorderChange, setLevelTwoBorderChange] = useState(null);
    const handleLevelTwoBorderChange = (event) => {
        const newColor = event.target.value;
        setLevelTwoBorderChange(newColor);
    };


    // level 3 


    const [levelThreeTextColor, setLevelThreeTextColor] = useState(null);
    const handleLevelThreeTextColorChange = (event) => {
        const newColor = event.target.value;
        setLevelThreeTextColor(newColor);
    };
    const [levelThreeBgChange, setLevelThreeBgChange] = useState('');
    const handleLevelThreeBgChange = (event) => {
        const newColor = event.target.value;
        setLevelThreeBgChange(newColor);

    };


    const [levelThreeGradientDirectionChange, setLevelThreeGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeLevelThree = (event) => {
        const newColor = event.target.value;
        setLevelThreeGradientDirectionChange(newColor);
    };

    const [levelThreeGradientColorChange, setLevelThreeGradientColorChange] = useState('');
    const handleGradientColorChangeLevelThree = (event) => {
        const newColor = event.target.value;
        setLevelThreeGradientColorChange(newColor);
    };
    const [selectedOpacityLevelThree, setSelectedOpacityLevelThree] = useState('');

    const handleLevelThreeOpacityChange = (e) => {
        setSelectedOpacityLevelThree(e.target.value);
    };





    const [levelThreeBorderChange, setLevelThreeBorderChange] = useState(null);
    const handleLevelThreeBorderChange = (event) => {
        const newColor = event.target.value;
        setLevelThreeBorderChange(newColor);
    };

    // side bar end


    // card body start


    const [gradientDirectionCardBody, setGradientDirectionCardBody] = useState('');
    const [gradientColorCardBody, setGradientColorCardBody] = useState('');
    const [cardBodyBg, setCardBodyBg] = useState('');
    const handleCardBodyBgChange = (event) => {
        const newColor = event.target.value;
        setCardBodyBg(newColor);

    };

    const handleGradientDirectionChangeCardBody = (e) => {
        setGradientDirectionCardBody(e.target.value);
    };


    const handleGradientColorChangeCardBody = (e) => {
        setGradientColorCardBody(e.target.value);
    };
    console.log(gradientColorCardBody, cardBodyBg, gradientDirectionCardBody)

    // const colour = sessionStorage.getItem('cardBodyBg')
    const [selectedOpacityCardBg, setSelectedOpacityCardBg] = useState('');

    const handleCardBgOpacityChange = (e) => {
        setSelectedOpacityCardBg(e.target.value);
    };

    console.log(selectedOpacity)

    const [cardBodyText, setCardBodyText] = useState(null)
    const handleCardBodyTextcolourChange = (event) => {
        const newColor = event.target.value;
        setCardBodyText(newColor);
    };


    // card body end

    // Header start


    const [headerTextColor, setHeaderTextColor] = useState(null);
    const handleHeaderColorChange = (event) => {
        const newColor = event.target.value;
        setHeaderTextColor(newColor);
    };


    const [HeaderBgChange, setHeaderBgChange] = useState('');
    const handleHeaderBgChange = (event) => {
        const newColor = event.target.value;
        setHeaderBgChange(newColor);

    };

    // bg_header?.slice(2,3)
    const [headerGradientDirectionChange, setHeaderGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeHeader = (event) => {
        const newColor = event.target.value;
        setHeaderGradientDirectionChange(newColor);
    };
    console.log(headerGradientDirectionChange, 'headerGradientDirectionChange')
    const [headerGradientColorChange, setHeaderGradientColorChange] = useState('');
    const handleGradientColorChangeHeader = (event) => {
        const newColor = event.target.value;
        setHeaderGradientColorChange(newColor);
    };
    const [selectedOpacityHeader, setSelectedOpacityHeader] = useState('');

    const handleHeaderOpacityChange = (event) => {
        const newColor = event.target.value;
        setSelectedOpacityHeader(newColor);
    };





    // Header end





    //Sub Header Start
    const [subHeaderPageGroupTextColor, setSubHeaderPageGroupTextColor] = useState(null);
    const handleSubHeaderGroupTextColorChange = (event) => {
        const newColor = event.target.value;
        setSubHeaderPageGroupTextColor(newColor);
    };

    const [subHeaderControllerTextColor, setSubHeaderControllerTextColor] = useState(null);
    const handleSubHeaderControllerTextColorChange = (event) => {
        const newColor = event.target.value;
        setSubHeaderControllerTextColor(newColor);
    };

    const [subHeaderOptionsTextColor, setSubHeaderOptionsTextColor] = useState(null);
    const handleSubHeaderOptionsTextColorChange = (event) => {
        const newColor = event.target.value;
        setSubHeaderOptionsTextColor(newColor);
    };

    const [subHeaderBgChange, setSubHeaderBgChange] = useState('');
    const handleSubHeaderBgChange = (event) => {
        const newColor = event.target.value;
        setSubHeaderBgChange(newColor);

    };

    const [subHeaderGradientDirectionChange, setSubHeaderGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeSubHeader = (event) => {
        const newColor = event.target.value;
        setSubHeaderGradientDirectionChange(newColor);
    };

    const [subHeaderGradientColorChange, setSubHeaderGradientColorChange] = useState('');
    const handleGradientColorChangeSubHeader = (event) => {
        const newColor = event.target.value;
        setSubHeaderGradientColorChange(newColor);
    };

    const [selectedOpacitySubHeader, setSelectedOpacitySubHeader] = useState('');
    const handleSubHeaderOpacityChange = (event) => {
        const newColor = event.target.value;
        setSelectedOpacitySubHeader(newColor);
    };

    //Sub Header end





    //Body Card Header start


    const [cardHeaderTextColor, setCardHeaderTextColor] = useState(null);
    const handleCardHeaderColorChange = (event) => {
        const newColor = event.target.value;
        setCardHeaderTextColor(newColor);
    };


    const [cardHeaderBgChange, setcardHeaderBgChange] = useState('');
    const handleCardHeaderBgChange = (event) => {
        const newColor = event.target.value;
        setcardHeaderBgChange(newColor);

    };


    const [cardHeaderGradientDirectionChange, setCardHeaderGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeCardHeader = (event) => {
        const newColor = event.target.value;
        setCardHeaderGradientDirectionChange(newColor);
    };

    const [cardHeaderGradientColorChange, setCardHeaderGradientColorChange] = useState('');
    const handleGradientColorChangeCardHeader = (event) => {
        const newColor = event.target.value;
        setCardHeaderGradientColorChange(newColor);
    };
    const [selectedOpacityCardHeader, setSelectedOpacityCardHeader] = useState('');

    const handleCardHeaderOpacityChange = (event) => {
        const newColor = event.target.value;
        setSelectedOpacityCardHeader(newColor);
    };




    //Body Card Header End


    //  Body content Start


    const [bodyTextColour, setBodyTextColour] = useState(null);
    const handleBodyTextColorChange = (event) => {
        const newColor = event.target.value;
        setBodyTextColour(newColor);
        localStorage.setItem('bodyTextColour', bodyTextColour)
    };


    const [bodyBgChange, setBodyBgChange] = useState('');
    const handleBodyBgChange = (event) => {
        const newColor = event.target.value;
        setBodyBgChange(newColor);
        localStorage.setItem('bodyBgChange', bodyBgChange)

    };


    const [bodyGradientDirectionChange, setBodyGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeBody = (event) => {
        const newColor = event.target.value;
        setBodyGradientDirectionChange(newColor);
    };

    const [bodyGradientColorChange, setBodyGradientColorChange] = useState('');
    const handleGradientColorChangeBody = (event) => {
        const newColor = event.target.value;
        setBodyGradientColorChange(newColor);
    };
    const [selectedOpacityBody, setSelectedOpacityBody] = useState('');

    const handleBodyOpacityChange = (event) => {
        const newColor = event.target.value;
        setSelectedOpacityBody(newColor);

    };

    //  Body content end



    //  Main Body Start

    const [mainBodyTextColour, setMainBodyTextColour] = useState(null);
    const handleMainBodyTextColorChange = (event) => {
        const newColor = event.target.value;
        setMainBodyTextColour(newColor);

    };


    const [mainBodyBgChange, setMainBodyBgChange] = useState('');
    const handleMainBodyBgChange = (event) => {
        const newColor = event.target.value;
        setMainBodyBgChange(newColor);
    };


    const [mainBodyGradientDirectionChange, setMainBodyGradientDirectionChange] = useState('');
    const handleGradientDirectionChangeMainBody = (event) => {
        const newColor = event.target.value;
        setMainBodyGradientDirectionChange(newColor);
    };

    const [mainBodyGradientColorChange, setMainBodyGradientColorChange] = useState('');
    const handleGradientColorChangeMainBody = (event) => {
        const newColor = event.target.value;
        setMainBodyGradientColorChange(newColor);
    };
    const [selectedOpacityMainBody, setSelectedOpacityMainBody] = useState('');

    const handleMainBodyOpacityChange = (event) => {
        const newColor = event.target.value;
        setSelectedOpacityMainBody(newColor);
    };





    //  Main Body End

    // Project Name colour start

    const [projectNameColour, setProjectNameColour] = useState(null);
    const handleProjectsNameColourChange = (event) => {
        const newColor = event.target.value;
        setProjectNameColour(newColor);

    };


    // Project Name colour end




    const formatString = (str) => {
        const words = str.split('_');

        const formattedWords = words.map((word) => {
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return formattedWords.join(' ');
    };

    const { data: userss = [] } = useQuery({
        queryKey: ['userss'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
            const data = await res.json();
            return data;
        },
    });

    const page_group = localStorage.getItem('pageGroup');

    const filterUser = userss.filter(u => u.page_group === page_group)

    console.log(filterUser[0]?.controllers)

    const pageGroupNav = filterUser[0]?.controllers

    const [status, setStatus] = useState(false)
    const handleToggle = () => {
        setStatus((current) => !current);
    };

    const hexToRgba = (hex, alpha) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex?.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const rgba = result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;

        return rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})` : null;
    };
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex?.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const rgb = result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;

        return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : null;
    };

    const rgbaColor = hexToRgba(HeaderBgChange);

    const userId = sessionStorage.getItem('userId')
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        // const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day}/${hours}/${minutes}`;
    }



    const bg_header = (adminPanelSettingsEdit[0]?.bg_header?.split(','))
    const bg_sub_header = (adminPanelSettingsEdit[0]?.bg_sub_header?.split(','))
    const bg_card_body = (adminPanelSettingsEdit[0]?.bg_card_body?.split(','))
    const bg_sidebar = (adminPanelSettingsEdit[0]?.bg_sidebar?.split(','))
    const bg_left_menu_one = (adminPanelSettingsEdit[0]?.bg_left_menu_one?.split(','))
    const bg_left_menu_two = (adminPanelSettingsEdit[0]?.bg_left_menu_two?.split(','))
    const bg_left_menu_three = (adminPanelSettingsEdit[0]?.bg_left_menu_three?.split(','))
    const bg_body_content = (adminPanelSettingsEdit[0]?.bg_body_content?.split(','))
    const bg_body = (adminPanelSettingsEdit[0]?.bg_body?.split(','))
    const bg_card_header = (adminPanelSettingsEdit[0]?.bg_card_header?.split(','))
    console.log(bg_body?.slice(2, 3), bg_body)


    const bg_headers = (adminPanelSettingsEdit[0]?.bg_header?.split(','))
    const value = bg_headers?.slice(0, 1)
    console.log(parseFloat(value))

    //     const hexToRgbas = (hex, alpha) => {
    //         if (hex && typeof hex === 'string') {
    //           const hexValue = hex.replace(/^#/, '');
    //           const bigint = parseInt(hexValue, 16);
    //           const r = (bigint >> 16) & 255;
    //           const g = (bigint >> 8) & 255;
    //           const b = bigint & 255;
    //           const a = alpha !== undefined ? alpha : 1;

    //           return `rgba(${r}, ${g}, ${b}, ${a})`;
    //         } else {
    //           console.error('Invalid hex value');
    //           return ''; // Or some default value, depending on your use case
    //         }
    //       };

    //       // Example usage
    // // Replace this with your hex color value
    //       const datas = hexToRgbas(`${bg_headers?.slice(0, 1)}`, 'values');



    //   const filePath = `/image/${getCurrentDateTime()}_${selectedFile.name}`;
    const handleSubmit = async (event) => {

        event.preventDefault()
        const form = event.target
        // const fileInput1 = form.fileInput1.files[0];
        const left_menu = form.left_menu.value
        const admin_settings_name = form.admin_settings_name.value
        const login_template = form.login_template.value
        const header_background_color_one = form.header_background_color_one.value
        const header_background_color_two = form.header_background_color_two.value
        const header_text_color = form.header_text_color.value
        const bg_header_position = form.bg_header_position.value
        const bg_header_opacity = form.bg_header_opacity.value
        const sub_header_bg_color_one = form.sub_header_bg_color_one.value
        const sub_header_bg_color_two = form.sub_header_bg_color_two.value
        const bg_sub_header_position = form.bg_sub_header_position.value
        const bg_sub_header_opacity = form.bg_sub_header_opacity.value
        const sub_header_controller_text_color = form.sub_header_controller_text_color.value
        const sub_header_options_text_color = form.sub_header_options_text_color.value
        const bg_card_body_one = form.bg_card_body_one.value
        const bg_card_body_two = form.bg_card_body_two.value
        const bg_card_body_position = form.bg_card_body_position.value
        const bg_card_body_opacity = form.bg_card_body_opacity.value
        const card_body_text = form.card_body_text.value
        const side_menu_position = form.side_menu_position.value
        const side_bar_bg_one = form.side_bar_bg_one.value
        const side_bar_bg_two = form.side_bar_bg_two.value
        const bg_side_bar_position = form.bg_side_bar_position.value
        const bg_side_bar_opacity = form.bg_side_bar_opacity.value
        const left_menu_level_one_bg_one = form.left_menu_level_one_bg_one.value
        const left_menu_level_one_bg_two = form.left_menu_level_one_bg_two.value
        const bg_left_menu_level_one_position = form.bg_left_menu_level_one_position.value
        const bg_left_menu_level_one_opacity = form.bg_left_menu_level_one_opacity.value
        const left_menu_level_one_text_color = form.left_menu_level_one_text_color.value
        const left_menu_level_one_border_color = form.left_menu_level_one_border_color.value
        const left_menu_level_two_bg_one = form.left_menu_level_two_bg_one.value
        const left_menu_level_two_bg_two = form.left_menu_level_two_bg_two.value
        const bg_left_menu_level_two_position = form.bg_left_menu_level_two_position.value
        const bg_left_menu_level_two_opacity = form.bg_left_menu_level_two_opacity.value
        const left_menu_level_two_text_color = form.left_menu_level_two_text_color.value
        const left_menu_level_two_border_color = form.left_menu_level_two_border_color.value
        const left_menu_level_three_bg_one = form.left_menu_level_three_bg_one.value
        const left_menu_level_three_bg_two = form.left_menu_level_three_bg_two.value
        const bg_left_menu_level_three_position = form.bg_left_menu_level_three_position.value
        const bg_left_menu_level_three_opacity = form.bg_left_menu_level_three_opacity.value
        const left_menu_level_three_text_color = form.left_menu_level_three_text_color.value
        const left_menu_level_three_border_color = form.left_menu_level_three_border_color.value
        const body_content_bg_color_one = form.body_content_bg_color_one.value
        const body_content_bg_color_two = form.body_content_bg_color_two.value
        const bg_body_content_position = form.bg_body_content_position.value
        const bg_body_content_opacity = form.bg_body_content_opacity.value
        // const body_content_bg_image1 = form.body_content_bg_image1.value
        const body_content_text_color = form.body_content_text_color.value
        const body_bg_color_one = form.body_bg_color_one.value
        const body_bg_color_two = form.body_bg_color_two.value
        const bg_body_position = form.bg_body_position.value
        const bg_body_opacity = form.bg_body_opacity.value
        // const body_bg_image2 = form.body_bg_image2.value
        const body_text_color = form.body_text_color.value
        const card_header_bg_color_one = form.card_header_bg_color_one.value
        const card_header_bg_color_two = form.card_header_bg_color_two.value
        const bg_card_header_position = form.bg_card_header_position.value
        const bg_card_header_opacity = form.bg_card_header_opacity.value
        // const card_header_bg_image3 = form.card_header_bg_image3.value
        const card_header_text_color_one = form.card_header_text_color_one.value
        const project_name_color = form.project_name_color.value
        const status = form.status.value
        const sub_header_pg_text_color = form.sub_header_pg_text_color.value



        const adminPageListSettings = {
            // file: fileInput1,
            created_by: userId,
            left_menu: left_menu,
            admin_panel_name: admin_settings_name,
            login_template_name: login_template,
            student_fee_invoice: 0,
            version_code: 3,
            bg_header: `${header_background_color_one},${header_background_color_two},${bg_header_position},${bg_header_opacity}`,
            color_header: header_text_color,

            bg_sub_header: `${sub_header_bg_color_one},${sub_header_bg_color_two},${bg_sub_header_position},${bg_sub_header_opacity}`,
            color_sub_header: sub_header_controller_text_color,
            options_color_sub_header: sub_header_options_text_color,
            sub_header_pg_text_color: sub_header_pg_text_color,


            bg_card_body: `${bg_card_body_one},${bg_card_body_two},${bg_card_body_position},${bg_card_body_opacity}`,
            color_card_body: card_body_text,


            side_menu_position: side_menu_position,


            bg_sidebar: `${side_bar_bg_one},${side_bar_bg_two},${bg_side_bar_position},${bg_side_bar_opacity}`,

            bg_left_menu_one: `${left_menu_level_one_bg_one},${left_menu_level_one_bg_two},${bg_left_menu_level_one_position},${bg_left_menu_level_one_opacity}`,
            color_left_menu_one: left_menu_level_one_text_color,
            border_left_menu_one: left_menu_level_one_border_color,

            bg_left_menu_two: `${left_menu_level_two_bg_one},${left_menu_level_two_bg_two},${bg_left_menu_level_two_position},${bg_left_menu_level_two_opacity}`,
            color_left_menu_two: left_menu_level_two_text_color,
            border_left_menu_two: left_menu_level_two_border_color,

            bg_left_menu_three: `${left_menu_level_three_bg_one},${left_menu_level_three_bg_two},${bg_left_menu_level_three_position},${bg_left_menu_level_three_opacity}`,
            color_left_menu_three: left_menu_level_three_text_color,
            border_left_menu_three: left_menu_level_three_border_color,

            bg_body_content: `${body_content_bg_color_one},${body_content_bg_color_two},${bg_body_content_position},${bg_body_content_opacity},${`image/files/${getCurrentDateTime()}/${contentBgImage ? contentBgImage.name : ''}`}`,
            bg_body_content_status: 1,
            color_body_content: body_content_text_color,

            bg_body: `${body_bg_color_one},${body_bg_color_two},${bg_body_position},${bg_body_opacity},${`image/files/${getCurrentDateTime()}/${bodyBgImage ? bodyBgImage.name : ''}`}`,
            color_body: body_text_color,
            bg_body_status: 1,

            bg_card_header: `${card_header_bg_color_one},${card_header_bg_color_two},${bg_card_header_position},${bg_card_header_opacity},${`image/files/${getCurrentDateTime()}/${selectedFile ? selectedFile.name : ''}`}`,



            bg_card_header_status: 1,
            color_card_header: card_header_text_color_one,

            project_name_color: project_name_color,
            status: status,
            admin_template: '',

            css: `

			
 
			.header_background_color{background:linear-gradient(${headerGradientDirectionChange ? headerGradientDirectionChange : `${bg_headers?.slice(2, 3)}`}, ${hexToRgba(HeaderBgChange ? HeaderBgChange : `${bg_headers?.slice(0, 1)}`, selectedOpacityHeader ? selectedOpacityHeader : `${bg_headers?.slice(3, 4)}`)}, ${hexToRgba(headerGradientColorChange ? headerGradientColorChange : `${bg_headers?.slice(1, 2)}`, selectedOpacityHeader ? selectedOpacityHeader : `${bg_headers?.slice(3, 4)}`)})!important}

			.sub_header_background_color{background:linear-gradient(${subHeaderGradientDirectionChange ? subHeaderGradientDirectionChange : `${bg_sub_header?.slice(2, 3)}`}, ${hexToRgba(subHeaderBgChange ? subHeaderBgChange : `${bg_sub_header?.slice(0, 1)}`, selectedOpacitySubHeader ? selectedOpacitySubHeader : `${bg_sub_header?.slice(3, 4)}`)}, ${hexToRgba(subHeaderGradientColorChange ? subHeaderGradientColorChange : `${bg_sub_header?.slice(1, 2)}`, selectedOpacitySubHeader ? selectedOpacitySubHeader : `${bg_sub_header?.slice(3, 4)}`)})!important}

            
			.bg_card_body{background:linear-gradient(${gradientDirectionCardBody ? gradientDirectionCardBody : `${bg_card_body?.slice(2, 3)}`}, ${hexToRgba(cardBodyBg ? cardBodyBg : `${bg_card_body?.slice(0, 1)}`, selectedOpacityCardBg ? selectedOpacityCardBg : `${bg_card_body?.slice(3, 4)}`)}, ${hexToRgba(gradientColorCardBody ? gradientColorCardBody : `${bg_card_body?.slice(1, 2)}`, selectedOpacityCardBg ? selectedOpacityCardBg : `${bg_card_body?.slice(3, 4)}`)})!important}


			.side_menu_bg{background:linear-gradient(${selectedGradientDirection ? selectedGradientDirection :   `${bg_sidebar?.slice(2,3)}`}, ${hexToRgba(backgroundColor ? backgroundColor : `${bg_sidebar?.slice(0,1)}`, selectedOpacity ? selectedOpacity : `${bg_sidebar?.slice(3,4)}` )}, ${hexToRgba(selectedGradientColor ? selectedGradientColor : `${bg_sidebar?.slice(1,2)}` , selectedOpacity ? selectedOpacity : `${bg_sidebar?.slice(3,4)}`)})!important}

			.side_menu_l1_bg{background:linear-gradient(${levelOneGradientDirectionChange ? levelOneGradientDirectionChange : `${bg_left_menu_one?.slice(2,3)}` }, ${hexToRgba(levelOneBgChange ? levelOneBgChange : `${bg_left_menu_one?.slice(0,1)}`, selectedOpacityLevelOne ? selectedOpacityLevelOne : `${bg_left_menu_one?.slice(3,4)}`)}, ${hexToRgba(levelOneGradientColorChange ? levelOneGradientColorChange : `${bg_left_menu_one?.slice(1,2)}` , selectedOpacityLevelOne ? selectedOpacityLevelOne :  `${bg_left_menu_one?.slice(3,4)}` )})!important;

			border-bottom:  1px solid ${hexToRgb(levelOneBorderChange ? levelOneBorderChange : adminPanelSettingsEdit[0]?.border_left_menu_one )}!important;
		    }
         

			.side_menu_l2_bg{background:linear-gradient(${levelTwoGradientDirectionChange ? levelTwoGradientDirectionChange : `${bg_left_menu_two?.slice(2,3)}` }, ${hexToRgba(levelTwoBgChange ? levelTwoBgChange : `${bg_left_menu_two?.slice(0,1)}`, selectedOpacityLevelTwo ? selectedOpacityLevelTwo : `${bg_left_menu_two?.slice(3,4)}`)}, ${hexToRgba(levelTwoGradientColorChange ? levelTwoGradientColorChange : `${bg_left_menu_two?.slice(1,2)}` , selectedOpacityLevelTwo ? selectedOpacityLevelTwo : `${bg_left_menu_two?.slice(3,4)}` )})!important;

			border-bottom:  1px solid ${hexToRgb(levelTwoBorderChange ? levelTwoBorderChange :  adminPanelSettingsEdit[0]?.border_left_menu_two)}!important;
		    }

			.side_menu_l3_bg{background:linear-gradient(${levelThreeGradientDirectionChange ? levelThreeGradientDirectionChange : `${bg_left_menu_three?.slice(2,3)}`}, ${hexToRgba(levelThreeBgChange ? levelThreeBgChange :  `${bg_left_menu_three?.slice(0,1)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)}, ${hexToRgba(levelThreeGradientColorChange ? levelThreeGradientColorChange : `${bg_left_menu_three?.slice(1,2)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)})!important;

			border-bottom:  1px solid ${hexToRgb(levelThreeBorderChange ? levelThreeBorderChange : adminPanelSettingsEdit[0]?.border_left_menu_three)}!important;
		    }


			.body_content_bg{
			background:linear-gradient(${bodyGradientDirectionChange ? bodyGradientDirectionChange :  `${bg_body_content?.slice(2,3)}`}, ${hexToRgba(bodyBgChange ? bodyBgChange :  `${bg_body_content?.slice(0,1)}`  , selectedOpacityBody ? selectedOpacityBody : `${bg_body_content?.slice(3,4)}`)}, ${hexToRgba(bodyGradientColorChange ? bodyGradientColorChange : `${bg_body_content?.slice(1,2)}`, selectedOpacityBody  ? selectedOpacityBody : `${bg_body_content?.slice(3,4)}`)}),
			 url('${`${contentBgImage ? `image/files/${getCurrentDateTime()}${contentBgImage.name}` : ''}`}')!important;

		     }

			.body_bg{
			
			background:linear-gradient(${mainBodyGradientDirectionChange ? mainBodyGradientDirectionChange : `${bg_body?.slice(2,3)}` }, ${hexToRgba(mainBodyBgChange ? mainBodyBgChange : `${bg_body?.slice(0,1)}`, selectedOpacityMainBody ? selectedOpacityMainBody :  `${bg_body?.slice(3,4)}`)}, ${hexToRgba(mainBodyGradientColorChange ? mainBodyGradientColorChange : `${bg_body?.slice(1,2)}`, selectedOpacityMainBody ? selectedOpacityMainBody :  `${bg_body?.slice(3,4)}`)}),
		
			 url('${`${bodyBgImage ? `image/files/${getCurrentDateTime()}${bodyBgImage.name}` : ''}`}')!important;

		    }

			.card_header_bg{
					
			  background:linear-gradient(${cardHeaderGradientDirectionChange ? cardHeaderGradientDirectionChange :  `${bg_card_header?.slice(2,3)}`}, ${hexToRgba(cardHeaderBgChange ? cardHeaderBgChange : `${bg_card_header?.slice(0,1)}`, selectedOpacityCardHeader ? selectedOpacityCardHeader : `${bg_card_header?.slice(3,4)}`)}, ${hexToRgba(cardHeaderGradientColorChange ? cardHeaderGradientColorChange :  `${bg_card_header?.slice(1,2)}`, selectedOpacityCardHeader ? selectedOpacityCardHeader : `${bg_card_header?.slice(3,4)}`)}),
		
			  url('${`${selectedFile ? `image/files/${getCurrentDateTime()}${selectedFile.name}` : ''}`}')!important;

			 
		      }

              
			.header_color{color: ${hexToRgb(headerTextColor ? headerTextColor : adminPanelSettingsEdit[0]?.color_header)}!important}
			.card_header_color{color: ${hexToRgb(cardHeaderTextColor ? cardHeaderTextColor : adminPanelSettingsEdit[0]?.color_card_header)}!important}
			.body_color{color: ${hexToRgb(mainBodyTextColour ? mainBodyTextColour : adminPanelSettingsEdit[0]?.color_body)}!important}
		


			.sub_header_pg_text_color{color: ${hexToRgb(subHeaderPageGroupTextColor ? subHeaderPageGroupTextColor : adminPanelSettingsEdit[0]?.sub_header_pg_text_color )}!important}
			.sub_header_controller_text_color{color: ${hexToRgb(subHeaderControllerTextColor ? subHeaderControllerTextColor : adminPanelSettingsEdit[0]?.color_sub_header )}!important}
			.sub_header_options_text_color{color: ${hexToRgb(subHeaderOptionsTextColor ? subHeaderOptionsTextColor : adminPanelSettingsEdit[0]?.options_color_sub_header)}!important}
			.card_body_color{color: ${hexToRgb(cardBodyText ? cardBodyText : adminPanelSettingsEdit[0]?.color_card_body)}!important}
			.side_menu_l1_color{color: ${hexToRgb(textColor ? textColor : adminPanelSettingsEdit[0]?.color_left_menu_one)}!important}
			.side_menu_l2_color{color: ${hexToRgb(levelTwoTextColor ? levelTwoTextColor : adminPanelSettingsEdit[0]?.color_left_menu_two)}!important}
			.side_menu_l3_color{color: ${hexToRgb(levelThreeTextColor ? levelThreeTextColor : adminPanelSettingsEdit[0]?.color_left_menu_three)}!important}
			.body_content_color{color: ${hexToRgb(bodyTextColour ? bodyTextColour : adminPanelSettingsEdit[0]?.color_body_content )}!important}
			.card_header_color{color: ${hexToRgb(cardHeaderTextColor ? cardHeaderTextColor : adminPanelSettingsEdit[0]?.color_card_header)}!important}
			.project_name_color{color: ${hexToRgb(projectNameColour ? projectNameColour : adminPanelSettingsEdit[0]?.project_name_color)}!important}


			` ,





        }
        // ${URL.createObjectURL(selectedFile)};

        console.log(adminPageListSettings)
        // ${process.env.NEXT_PUBLIC_API_URL}/admin/create_side_menu
        // http://192.168.0.110:5002/submit-form
        // http://192.168.0.110:5002/admin/create_side_menu
        fetch(` ${process.env.NEXT_PUBLIC_API_URL}/admin/create_side_menu`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminPageListSettings)
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data);
                if (data.insertId) {

                    setError('')
                    Swal.fire({
                        title: 'Success!',
                        text: 'admin data post Successful !!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                }

            })



    }


    const [selectedPosition, setSelectedPosition] = useState('');

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };
    console.log(selectedPosition)

    const [selectedLoginTemplate, setSelectedLoginTemplate] = useState('');

    const loginTemplate = (event) => {
        setSelectedLoginTemplate(event.target.value);
    };
    console.log(selectedLoginTemplate)


    console.log(adminPanelSettingsEdit[0]?.bg_header)

    const hex = hexToRgb(adminPanelSettingsEdit[0]?.bg_body.slice(0, 7))















    const datasColor = adminPanelSettingsEdit[0]?.bg_body.slice(0, 7)
    console.log(adminPanelSettingsEdit[0]?.bg_body.slice(0, 7), 'adminPanelSettingsEdit[0].bg_body')
    console.log(adminPanelSettingsEdit[0], 'adminPanelSettingsEdit[0].bg_body')
    console.log(adminPanelSettingsEdit[0]?.bg_body.slice(29, 32), 'adminPanelSettingsEdit[0].bg_body')
    // npm run dev -- -H 192.168.0.112


    return (
        <div className='col-md-12 bg-light p-4 body-content' >
            <div className='   border-primary shadow-sm border-0' >
                <div class="card-header  custom-card-header py-1  clearfix  bg-gradient-primary border-0 text-white" style={{ background: 'linear-gradient(to right, rgba( 66,103,178,1 ), rgba( 66,103,178,1 ))' }}>
                    <h5 class="card-title font-weight-bold mb-0  float-left mt-1 card-header-color">Admin Panel Settings</h5>
                    <div class="card-title font-weight-bold mb-0 float-right">
                        <Link href="/Admin/admin_panel_settings/admin_panel_settings_all" class="btn btn-sm btn-info">Back to Admin panel settings List</Link>
                    </div>
                </div>
                <div className=' card-body'>
                    <div class="alert alert-warning mb-0 mx-4 mt-4 text-danger font-weight-bold" role="alert">
                        (<small><sup><i class="text-danger fas fa-star"></i></sup></small>) field required
                    </div>

                    <form action="" onSubmit={handleSubmit}>
                        <div className=' mt-4 '>

                            <div class="form-group row px-4">
                                <label class="control-label font-weight-bold col-md-3">Left Menu:</label>

                                <div class="col-md-6">
                                    {/* <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" name="left_menu" id="customSwitch1" value={status}
                                        onClick={handleToggle} />
                                    <label class="custom-control-label font-weight-bold" for="customSwitch1">Single Menu</label>
                                </div> */}
                                    <div className="custom-control custom-switch">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            name="left_menu"
                                            id="customSwitch1"

                                            value={status ? 1 : 0}

                                            onClick={handleToggle}
                                        />
                                        <label className="custom-control-label font-weight-bold" htmlFor="customSwitch1">
                                            Single Menu
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div class="form-group row px-4">
                                <label class="control-label font-weight-bold col-md-3">Admin Settings Name:</label>
                                <div class="col-md-6">
                                    <div class="input-group input-group-sm mb-3">

                                        <input type="text" class="form-control form-control-sm unique_admin_panel_name" name="admin_settings_name" defaultValue={adminPanelSettingsEdit[0]?.admin_panel_name} />

                                    </div>

                                    <p class="text-danger mb-0"></p>

                                </div>
                            </div>
                            <div class="form-group row px-4">
                                <label class="control-label font-weight-bold col-md-3">Login Template:</label>
                                <div class="col-md-4">
                                    <div class="input-group input-group-sm mb-3">


                                        <select required="" name="login_template" class="form-control form-control-sm custom-select trim integer_no_zero login_template" id="login_template" placeholder="Enter Expense Category"
                                        onChange={loginTemplate}
                                        
                                        defaultValue={selectedLoginTemplate ? selectedLoginTemplate :  adminPanelSettingsEdit[0]?.login_template_name }>

                                            <option value="1">Template 1</option>
                                            <option value="2">Template 2</option>
                                            <option value="3">Template 3</option>
                                            <option value="4">Template 4</option>
                                            <option value="5">Template 5</option>
                                            <option value="6">Template 6</option>
                                            <option value="7">Template 7</option>
                                            <option value="8">Template 8</option>
                                            <option value="9">Template 9</option>
                                            <option value="10">Template 10</option>
                                            <option value="11">Template 11</option>
                                            <option value="12">Template 12</option>
                                            <option value="13">Template 13</option>
                                            <option value="14">Template 14</option>
                                            <option value="15">Template 15</option>
                                            <option value="16">Template 16</option>
                                            <option value="17">Template 17</option>
                                            <option value="18">Template 18</option>
                                            <option value="19">Template 19</option>
                                            <option value="20">Template 20</option>
                                            <option value="21">Template 21</option>
                                            <option value="22">Template 22</option>
                                            <option value="23">Template 23</option>
                                            <option value="24">Template 24</option>
                                            <option value="25">Template 25</option>
                                            <option value="26">Template 26</option>
                                        </select>


                                        <div class="input-group-append">
                                            <label class="input-group-text p-0 " for="inputGroupSelect01">
                                                <a target="_blank" role="tooltip" title="Visit" class="text-white btn btn-dark btn-sm link" data-toggle="tooltip" data-placement="top"><FaEdit></FaEdit></a>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>




                            <div className='d-lg-flex d-md-flex col-md-12 border mb-2 py-2'>

                                <div className='col-md-6 '>

                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Header Background Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }}>
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=' '
                                                                    type="color"
                                                                    name="header_background_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_header?.slice(0, 1)}
                                                                    style={{ ...inputStyle, color: HeaderBgChange }}
                                                                    onChange={handleHeaderBgChange}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }}>
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input

                                                                    className=''
                                                                    type="color"
                                                                    name="header_background_color_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_header?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: headerGradientColorChange }}
                                                                    onChange={handleGradientColorChangeHeader}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_header_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeHeader}
                                                                value={headerGradientDirectionChange ? headerGradientDirectionChange : bg_header?.slice(2, 3)}
                                                            >
                                                                <option selected value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>
                                                        <div>

                                                            <select name="bg_header_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleHeaderOpacityChange} value={selectedOpacityHeader ? selectedOpacityHeader : bg_header?.slice(3, 4)}>
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>







                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Header Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend ">


                                                        <div className="sp-replacer sp-light border w-75" >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="header_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_header}
                                                                    style={{ ...inputStyle, color: headerTextColor }}
                                                                    onChange={handleHeaderColorChange}
                                                                />

                                                                ▼</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='col-md-6' >
                                    <nav className="navbar navbar-expand-lg mb-0"
                                        style={{ background: `linear-gradient(${headerGradientDirectionChange ? headerGradientDirectionChange : `${bg_headers?.slice(2, 3)}`}, ${hexToRgba(HeaderBgChange ? HeaderBgChange : `${bg_headers?.slice(0, 1)}`, selectedOpacityHeader ? selectedOpacityHeader : `${bg_headers?.slice(3, 4)}`)}, ${hexToRgba(headerGradientColorChange ? headerGradientColorChange : `${bg_headers?.slice(1, 2)}`, selectedOpacityHeader ? selectedOpacityHeader : `${bg_headers?.slice(3, 4)}`)})` }}


                                    // style={{ background: `linear-gradient(${headerGradientDirectionChange ? headerGradientDirectionChange : bg_header?.slice(2, 3)}, ${HeaderBgChange ? HeaderBgChange : bg_header?.slice(0, 1)} ,  ${headerGradientColorChange ? headerGradientColorChange : bg_header?.slice(1, 2)})`, opacity: selectedOpacityHeader ? selectedOpacityHeader : bg_header?.slice(3,4) }}



                                    >
                                        <div className="container-fluid ">

                                            <div className='d-flex gap-3 mt-3'>
                                                <div >
                                                    <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""
                                                        width='40'
                                                    />
                                                </div>
                                                <div style={{ marginTop: '-8px', marginLeft: '10px' }}>
                                                    <h4 className='header-tag' style={{ color: headerTextColor ? headerTextColor : adminPanelSettingsEdit[0]?.color_header }}>Pathshala School & College
                                                    </h4>
                                                    <p style={{ marginTop: '-5px' }}><strong>College Management System</strong></p>
                                                </div>
                                            </div>


                                            <div >


                                                <div className='header-right mb-lg-0 mb-3 w-full'>
                                                    <ul className="nav justify-content-center">
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 ">
                                                            <a className="nav-link text-success">
                                                                <FontAwesomeIcon icon={faCog} className="zt-1" />
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-3">
                                                            <a className="nav-link text-danger" href="#">
                                                                <FontAwesomeIcon icon={faCommentDots}
                                                                    className="zt-1 blink_me" />

                                                                <span className=" iconBotton badge badge-danger badge-pill position-absolute bg-danger">0</span>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle">
                                                            <a className="nav-link text-secondary" href="#">
                                                                <FontAwesomeIcon icon={faBell} className="zt-1 swingimage" />
                                                                <span className="iconBotton badge badge-danger badge-pill  position-absolute bg-danger mb-5">0</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className='d-lg-flex d-md-flex col-md-12 border mb-2 py-2'>

                                <div className='col-md-6 '>

                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Sub Header Background Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="sub_header_bg_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_sub_header?.slice(0, 1)}
                                                                    style={{ ...inputStyle, color: subHeaderBgChange }}
                                                                    onChange={handleSubHeaderBgChange}
                                                                />

                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input

                                                                    className=''
                                                                    type="color"
                                                                    name="sub_header_bg_color_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_sub_header?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: subHeaderGradientColorChange }}
                                                                    onChange={handleGradientColorChangeSubHeader}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_sub_header_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeSubHeader}
                                                                value={subHeaderGradientDirectionChange ? subHeaderGradientDirectionChange : bg_sub_header?.slice(2, 3)}
                                                            >
                                                                <option selected value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>
                                                        <div>

                                                            <select name="bg_sub_header_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleSubHeaderOpacityChange} value={selectedOpacitySubHeader ? selectedOpacitySubHeader : bg_sub_header?.slice(3, 4)}>
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>







                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Sub Header Page Group Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="sub_header_pg_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.sub_header_pg_text_color}

                                                                    style={{ ...inputStyle, color: subHeaderPageGroupTextColor }}
                                                                    onChange={handleSubHeaderGroupTextColorChange}
                                                                />


                                                                ▼</div>
                                                        </div>







                                                    </div>







                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Sub Header Controller Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="sub_header_controller_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_sub_header}
                                                                    style={{ ...inputStyle, color: subHeaderControllerTextColor }}
                                                                    onChange={handleSubHeaderControllerTextColorChange}
                                                                />


                                                                ▼</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Sub Header Options Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="sub_header_options_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.options_color_sub_header}
                                                                    style={{ ...inputStyle, color: subHeaderOptionsTextColor }}
                                                                    onChange={handleSubHeaderOptionsTextColorChange}
                                                                />
                                                                ▼</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='col-md-6' >

                                    <nav className=" navbar navbar-expand mb-0 navbar-light bg-light"
                                    
                                    // style={{ background: `linear-gradient(${subHeaderGradientDirectionChange ? subHeaderGradientDirectionChange : bg_sub_header?.slice(2, 3)}, ${subHeaderBgChange ? subHeaderBgChange : bg_sub_header?.slice(0, 1)} ,  ${subHeaderGradientColorChange ? subHeaderGradientColorChange : bg_sub_header?.slice(1, 2)})`, opacity: selectedOpacitySubHeader }}
                                    style={{background:`linear-gradient(${subHeaderGradientDirectionChange ? subHeaderGradientDirectionChange : `${bg_sub_header?.slice(2, 3)}`}, ${hexToRgba(subHeaderBgChange ? subHeaderBgChange : `${bg_sub_header?.slice(0, 1)}`, selectedOpacitySubHeader ? selectedOpacitySubHeader : `${bg_sub_header?.slice(3, 4)}`)}, ${hexToRgba(subHeaderGradientColorChange ? subHeaderGradientColorChange : `${bg_sub_header?.slice(1, 2)}`, selectedOpacitySubHeader ? selectedOpacitySubHeader : `${bg_sub_header?.slice(3, 4)}`)})`}}
                                    
                                    >
                                        <div className="container-fluid" >
                                            <Link className="navbar-brand  text-primary" href="">
                                                <p style={{ color: subHeaderPageGroupTextColor ? subHeaderPageGroupTextColor : adminPanelSettingsEdit[0]?.sub_header_pg_text_color }}>{(page_group)}</p>
                                            </Link>

                                            <div className="collapse navbar-collapse " id="customNavbarCollapse">
                                                <ul class=" nav navbar-nav ml-auto">
                                                    {
                                                        pageGroupNav?.slice(0, 5).map(page =>
                                                            <>
                                                                <div class=" ml-0 dropdown" >

                                                                    <li className="nav-item active">
                                                                        <Link className="nav-link" href="" style={{ color: subHeaderControllerTextColor ? subHeaderControllerTextColor : adminPanelSettingsEdit[0]?.color_sub_header }}>{formatString(page?.controller_name)}

                                                                            <FaCaretDown></FaCaretDown>
                                                                        </Link>
                                                                    </li>
                                                                    <ul class="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
                                                                        {
                                                                            page.display_names.map(displayNames =>

                                                                                <>

                                                                                    <li><a

                                                                                        style={{ color: subHeaderOptionsTextColor ? subHeaderOptionsTextColor : adminPanelSettingsEdit[0]?.options_color_sub_header }}
                                                                                        class="dropdown-item" href='#'>{displayNames.display_name}

                                                                                    </a></li>
                                                                                </>
                                                                            )
                                                                        }

                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )}

                                                </ul>

                                            </div>
                                        </div>
                                    </nav>

                                </div>
                            </div>


                            <div className='d-lg-flex d-md-flex col-md-12 border mb-2 py-2'>
                                <div className='col-md-6'>

                                    <div className="form-group row ">
                                        <label className="control-label font-weight-bold col-md-5">Bg Card Body:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }}  >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="bg_card_body_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_card_body?.slice(0, 1)}
                                                                    style={{ ...inputStyle, color: cardBodyBg }}
                                                                    onChange={handleCardBodyBgChange}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input

                                                                    className=''
                                                                    type="color"
                                                                    name="bg_card_body_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_card_body?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: gradientColorCardBody }}
                                                                    onChange={handleGradientColorChangeCardBody}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_card_body_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeCardBody}
                                                                value={gradientDirectionCardBody ? gradientDirectionCardBody : bg_card_body?.slice(2, 3)}
                                                            >
                                                                <option value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <select name="bg_card_body_opacity" className="form-control form-control-sm bx-bgg-opacity"
                                                                onChange={handleCardBgOpacityChange} value={selectedOpacityCardBg ? selectedOpacityCardBg : bg_card_body?.slice(3, 4)}
                                                            >
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row ">
                                        <label className="control-label font-weight-bold col-md-5">Card Body Text:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border " style={{ width: '50px' }} >
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="card_body_text"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_card_body}
                                                                    style={{ ...inputStyle, color: cardBodyText }}
                                                                    onChange={handleCardBodyTextcolourChange}
                                                                />

                                                                ▼</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6 ">

                                    <div className=' p-3 border'




                                    >


                                        <div class="  h-100  mb-4 shadow-sm  " 
                                        
                                        // style={{ background: `linear-gradient(${gradientDirectionCardBody ? gradientDirectionCardBody : bg_card_body?.slice(2, 3)}, ${cardBodyBg ? cardBodyBg : bg_card_body?.slice(0, 1)}, ${gradientColorCardBody ? gradientColorCardBody : bg_card_body?.slice(1, 2)})`, opacity: selectedOpacityCardBg }}
                                        style={{background:`linear-gradient(${gradientDirectionCardBody ? gradientDirectionCardBody : `${bg_card_body?.slice(2, 3)}`}, ${hexToRgba(cardBodyBg ? cardBodyBg : `${bg_card_body?.slice(0, 1)}`, selectedOpacityCardBg ? selectedOpacityCardBg : `${bg_card_body?.slice(3, 4)}`)}, ${hexToRgba(gradientColorCardBody ? gradientColorCardBody : `${bg_card_body?.slice(1, 2)}`, selectedOpacityCardBg ? selectedOpacityCardBg : `${bg_card_body?.slice(3, 4)}`)})`}}
                                        
                                        
                                        >
                                            <div class="card-body p-2 d-flex justify-content-between align-items-center" style={{ color: cardBodyText ? cardBodyText : adminPanelSettingsEdit[0]?.color_card_body }}>
                                                {/* defaultValue={adminPanelSettingsEdit[0]?.color_card_body} */}

                                                <div class="col-4 align-self-center rounded-circle float-left">
                                                    <div class="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                                                        <h5 class="card-title text-center align-middle text-info m-0 bg-light rounded-circle  p-1"><FaUserGraduate></FaUserGraduate></h5>
                                                    </div>
                                                </div>
                                                <div class="col-8  float-right p-0">
                                                    <h2 class="card-title  mb-0 text-right">182</h2>
                                                    <h6 class="card-title  m-0 text-right">Total Student</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            {/* left side menu start */}
                            <div className='border  col-md-12 mb-2  py-2'>


                                <div className='d-flex '>
                                    <div className='col-md-6'>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Side Menu Position:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div>
                                                                <select name="side_menu_position" className="form-control form-control-sm bx-bgg-dir"

                                                                    onChange={handlePositionChange} value={selectedPosition ? selectedPosition : adminPanelSettingsEdit[0]?.side_menu_position}
                                                                >

                                                                    <option value="top">Top</option>
                                                                    <option value="bottom">Bottom</option>
                                                                    <option value="left">Left</option>
                                                                    <option value="right">Right</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-md-6 border mb-3' style={{ width: '400px', height: '200px' }}>
                                        <div class="card-title font-weight-bold mb-0 float-right mt-2 "

                                            style={{
                                                position: 'absolute',
                                                top: selectedPosition === 'top' ? 0 : adminPanelSettingsEdit[0]?.side_menu_position === 'top' && 0,
                                                bottom: selectedPosition === 'bottom' ? 0 : adminPanelSettingsEdit[0]?.side_menu_position === 'bottom' && 0,
                                                left: selectedPosition === 'left' ? 0 : adminPanelSettingsEdit[0]?.side_menu_position === 'left' && 0,
                                                right: selectedPosition === 'right' ? 0 : adminPanelSettingsEdit[0]?.side_menu_position === 'right' && 0,
                                            }}
                                        >
                                            <a href="https://atik.urbanitsolution.com/Admin/admin_panel_settings/admin_panel_settings_all?page_group=system_setup" class="btn btn-sm btn-info mb-2 " >Back to Admin panel List</a>
                                        </div>
                                    </div>
                                </div>




                                <div className='d-lg-flex d-md-flex col-md-12 mb-2 py-2'>
                                    <div className='col-md-6'>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Sidebar Background:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15 "  >
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="side_bar_bg_one"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_sidebar?.slice(0, 1)}
                                                                        style={{ ...inputStyle, color: backgroundColor }}
                                                                        onChange={handleColorChange}

                                                                    />
                                                                    {/* <input
                                    className=''
                                    type="color"
                                    name="colorPicker"
                                    id="colorPicker"
                                    style={inputStyle}
                                /> */}


                                                                    ▼</div>
                                                            </div>

                                                            <div className="sp-replacer sp-light border w-15" >
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="side_bar_bg_two"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_sidebar?.slice(1, 2)}
                                                                        style={{ ...inputStyle, color: selectedGradientColor }}
                                                                        onChange={handleGradientColorChange}
                                                                    />


                                                                    ▼</div>
                                                            </div>




                                                            <div>
                                                                <select name="bg_side_bar_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChange}
                                                                    value={selectedGradientDirection ? selectedGradientDirection : bg_sidebar?.slice(2, 3)}

                                                                >
                                                                    <option selected value="to right top">to right top</option>
                                                                    <option value="to right">to right</option>
                                                                    <option value="to right bottom">to right bottom</option>
                                                                    <option value="to bottom">to bottom</option>
                                                                    <option value="to left bottom">to left bottom</option>
                                                                    <option value="to left">to left</option>
                                                                    <option value="to left top">to left top</option>
                                                                    <option value="to top">to top</option>
                                                                    <option value="circle">circle</option>
                                                                    <option value="40deg">40deg</option>
                                                                    <option value="-225deg">-225deg</option>
                                                                    <option value="-20deg">-20deg</option>
                                                                    <option value="135deg">135deg</option>
                                                                    <option value="180deg">180deg</option>
                                                                </select>
                                                            </div>


                                                            <div>
                                                                {/* <select name="bg_header_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleOpacityChange} value={selectedOpacity}>

                                {Array.from({ length: 11 }, (_, index) => (index / 10).toFixed(1)).map(opacity => (
                                    <option key={opacity} value={opacity}>{opacity}</option>
                                ))}
                            </select> */}

                                                                <select name="bg_side_bar_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleOpacityChange} value={selectedOpacity ? selectedOpacity : bg_sidebar?.slice(3, 4)}>
                                                                    <option value="0">0</option>
                                                                    <option value="0.1">0.1</option>
                                                                    <option value="0.2">0.2</option>
                                                                    <option value="0.3">0.3</option>
                                                                    <option value="0.4">0.4</option>
                                                                    <option value="0.5">0.5</option>
                                                                    <option value="0.6">0.6</option>
                                                                    <option value="0.7">0.7</option>
                                                                    <option value="0.8">0.8</option>
                                                                    <option value="0.9">0.9</option>
                                                                    <option value="1">1</option>
                                                                </select>
                                                            </div>
                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level One:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15" >
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_one_bg_one"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_one?.slice(0, 1)}
                                                                        style={{ ...inputStyle, color: backgroundColor }}
                                                                        onChange={handleLevelOneBgChange}



                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_one_bg_two"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_one?.slice(1, 2)}
                                                                        style={{ ...inputStyle, color: levelOneGradientColorChange }}
                                                                        onChange={handleGradientColorChangeLevelOne}
                                                                    />


                                                                    ▼</div>
                                                            </div>




                                                            <div>
                                                                <select name="bg_left_menu_level_one_position" className="form-control form-control-sm bx-bgg-dir"
                                                                    onChange={handleGradientDirectionChangeLevelOne}

                                                                    value={levelOneGradientDirectionChange ? levelOneGradientDirectionChange : bg_left_menu_one?.slice(2, 3)}
                                                                >
                                                                    <option selected value="to right top">to right top</option>
                                                                    <option value="to right">to right</option>
                                                                    <option value="to right bottom">to right bottom</option>
                                                                    <option value="to bottom">to bottom</option>
                                                                    <option value="to left bottom">to left bottom</option>
                                                                    <option value="to left">to left</option>
                                                                    <option value="to left top">to left top</option>
                                                                    <option value="to top">to top</option>
                                                                    <option value="circle">circle</option>
                                                                    <option value="40deg">40deg</option>
                                                                    <option value="-225deg">-225deg</option>
                                                                    <option value="-20deg">-20deg</option>
                                                                    <option value="135deg">135deg</option>
                                                                    <option value="180deg">180deg</option>
                                                                </select>
                                                            </div>
                                                            <div>

                                                                <select name="bg_left_menu_level_one_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleLevelOneOpacityChange} value={selectedOpacityLevelOne ? selectedOpacityLevelOne : bg_left_menu_one?.slice(3, 4)}>
                                                                    <option selected value="0">0</option>
                                                                    <option value="0.1">0.1</option>
                                                                    <option value="0.2">0.2</option>
                                                                    <option value="0.3">0.3</option>
                                                                    <option value="0.4">0.4</option>
                                                                    <option value="0.5">0.5</option>
                                                                    <option value="0.6">0.6</option>
                                                                    <option value="0.7">0.7</option>
                                                                    <option value="0.8">0.8</option>
                                                                    <option value="0.9">0.9</option>
                                                                    <option value="1">1</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level One Text Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_one_text_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.color_left_menu_one}
                                                                        style={{ ...inputStyle, color: textColor }}
                                                                        onChange={handleTextColorChange}
                                                                    />


                                                                    ▼</div>
                                                            </div>
                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level One Border Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_one_border_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.border_left_menu_one}
                                                                        onChange={handleLevelOneBorderChange}
                                                                        style={{ ...inputStyle, borderColor: levelOneBorderChange }}

                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level Two:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_two_bg_one"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_two?.slice(0, 1)}
                                                                        onChange={handleLevelTwoBgChange}
                                                                        style={{ ...inputStyle, color: levelTwoBgChange }}
                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_two_bg_two"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_two?.slice(1, 2)}
                                                                        style={{ ...inputStyle, color: levelTwoGradientColorChange }}
                                                                        onChange={handleGradientColorChangeLevelTwo}
                                                                    />


                                                                    ▼</div>
                                                            </div>




                                                            <div>
                                                                <select name="bg_left_menu_level_two_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeLevelTwo}
                                                                    value={levelTwoGradientDirectionChange ? levelTwoGradientDirectionChange : bg_left_menu_two?.slice(2, 3)}
                                                                >
                                                                    <option selected value="to right top">to right top</option>
                                                                    <option value="to right">to right</option>
                                                                    <option value="to right bottom">to right bottom</option>
                                                                    <option value="to bottom">to bottom</option>
                                                                    <option value="to left bottom">to left bottom</option>
                                                                    <option value="to left">to left</option>
                                                                    <option value="to left top">to left top</option>
                                                                    <option value="to top">to top</option>
                                                                    <option value="circle">circle</option>
                                                                    <option value="40deg">40deg</option>
                                                                    <option value="-225deg">-225deg</option>
                                                                    <option value="-20deg">-20deg</option>
                                                                    <option value="135deg">135deg</option>
                                                                    <option value="180deg">180deg</option>
                                                                </select>
                                                            </div>
                                                            <div>

                                                                <select name="bg_left_menu_level_two_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleLevelTwoOpacityChange} value={selectedOpacityLevelTwo ? selectedOpacityLevelTwo : bg_left_menu_two?.slice(3, 4)}>
                                                                    <option selected value="0">0</option>
                                                                    <option value="0.1">0.1</option>
                                                                    <option value="0.2">0.2</option>
                                                                    <option value="0.3">0.3</option>
                                                                    <option value="0.4">0.4</option>
                                                                    <option value="0.5">0.5</option>
                                                                    <option value="0.6">0.6</option>
                                                                    <option value="0.7">0.7</option>
                                                                    <option value="0.8">0.8</option>
                                                                    <option value="0.9">0.9</option>
                                                                    <option value="1">1</option>
                                                                </select>
                                                            </div>
                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level Two Text Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_two_text_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.color_left_menu_two}
                                                                        onChange={handleLevelTwoTextColorChange}
                                                                        style={{ ...inputStyle, color: levelTwoTextColor }}
                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level Two Border Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_two_border_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.border_left_menu_two}
                                                                        onChange={handleLevelTwoBorderChange}
                                                                        style={{ ...inputStyle, borderColor: levelTwoBorderChange }}
                                                                    />

                                                                    ▼</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level Three:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_three_bg_one"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_three?.slice(0, 1)}
                                                                        onChange={handleLevelThreeBgChange}
                                                                        style={{ ...inputStyle, color: levelThreeBgChange }}
                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_three_bg_two"
                                                                        id="colorPicker"
                                                                        defaultValue={bg_left_menu_three?.slice(1, 2)}
                                                                        style={{ ...inputStyle, color: levelThreeGradientColorChange }}
                                                                        onChange={handleGradientColorChangeLevelThree}
                                                                    />


                                                                    ▼</div>
                                                            </div>




                                                            <div>
                                                                <select name="bg_left_menu_level_three_position" className="form-control form-control-sm bx-bgg-dir"
                                                                    value={levelThreeGradientDirectionChange ? levelThreeGradientDirectionChange : bg_left_menu_three?.slice(2, 3)}
                                                                    onChange={handleGradientDirectionChangeLevelThree}>
                                                                    <option selected value="to right top">to right top</option>
                                                                    <option value="to right">to right</option>
                                                                    <option value="to right bottom">to right bottom</option>
                                                                    <option value="to bottom">to bottom</option>
                                                                    <option value="to left bottom">to left bottom</option>
                                                                    <option value="to left">to left</option>
                                                                    <option value="to left top">to left top</option>
                                                                    <option value="to top">to top</option>
                                                                    <option value="circle">circle</option>
                                                                    <option value="40deg">40deg</option>
                                                                    <option value="-225deg">-225deg</option>
                                                                    <option value="-20deg">-20deg</option>
                                                                    <option value="135deg">135deg</option>
                                                                    <option value="180deg">180deg</option>
                                                                </select>
                                                            </div>
                                                            <div>

                                                                <select name="bg_left_menu_level_three_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleLevelThreeOpacityChange} value={selectedOpacityLevelThree ? selectedOpacityLevelThree : bg_left_menu_three?.slice(3, 4)}>
                                                                    <option selected value="0">0</option>
                                                                    <option value="0.1">0.1</option>
                                                                    <option value="0.2">0.2</option>
                                                                    <option value="0.3">0.3</option>
                                                                    <option value="0.4">0.4</option>
                                                                    <option value="0.5">0.5</option>
                                                                    <option value="0.6">0.6</option>
                                                                    <option value="0.7">0.7</option>
                                                                    <option value="0.8">0.8</option>
                                                                    <option value="0.9">0.9</option>
                                                                    <option value="1">1</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5">Left Menu Level Three Text Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_three_text_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.color_left_menu_three}
                                                                        onChange={handleLevelThreeTextColorChange}
                                                                        style={{ ...inputStyle, color: levelThreeTextColor }}
                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label font-weight-bold col-md-5 ">Left Menu Level Three Border Color:</label>
                                            <div className="col-md-7">
                                                <div className="form-check form-check-inline">
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">


                                                            <div className="sp-replacer sp-light border w-15">
                                                                <div className="sp-preview">
                                                                    <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                                </div>
                                                                <div className="sp-dd d-flex">
                                                                    <input
                                                                        className=''
                                                                        type="color"
                                                                        name="left_menu_level_three_border_color"
                                                                        id="colorPicker"
                                                                        defaultValue={adminPanelSettingsEdit[0]?.border_left_menu_three}
                                                                        onChange={handleLevelThreeBorderChange}
                                                                        style={{ ...inputStyle, borderColor: levelThreeBorderChange }}
                                                                    />


                                                                    ▼</div>
                                                            </div>

                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="   "
                                        // style={{ background: 'linear-gradient(to right top, rgba(210, 45, 45, 0.2), rgba(66, 103, 178, 0.2))'}}
                                        // style={{ background: `linear-gradient(${selectedGradientDirection ? selectedGradientDirection : bg_sidebar?.slice(2, 3)}, ${backgroundColor ? backgroundColor : bg_sidebar?.slice(0, 1)} ,  ${selectedGradientColor ? selectedGradientColor : bg_sidebar?.slice(1, 2)})`, opacity: selectedOpacity ? selectedOpacity : bg_sidebar?.slice(3, 4), width: '270px', height: '500px' }}

                                        style={{background:`linear-gradient(${selectedGradientDirection ? selectedGradientDirection :   `${bg_sidebar?.slice(2,3)}`}, ${hexToRgba(backgroundColor ? backgroundColor : `${bg_sidebar?.slice(0,1)}`, selectedOpacity ? selectedOpacity : `${bg_sidebar?.slice(3,4)}` )}, ${hexToRgba(selectedGradientColor ? selectedGradientColor : `${bg_sidebar?.slice(1,2)}` , selectedOpacity ? selectedOpacity : `${bg_sidebar?.slice(3,4)}`)})`, width: '270px', height: '500px' }}

                                    >

                                        <ul class="text-white  "    >
                                            <button class='dashboard'>
                                                <a class='' href='/Admin/dashboard'>Dashboard</a>
                                            </button>
                                            <li >
                                                <div class="dashboard-dropdown"  >
                                                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >
                                                        <div class="d-flex justify-content-between"

                                                            // style={{
                                                            //     background: `linear-gradient(${levelOneGradientDirectionChange ? levelOneGradientDirectionChange : bg_left_menu_one?.slice(2, 3)}, ${levelOneBgChange ? levelOneBgChange : bg_left_menu_one?.slice(0, 1)}, ${levelOneGradientColorChange ? levelOneGradientColorChange : bg_left_menu_one?.slice(1, 2)})`, opacity: selectedOpacityLevelOne ? selectedOpacityLevelOne : bg_left_menu_one?.slice(3, 4),

                                                            //     borderBottom: levelOneBorderChange ? `1px solid ${levelOneBorderChange}` : `1px solid${adminPanelSettingsEdit[0]?.border_left_menu_one}`,
                                                            // }}


                                                            style={{borderBottom: levelOneBorderChange ? `1px solid ${levelOneBorderChange}` : `1px solid${adminPanelSettingsEdit[0]?.border_left_menu_one}`,background:`linear-gradient(${levelOneGradientDirectionChange ? levelOneGradientDirectionChange : `${bg_left_menu_one?.slice(2,3)}` }, ${hexToRgba(levelOneBgChange ? levelOneBgChange : `${bg_left_menu_one?.slice(0,1)}`, selectedOpacityLevelOne ? selectedOpacityLevelOne : `${bg_left_menu_one?.slice(3,4)}`)}, ${hexToRgba(levelOneGradientColorChange ? levelOneGradientColorChange : `${bg_left_menu_one?.slice(1,2)}` , selectedOpacityLevelOne ? selectedOpacityLevelOne :  `${bg_left_menu_one?.slice(3,4)}` )})`}}
                                                        >
                                                            <p className='mt-2 mb-2' style={{ color: textColor ? textColor : adminPanelSettingsEdit[0]?.color_left_menu_one }}>Academic Setup</p>
                                                            <div className='mt-2'>
                                                                <FaAngleRight></FaAngleRight>

                                                            </div>
                                                        </div>
                                                    </a>
                                                    <ul class="collapse list-unstyled" id="homeSubmenu">
                                                        <li>
                                                            <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" >
                                                                <div class="d-flex justify-content-between "
                                                                    // style={{ background: `linear-gradient(${levelTwoGradientDirectionChange ? levelTwoGradientDirectionChange : bg_left_menu_two?.slice(2, 3)}, ${levelTwoBgChange ? levelTwoBgChange : bg_left_menu_two?.slice(0, 1)}, ${levelTwoGradientColorChange ? levelTwoGradientColorChange : bg_left_menu_two?.slice(1, 2)})`, opacity: selectedOpacityLevelTwo ? selectedOpacityLevelTwo : bg_left_menu_two?.slice(3, 4), borderBottom: levelTwoBorderChange ? `1px solid ${levelTwoBorderChange}` : `1px solid ${adminPanelSettingsEdit[0]?.border_left_menu_two}` }}
                                                                    style={{borderBottom: levelTwoBorderChange ? `1px solid ${levelTwoBorderChange}` : `1px solid ${adminPanelSettingsEdit[0]?.border_left_menu_two}`, background:`linear-gradient(${levelTwoGradientDirectionChange ? levelTwoGradientDirectionChange : `${bg_left_menu_two?.slice(2,3)}` }, ${hexToRgba(levelTwoBgChange ? levelTwoBgChange : `${bg_left_menu_two?.slice(0,1)}`, selectedOpacityLevelTwo ? selectedOpacityLevelTwo : `${bg_left_menu_two?.slice(3,4)}`)}, ${hexToRgba(levelTwoGradientColorChange ? levelTwoGradientColorChange : `${bg_left_menu_two?.slice(1,2)}` , selectedOpacityLevelTwo ? selectedOpacityLevelTwo : `${bg_left_menu_two?.slice(3,4)}` )})`}}
                                                                >
                                                                    <p className='mt-2 mb-2 ' style={{ color: levelTwoTextColor ? levelTwoTextColor : adminPanelSettingsEdit[0]?.color_left_menu_two }} >Admin Page List</p>
                                                                    <div className='mt-2'>

                                                                        <FaAngleRight></FaAngleRight>

                                                                    </div>
                                                                </div>
                                                            </a>

                                                            <ul class="collapse list-unstyled" id="homeSubmenu1">
                                                                <li>
                                                                    <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" >
                                                                        <div class="d-flex justify-content-between "
                                                                            // style={{ background: `linear-gradient(${levelThreeGradientDirectionChange ? levelThreeGradientDirectionChange : bg_left_menu_three?.slice(2, 3)}, ${levelThreeBgChange ? levelThreeBgChange : bg_left_menu_three?.slice(0, 1)}, ${levelThreeGradientColorChange ? levelThreeGradientColorChange : bg_left_menu_three?.slice(1, 2)})`, opacity: selectedOpacityLevelThree, borderBottom: levelThreeBorderChange ? `1px solid ${levelThreeBorderChange}` : `1px solid ${adminPanelSettingsEdit[0]?.border_left_menu_three}` }}

                                                                            style={{
                                                                                borderBottom: levelThreeBorderChange ? `1px solid ${levelThreeBorderChange}` : `1px solid ${adminPanelSettingsEdit[0]?.border_left_menu_three}`,
                                                                                background:`linear-gradient(${levelThreeGradientDirectionChange ? levelThreeGradientDirectionChange : `${bg_left_menu_three?.slice(2,3)}`}, ${hexToRgba(levelThreeBgChange ? levelThreeBgChange :  `${bg_left_menu_three?.slice(0,1)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)}, ${hexToRgba(levelThreeGradientColorChange ? levelThreeGradientColorChange : `${bg_left_menu_three?.slice(1,2)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)})`}}


                                                                        // style={{ backgroundColor: levelThreeBgChange, borderBottom: levelThreeBorderChange ? `1px solid ${levelThreeBorderChange}` : '1px solid black' }}
                                                                        >
                                                                            <p className='mt-2 mb-2' style={{ color: levelThreeTextColor ? levelThreeTextColor : adminPanelSettingsEdit[0]?.color_left_menu_three }}>Admin Page List Create</p>

                                                                        </div>
                                                                        <div class="d-flex justify-content-between "
                                                                             style={{
                                                                                borderBottom: levelThreeBorderChange ? `1px solid ${levelThreeBorderChange}` : `1px solid ${adminPanelSettingsEdit[0]?.border_left_menu_three}`,
                                                                                background:`linear-gradient(${levelThreeGradientDirectionChange ? levelThreeGradientDirectionChange : `${bg_left_menu_three?.slice(2,3)}`}, ${hexToRgba(levelThreeBgChange ? levelThreeBgChange :  `${bg_left_menu_three?.slice(0,1)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)}, ${hexToRgba(levelThreeGradientColorChange ? levelThreeGradientColorChange : `${bg_left_menu_three?.slice(1,2)}`, selectedOpacityLevelThree ? selectedOpacityLevelThree : `${bg_left_menu_three?.slice(3,4)}`)})`}}

                                                                        >
                                                                            <p className='mt-2 mb-2' style={{ color: levelThreeTextColor ? levelThreeTextColor : adminPanelSettingsEdit[0]?.color_left_menu_three }}>Admin Page List List</p>

                                                                        </div>
                                                                    </a>

                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            {/* left side menu end */}

                            {/* work in here */}
                            <div className='col-md-12 d-lg-flex d-md-flex border mb-2 py-2'>

                                <div className='col-md-6 col-10'>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Body Content Background Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="body_content_bg_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_body_content?.slice(0, 1)}
                                                                    onChange={handleBodyBgChange}
                                                                    style={{ ...inputStyle, color: bodyBgChange }}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className='body_content_bg_color'
                                                                    type="color"
                                                                    name="body_content_bg_color_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_body_content?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: bodyGradientColorChange }}
                                                                    onChange={handleGradientColorChangeBody}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_body_content_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeBody}
                                                                value={bodyGradientDirectionChange ? bodyGradientDirectionChange : bg_body_content?.slice(2, 3)}
                                                            >
                                                                <option selected value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>
                                                        <div>

                                                            <select name="bg_body_content_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleBodyOpacityChange} value={selectedOpacityBody ? selectedOpacityBody : bg_body_content?.slice(3, 4)}>
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex mt-4'>

                                                        <div class=" mr-2">
                                                            <div>
                                                                <span class="btn btn-success btn-sm fileinput-button thumbnail" >
                                                                    <label for="fileInput1" className='mb-0' ><FaUpload></FaUpload>Select Image </label>
                                                                    <input
                                                                        name='body_content_bg_image1'
                                                                        onChange={handleContentBgImage}
                                                                        type="file" id="fileInput1" style={{ display: "none" }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class=" border img_bg_card_header" style={{ width: '120px', height: '70px' }} >

                                                            {contentBgImage ?

                                                                <>
                                                                    <img className="w-100"
                                                                        src={URL.createObjectURL(contentBgImage)}
                                                                        alt="Uploaded File" />
                                                                    <button
                                                                        onClick={handleRemoveContentBgImage}
                                                                        type="button" class="btn btn-danger btn-sm position-absolute float-right ml-n4" ><FaTimes></FaTimes></button>
                                                                </>
                                                                :
                                                                ''
                                                            }
                                                        </div>
                                                    </div>







                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Body Content Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="body_content_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_body_content}
                                                                    style={{ ...inputStyle, color: bodyTextColour }}
                                                                    onChange={handleBodyTextColorChange}

                                                                />


                                                                ▼</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className=' p-3 border '


                                        // style={{ backgroundImage: contentBgImage ? `url(${URL.createObjectURL(contentBgImage)})` : 'none', background: `linear-gradient(${bodyGradientDirectionChange ? bodyGradientDirectionChange : bg_body_content?.slice(2, 3)}, ${bodyBgChange ? bodyBgChange : bg_body_content?.slice(0, 1)}, ${bodyGradientColorChange ? bodyGradientColorChange : bg_body_content?.slice(1, 2)})`, opacity: selectedOpacityBody ? selectedOpacityBody : bg_body_content?.slice(3, 4) }}


                                        style={{
                                            ackgroundImage: contentBgImage ? `url(${URL.createObjectURL(contentBgImage)})` : 'none',
                                            background:`linear-gradient(${bodyGradientDirectionChange ? bodyGradientDirectionChange :  `${bg_body_content?.slice(2,3)}`}, ${hexToRgba(bodyBgChange ? bodyBgChange :  `${bg_body_content?.slice(0,1)}`  , selectedOpacityBody ? selectedOpacityBody : `${bg_body_content?.slice(3,4)}`)}, ${hexToRgba(bodyGradientColorChange ? bodyGradientColorChange : `${bg_body_content?.slice(1,2)}`, selectedOpacityBody  ? selectedOpacityBody : `${bg_body_content?.slice(3,4)}`)})`}}

                                    // style={{
                                    // 	background: `linear-gradient(${bodyGradientDirectionChange},  rgba(186, 59, 59, ${selectedOpacityBody}), rgba(24, 22, 22, ${selectedOpacityBody}))`
                                    //   }}


                                    // style={{ backgroundImage: contentBgImage ? `url(${URL.createObjectURL(contentBgImage)})` : 'none', background: `linear-gradient(${bodyGradientDirectionChange}, ${bodyBgChange}, ${bodyGradientColorChange})`, opacity: selectedOpacityBody }}
                                    >

                                        <p style={{ color: bodyTextColour ? bodyTextColour : adminPanelSettingsEdit[0]?.color_body_content }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, natus quidem? Quia architecto ipsam doloribus deleniti asperiores, consequatur dolores fuga.</p>

                                        <div class="card  h-100  mb-4 shadow-sm  bg-gradient-info "
                                            id=' bg_card_body'
                                        >
                                            <div class="card-body p-2 d-flex justify-content-between align-items-center">

                                                <div class="col-4 align-self-center rounded-circle float-left">
                                                    <div class="card card-block border-0 bg-transparent d-flex align-items-center justify-content-center">
                                                        <h5 class="card-title text-center align-middle text-info m-0 bg-light rounded-circle  p-1"><FaUserGraduate></FaUserGraduate></h5>
                                                    </div>
                                                </div>
                                                <div class="col-8  float-right p-0">

                                                    <h2 class="card-title text-white mb-0 text-right">182</h2>
                                                    <h6 class="card-title text-white m-0 text-right">Total Student</h6>

                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='col-md-12 d-md-flex d-lg-flex border mb-2 py-2'>

                                <div className='col-md-6 col-10'>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Body  Background Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="body_bg_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_body?.slice(0, 1)}
                                                                    onChange={handleMainBodyBgChange}
                                                                    style={{ ...inputStyle, color: mainBodyBgChange }}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="body_bg_color_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_body?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: mainBodyGradientColorChange }}
                                                                    onChange={handleGradientColorChangeMainBody}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_body_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeMainBody}
                                                                value={mainBodyGradientDirectionChange ? mainBodyGradientDirectionChange : bg_body?.slice(2, 3)}

                                                            >
                                                                <option selected value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>
                                                        <div>

                                                            <select name="bg_body_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleMainBodyOpacityChange} value={selectedOpacityMainBody ? selectedOpacityMainBody : bg_body?.slice(3, 4)}>
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='d-flex mt-4'>

                                                        <div class=" mr-2">
                                                            <div>
                                                                <span class="btn btn-success btn-sm fileinput-button thumbnail" >
                                                                    <label for="fileInput2" className='mb-0' ><FaUpload></FaUpload>Select Image </label>
                                                                    <input
                                                                        name='body_bg_image2'
                                                                        onChange={handleBodyBgImage}
                                                                        type="file" id="fileInput2" style={{ display: "none" }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class=" border img_bg_card_header" style={{ width: '120px', height: '70px' }} >

                                                            {bodyBgImage ?
                                                                <>
                                                                    <img className="w-100" src={URL.createObjectURL(bodyBgImage)} alt="Uploaded File" />
                                                                    <button
                                                                        onClick={handleRemoveBodyBgImage}
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm position-absolute float-right ml-n4"
                                                                    >
                                                                        <FaTimes></FaTimes>
                                                                    </button>
                                                                </>
                                                                :
                                                                ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5">Body  Text Color:</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="body_text_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_body}
                                                                    style={{ ...inputStyle, color: mainBodyTextColour }}
                                                                    onChange={handleMainBodyTextColorChange}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6 "
                                //  style={{ backgroundImage: bodyBgImage ? `url(${URL.createObjectURL(bodyBgImage)})` : 'none', background: `linear-gradient(${mainBodyGradientDirectionChange ? mainBodyGradientDirectionChange : bg_body?.slice(2, 3)}, ${mainBodyBgChange ? mainBodyBgChange : bg_body?.slice(0, 1)}, ${mainBodyGradientColorChange ? mainBodyGradientColorChange : bg_body?.slice(1, 2)})`, opacity: selectedOpacityMainBody ? selectedOpacityMainBody : bg_body?.slice(3, 4), color: mainBodyTextColour ? mainBodyTextColour : adminPanelSettingsEdit[0]?.color_body }}
                                
                                style={{
                                    backgroundImage: bodyBgImage ? `url(${URL.createObjectURL(bodyBgImage)})` : 'none',
                                    background:`linear-gradient(${mainBodyGradientDirectionChange ? mainBodyGradientDirectionChange : `${bg_body?.slice(2,3)}` }, ${hexToRgba(mainBodyBgChange ? mainBodyBgChange : `${bg_body?.slice(0,1)}`, selectedOpacityMainBody ? selectedOpacityMainBody :  `${bg_body?.slice(3,4)}`)}, ${hexToRgba(mainBodyGradientColorChange ? mainBodyGradientColorChange : `${bg_body?.slice(1,2)}`, selectedOpacityMainBody ? selectedOpacityMainBody :  `${bg_body?.slice(3,4)}`)})`}}
                                
                                >
                                    <nav className="navbar navbar-expand-lg mb-0">
                                        <div className="container-fluid ">

                                            <div className='d-flex gap-3 mt-3'>
                                                <div >
                                                    <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""
                                                        width='40'
                                                    />
                                                </div>
                                                <div style={{ marginTop: '-8px', marginLeft: '10px' }}>
                                                    <h4 className='header-tag' >Pathshala School & College
                                                    </h4>
                                                    <p style={{ marginTop: '-5px' }}><strong>College Management System</strong></p>
                                                </div>
                                            </div>


                                            <div >


                                                <div className='header-right mb-lg-0 mb-3 w-full'>
                                                    <ul className="nav justify-content-center">
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 ">
                                                            <a className="nav-link text-success">
                                                                <FontAwesomeIcon icon={faCog} className="zt-1" />
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-3">
                                                            <a className="nav-link text-danger" href="#">
                                                                <FontAwesomeIcon icon={faCommentDots}
                                                                    className="zt-1 blink_me" />

                                                                <span className=" iconBotton badge badge-danger badge-pill position-absolute bg-danger">0</span>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle">
                                                            <a className="nav-link text-secondary" href="#">
                                                                <FontAwesomeIcon icon={faBell} className="zt-1 swingimage" />
                                                                <span className="iconBotton badge badge-danger badge-pill  position-absolute bg-danger mb-5">0</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </nav>
                                    <nav className=" navbar navbar-expand mb-0 navbar-light bg-light" >
                                        <div className="container-fluid" >
                                            <Link className="navbar-brand  text-primary" href="">
                                                <p >{(page_group)}</p>
                                            </Link>

                                            <div className="collapse navbar-collapse " id="customNavbarCollapse">
                                                <ul class=" nav navbar-nav ml-auto">
                                                    {
                                                        pageGroupNav?.slice(0, 5).map(page =>
                                                            <>
                                                                <div class=" ml-0 dropdown" >

                                                                    <li className="nav-item active">
                                                                        <Link className="nav-link" href="" style={{ color: subHeaderControllerTextColor }}>{formatString(page?.controller_name)}

                                                                            <FaCaretDown></FaCaretDown>
                                                                        </Link>
                                                                    </li>
                                                                    <ul class="dropdown-menu nav-item active ml-0" aria-labelledby="dropdownMenuButton">
                                                                        {
                                                                            page.display_names.map(displayNames =>

                                                                                <>

                                                                                    <li><a
                                                                                        style={{ color: subHeaderOptionsTextColor }}
                                                                                        class="dropdown-item" href='#'>{displayNames.display_name}

                                                                                    </a></li>
                                                                                </>
                                                                            )
                                                                        }

                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )}

                                                </ul>

                                            </div>
                                        </div>
                                    </nav>

                                    <div class="card-header  custom-card-header py-1  clearfix  bg-gradient-primary border-0 text-white "

                                        style={{ background: 'linear-gradient(to right, rgba( 66,103,178,1 ), rgba( 66,103,178,1 ))' }}

                                    >


                                        <h5 class="card-title font-weight-bold mb-0  float-left mt-1 card-header-color">Admin Panel </h5>
                                        <div class="card-title font-weight-bold mb-0 float-right">
                                            <a href="https://atik.urbanitsolution.com/Admin/admin_panel_settings/admin_panel_settings_all?page_group=system_setup" class="btn btn-sm btn-info" >Back to Admin panel List</a>
                                        </div>

                                    </div>

                                    <p className='border p-2 bg-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, odio sint vel vitae nihil optio ipsa incidunt repellendus enim praesentium accusantium quia inventore, explicabo consectetur. Soluta at velit ratione enim accusantium illo adipisci! Sunt odio sapiente sequi quos ab, similique, inventore aperiam aspernatur voluptatibus dolores necessitatibus, molestias sed sint ullam! Doloribus quaerat nisi accusantium, itaque non minus vel voluptatem omnis quasi nostrum corrupti, </p>

                                </div>
                            </div>


                            <div className='col-md-12 d-lg-flex d-md-flex border mb-2 py-2'>

                                <div className='col-md-6 col-10'>
                                    <div className="form-group row">
                                        <label className="control-label font-weight-bold col-md-5 col-12">Card Header Background Color:</label>
                                        <div className="col-md-7 ">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="card_header_bg_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_card_header?.slice(0, 1)}
                                                                    onChange={handleCardHeaderBgChange}
                                                                    style={{ ...inputStyle, color: cardHeaderBgChange }}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="card_header_bg_color_two"
                                                                    id="colorPicker"
                                                                    defaultValue={bg_card_header?.slice(1, 2)}
                                                                    style={{ ...inputStyle, color: cardHeaderGradientColorChange }}
                                                                    onChange={handleGradientColorChangeCardHeader}
                                                                />


                                                                ▼</div>
                                                        </div>




                                                        <div>
                                                            <select name="bg_card_header_position" className="form-control form-control-sm bx-bgg-dir" onChange={handleGradientDirectionChangeCardHeader}
                                                                value={cardHeaderGradientDirectionChange ? cardHeaderGradientDirectionChange : bg_card_header?.slice(2, 3)}

                                                            >
                                                                <option selected value="to right top">to right top</option>
                                                                <option value="to right">to right</option>
                                                                <option value="to right bottom">to right bottom</option>
                                                                <option value="to bottom">to bottom</option>
                                                                <option value="to left bottom">to left bottom</option>
                                                                <option value="to left">to left</option>
                                                                <option value="to left top">to left top</option>
                                                                <option value="to top">to top</option>
                                                                <option value="circle">circle</option>
                                                                <option value="40deg">40deg</option>
                                                                <option value="-225deg">-225deg</option>
                                                                <option value="-20deg">-20deg</option>
                                                                <option value="135deg">135deg</option>
                                                                <option value="180deg">180deg</option>
                                                            </select>
                                                        </div>
                                                        <div>

                                                            <select name="bg_card_header_opacity" className="form-control form-control-sm bx-bgg-opacity" onChange={handleCardHeaderOpacityChange} value={selectedOpacityCardHeader ? selectedOpacityCardHeader : bg_card_header?.slice(3, 4)}>
                                                                <option selected value="0">0</option>
                                                                <option value="0.1">0.1</option>
                                                                <option value="0.2">0.2</option>
                                                                <option value="0.3">0.3</option>
                                                                <option value="0.4">0.4</option>
                                                                <option value="0.5">0.5</option>
                                                                <option value="0.6">0.6</option>
                                                                <option value="0.7">0.7</option>
                                                                <option value="0.8">0.8</option>
                                                                <option value="0.9">0.9</option>
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex mt-4'>

                                                        <div class=" mr-2">
                                                            <div>
                                                                <span class="btn btn-success btn-sm fileinput-button thumbnail" >
                                                                    <label for="fileInput" className='mb-0' ><FaUpload></FaUpload>Select Image </label>
                                                                    <input
                                                                        multiple
                                                                        name='card_header_bg_image3'
                                                                        onChange={handleFileChange}
                                                                        type="file" id="fileInput" style={{ display: "none" }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class=" border img_bg_card_header" style={{ width: '120px', height: '70px' }} >
                                                            {/* {selectedFile?.length > 0 && (
    <div>
      {selectedFile.map((preview, index) => (
        <>
        
        <img key={index} src={preview} alt={`Uploaded Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }} />
        <button
                                                                    onClick={handleRemoveImage}
                                                                    type="button" class="btn btn-danger btn-sm position-absolute float-right ml-n4" ><FaTimes></FaTimes></button>
        </>
        
      ))}
    </div>
  )} */}
                                                            {selectedFile ?

                                                                <>
                                                                    <img className="w-100"
                                                                        src={URL.createObjectURL(selectedFile)}
                                                                        alt="Uploaded File" />
                                                                    <button
                                                                        onClick={handleRemoveImage}
                                                                        type="button" class="btn btn-danger btn-sm position-absolute float-right ml-n4" ><FaTimes></FaTimes></button>
                                                                </>
                                                                :
                                                                ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row" 	>
                                        <label className="control-label font-weight-bold col-md-5">Card Header Text Color</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">


                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="card_header_text_color_one"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.color_card_header}
                                                                    style={{ ...inputStyle, color: cardHeaderTextColor }}
                                                                    onChange={handleCardHeaderColorChange}
                                                                />


                                                                ▼</div>
                                                        </div>

                                                    </div>







                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" >
                                    <div class="card-header  custom-card-header py-1  clearfix  bg-gradient-primary border-0 text-white"
                                        // style={{ background: `linear-gradient(${cardHeaderGradientDirectionChange ? cardHeaderGradientDirectionChange : bg_card_header?.slice(2, 3)}, ${cardHeaderBgChange ? cardHeaderBgChange : bg_card_header?.slice(0, 1)} ,  ${cardHeaderGradientColorChange ? cardHeaderGradientColorChange : bg_card_header?.slice(1, 2)})`, opacity: selectedOpacityCardHeader ? selectedOpacityCardHeader : bg_card_header?.slice(3, 4) }}

                                        style={{
                                            backgroundImage: selectedFile ? `url(${URL.createObjectURL(selectedFile)})` : 'none',
                                            background:`linear-gradient(${cardHeaderGradientDirectionChange ? cardHeaderGradientDirectionChange :  `${bg_card_header?.slice(2,3)}`}, ${hexToRgba(cardHeaderBgChange ? cardHeaderBgChange : `${bg_card_header?.slice(0,1)}`, selectedOpacityCardHeader ? selectedOpacityCardHeader : `${bg_card_header?.slice(3,4)}`)}, ${hexToRgba(cardHeaderGradientColorChange ? cardHeaderGradientColorChange :  `${bg_card_header?.slice(1,2)}`, selectedOpacityCardHeader ? selectedOpacityCardHeader : `${bg_card_header?.slice(3,4)}`)})`}}



                                    // style={{ background: 'linear-gradient(to right, rgba( 66,103,178,1 ), rgba( 66,103,178,1 ))' }}

                                    >

                                        <h5 style={{ color: cardHeaderTextColor ? cardHeaderTextColor : adminPanelSettingsEdit[0]?.color_card_header }} class="card-title font-weight-bold mb-0  float-left mt-1 card-header-color">Admin Panel </h5>
                                        <div class="card-title font-weight-bold mb-0 float-right">
                                            <a href="https://atik.urbanitsolution.com/Admin/admin_panel_settings/admin_panel_settings_all?page_group=system_setup" class="btn btn-sm btn-info" style={{ color: cardHeaderTextColor ? cardHeaderTextColor : adminPanelSettingsEdit[0]?.color_card_header }}>Back to Admin panel List</a>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='col-md-12 d-lg-flex d-md-flex border mb-2 py-2'>
                                <div className='col-md-6 '>
                                    <div className="form-group row ">
                                        <label className="control-label font-weight-bold col-md-5">Project Name Color</label>
                                        <div className="col-md-7">
                                            <div className="form-check form-check-inline">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="sp-replacer sp-light border w-15">
                                                            <div className="sp-preview">
                                                                <div className="sp-preview-inner" style={{ backgroundColor: 'rgb(52, 78, 134)' }}></div>
                                                            </div>
                                                            <div className="sp-dd d-flex">
                                                                <input
                                                                    className=''
                                                                    type="color"
                                                                    name="project_name_color"
                                                                    id="colorPicker"
                                                                    defaultValue={adminPanelSettingsEdit[0]?.project_name_color}
                                                                    onChange={handleProjectsNameColourChange}
                                                                    style={{ ...inputStyle, color: projectNameColour }}
                                                                />
                                                                ▼</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6' >
                                    <nav className="navbar navbar-expand-lg mb-0" >
                                        <div className="container-fluid ">

                                            <div className='d-flex gap-3 mt-3'>
                                                <div >
                                                    <img src="https://atik.urbanitsolution.com/files/logo/thumbnail/7632b474c6d5b78e3f6233a87461bf623f453c67.jpeg" className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""
                                                        width='40'
                                                    />
                                                </div>
                                                <div style={{ marginTop: '-8px', marginLeft: '10px' }}>
                                                    <h4 className='header-tag'>Pathshala School & College
                                                    </h4>
                                                    <p style={{ marginTop: '-5px', color: projectNameColour ? projectNameColour : adminPanelSettingsEdit[0]?.project_name_color }}><strong>College Management System</strong></p>
                                                </div>
                                            </div>


                                            <div >


                                                <div className='header-right mb-lg-0 mb-3 w-full'>
                                                    <ul className="nav justify-content-center">
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-2"></li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 ">
                                                            <a className="nav-link text-success">
                                                                <FontAwesomeIcon icon={faCog} className="zt-1" />
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle mr-2 mx-3">
                                                            <a className="nav-link text-danger" href="#">
                                                                <FontAwesomeIcon icon={faCommentDots}
                                                                    className="zt-1 blink_me" />

                                                                <span className=" iconBotton badge badge-danger badge-pill position-absolute bg-danger">0</span>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item py-1 bg-light border rounded-circle">
                                                            <a className="nav-link text-secondary" href="#">
                                                                <FontAwesomeIcon icon={faBell} className="zt-1 swingimage" />
                                                                <span className="iconBotton badge badge-danger badge-pill  position-absolute bg-danger mb-5">0</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </nav>
                                </div>

                            </div>





                            <div class="form-group row px-4">
                                <label class="control-label col-md-5 font-weight-bold">Status:</label>
                                <div class="col-md-7">
                                    <select required="" name="status" class="form-control form-control-sm trim integer_no_zero" id="status" placeholder="Enter Status">
                                        <option selected value=''>Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                    </select>
                                    <p class="text-danger mb-0"></p>
                                </div>
                            </div>
                        </div>
                        <div class=" col-sm-6 ">
                            <input type="submit" onClick={upload} class="btn btn-success btn-sm mb-4 mt-4" value="Submit" />
                        </div>

                    </form>



                </div>
            </div>

        </div>
    );
};

export default AdminSettingsCopy;