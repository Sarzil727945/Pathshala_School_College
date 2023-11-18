
const connection = require('../../../connection/config/database')
const sha1 = require('sha1');


const usersListModel = {
    usersListAll: async (req, res) => {
        try {
            const data = "select * from users";
            connection.query(data, function (error, result) {
                console.log(result, 'Saklain Mostak nayan')
                if (!error) {
                    //   return  res.send(result,'nayan')

                    res.status(200).send(result)
                    // res.sendFile(path.join(__dirname + "../../App.js"));
                }

                else {
                    console.log(error, 'nayan')
                }

            })
        }
        catch (error) {
            console.log(error)
        }
    },

    getUserRole: async (req, res) => {
        try {
            const data = "select * from user_role";
            connection.query(data, function (error, result) {
                console.log(result, 'Saklain Mostak nayan')
                if (!error) {
                    //   return  res.send(result,'nayan')

                    res.status(200).send(result)
                    // res.sendFile(path.join(__dirname + "../../App.js"));
                }

                else {
                    console.log(error, 'nayan')
                }

            })
        }
        catch (error) {
            console.log(error)
        }
    },

    CreateUserList: async (req, res) => {
        try {
            const { full_name, email, password, mobile, role_name, status, created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo } = req.body;
            const query = 'INSERT INTO users (full_name , email, password , mobile, role_name, status , created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [full_name, email, password, mobile, role_name, status, created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo], (error, result) => {
                if (!error) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error);
                    return res.status(500).json({ message: 'Failed to add product.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },

    usersListSingle: async (req, res) => {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            connection.query(query, [req.params.id], (error, result) => {
                if (!error && result.length > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'Product not found');
                    return res.status(404).json({ message: 'Product not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },

    usersListDelete: async (req, res) => {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            connection.query(query, [req.params.id], (error, result) => {
                if (!error && result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'Product not found');
                    return res.status(404).json({ message: 'Product not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },
    // email/email?=admin@gmail.com

    getSingleUsersListEmail: async (req, res) => {
        try {
            // const {email} = req.query
            const query = 'SELECT * FROM users WHERE email = ?';
            connection.query(query, [req.query.email], (error, result) => {
                if (!error && result.length > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'Product not found');
                    return res.status(404).json({ message: 'Product not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },

    loginUserEmailPassword: async (req, res) => {
        const { email, password } = req.body;
    
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], async (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Login failed' });
          } else if (result.length === 0) {
            res.status(401).json({ message: 'User not found' });
          } else {
            const user = result[0];
            const hashedPassword = sha1(password); 
    
            if (hashedPassword === user.password) { 
              res.status(200).json({ message: 'Login successful' });
            } else {
              res.status(401).json({ message: 'Invalid password' });
            }
          }
        });
      },

 


    UpdateSingleUser: async (req, res) => {
        try {
            const { full_name, email, mobile, modified_date } = req.body;
            const query = 'UPDATE users SET full_name = ?, email = ?, mobile = ?, modified_date = ? WHERE id = ?';
            connection.query(query, [full_name, email, mobile, modified_date, req.params.id], (error, result) => {
                if (!error && result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'Product not found');
                    return res.status(404).json({ message: 'Product not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },





}

module.exports = usersListModel
