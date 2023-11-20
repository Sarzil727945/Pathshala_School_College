
import { getAllUserData, getUserRoleData } from '@/api/adminPage';
import toast from 'react-hot-toast';


const notifyS = (text) => toast.success(text);
const notifyE = (text) => toast.error(text);

const handleSubmit = async (event) => {
    event?.preventDefault();
    const form = event?.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    const loginDb = {
        email,
        password
    };

    if (email && password) {
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

                            // sessionStorage data set         
                            sessionStorage.setItem('user_id', (sUser[0]?.id));
                            sessionStorage.setItem('full_name', (lUser[0]?.full_name))
                            sessionStorage.setItem('role_name', (userR[0]?.role_name))
                            sessionStorage.setItem('photo', (lUser[0]?.photo))
                            notifyS('Login Successful');
                            window.location.href = '/Admin/dashboard';
                        })
                    })
                })

            } else {
                notifyE('Incorrect Email OR Password');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    } else {
        notifyE('Please fill out all the form fields!');
    }
};

export default handleSubmit;
