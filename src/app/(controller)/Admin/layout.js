
import '../../(view)/admin/adminStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from '@/app/(view)/admin_layout/sidebar/page';

export const metadata = {
    title: 'Pathshala School & College | School Management System',
    description: 'Pathshala School & College | School Management System',
  }

const AdminTemplate = ({ children }) => {

    return (
        <div>
            <AdminSidebar
                child={children}
            ></AdminSidebar>
        </div>


    );
};

export default AdminTemplate;