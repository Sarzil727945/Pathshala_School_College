const connection = require('../../../connection/config/database')
const smsSettings = {

    // addColumn: async (req, res) => {
    //     try {
    //         // SQL query to add the new column if it doesn't exist

    //         //   const oneColumnAdd = 'ALTER TABLE admin_panel_settings ADD  COLUMN sub_header_pg_text_color VARCHAR(255)';

    //         //   const oneColumnDelete = 'ALTER TABLE admission_sms DROP  COLUMN online_student_admission';

    //         // const multiColumnAdd = 'ALTER TABLE admission_sms ADD COLUMN online_student_admission VARCHAR(255), ADD COLUMN online_teacher_join VARCHAR(255), ADD COLUMN online_employee_join VARCHAR(255), ADD COLUMN software_student_admission VARCHAR(255), ADD COLUMN software_teacher_join VARCHAR(255), ADD COLUMN software_employee_join VARCHAR(255);';


    //           const multiColumnDelete = 'ALTER TABLE admission_sms DROP COLUMN online_student_admission, DROP COLUMN online_teacher_join, DROP COLUMN online_employee_join, DROP COLUMN software_student_admission, DROP COLUMN software_teacher_join, DROP COLUMN software_employee_join;';

    //         // Execute the query to add the column
    //         connection.query(multiColumnDelete, (error, result) => {
    //             if (error) {
    //                 console.log('Error adding column:', error);
    //                 return res.status(500).json({ message: 'Internal Server Error' });
    //             }

    //             console.log('Column added successfully');

    //             // You can choose to include additional logic or send a response here if needed

    //             // Close the MySQL connection
    //             connection.end();
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // },


    updateSmsSettings: async (req, res) => {
        try {
            const {
                os_admission, ot_join, oe_join, ss_admission, st_join, se_join, s_attendance, s_out_attendance, t_attendance, t_out_attendance, e_attendance, e_out_attendance, s_absence, te_absence, f_collection, df_collection, df_time, s_result, t_salary, e_salary,
            } = req.body;
    const id = 1
            const query = `
                UPDATE sms_settings
                SET 
                    os_admission = ?, 
                    ot_join = ?, 
                    oe_join = ?, 
                    ss_admission = ?, 
                    st_join = ?, 
                    se_join = ?,
                    s_attendance = ?,
                    s_out_attendance = ?,
                    t_attendance = ?,
                    t_out_attendance = ?,
                    e_attendance = ?,
                    e_out_attendance = ?,
                    s_absence = ?,
                    te_absence = ?,
                    f_collection = ?,
                    df_collection = ?,
                    df_time = ?,
                    s_result = ?,
                    t_salary = ?,
                    e_salary = ?
                WHERE id = ?;
            `;
    
            connection.query(
                query,
                [
                    os_admission, ot_join, oe_join, ss_admission, st_join, se_join, s_attendance, s_out_attendance, t_attendance, t_out_attendance, e_attendance, e_out_attendance, s_absence, te_absence, f_collection, df_collection, df_time, s_result, t_salary, e_salary, id,
                ],
                (error, result) => {
                    if (!error && result.affectedRows > 0) {
                        console.log(result);
                        return res.send(result);
                    } else {
                        console.log(error || 'Product not found');
                        return res.status(404).json({ message: 'Product not found.' });
                    }
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    
    getSmsSettings: async (req, res) => {
        try {
            const data = "select * from  sms_settings";

            connection.query(data, function (error, result) {
                console.log(result)
                if (!error) {
                    res.send(result)
                }

                else {
                    console.log(error)
                }

            })
        }
        catch (error) {
            console.log(error)
        }
    },
}

module.exports = smsSettings