
import { getAllUserData, getUserRoleData } from '@/api/adminPage';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const notifyS = (text) => toast.success(text);
const notifyE = (text) => toast.error(text);
let count = 1;

const handleSubmit = async (event) => {

    event?.preventDefault();
    const form = event?.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
 
    const loginDb = { email, password };

    const EditValue = { email, password: 'accountExcept' }


   


  

    if (email && password) {
      
        getAllUserData().then(async allUser => {
            const sUser = allUser.filter((users) => users?.email === email);
            if ( sUser[0]?.password === 'accountExcept' ) {
                
                notifyE('Your Account Except!');
                count =  0; 
            }
            else{
                if (count <= 3) {
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(loginDb),
                        });
        
        
        
                        if (response.ok) {
                            // Save email in session storage
        
                            getAllUserData().then(allUser => {
                                const sUser = allUser.filter((users) => users?.email === email);
                                getAllUserData().then(allUser => {
                                    const lUser = allUser?.filter((users) => users?.id === (sUser[0]?.id));
                                    getUserRoleData().then(users => {
                                        const userR = users?.filter((user) => user?.id === (lUser[0]?.role_name));
                                        console.log((sUser[0]?.id), (lUser[0]?.full_name), (userR[0]?.role_name));
        
                                        // localStorage data set         
                                        localStorage.setItem('user_id', (sUser[0]?.id));
                                        localStorage.setItem('full_name', (lUser[0]?.full_name));
                                        localStorage.setItem('role_name', (userR[0]?.role_name));
                                        localStorage.setItem('photo', (lUser[0]?.photo));
                                        notifyS('Login Successful');
                                        window.location.href = '/Admin/dashboard';
                                    })
                                })
                            })
        
                        } else {
                            notifyE('Incorrect Email OR Password');
                            ++count
                        }

                    } catch (error) {
                        console.error('Login failed:', error);
                    }
                }
                else {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateLogin/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(EditValue)
                    })
                        .then(Response => Response.json())
                        .then(data => {
                            // console.log(data)
                        })
                }
            }
        })
       
    }

    else {
        notifyE('Please fill out all the form fields!');
    }


};

export default handleSubmit;
