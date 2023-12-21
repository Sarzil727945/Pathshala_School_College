
const connection = require('../../../connection/config/database')
// const path = require("path");
const sha1 = require('sha1');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
// function sha1(password) {
//     return crypto.createHash('sha1').update(password).digest('hex');
//   }



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


  
  CreateUserList: async (req, res) => {
    try {
      const { full_name, email, password, mobile, role_name, OTP } = req.body;

      // Hash the password using SHA-1
      const hashedPassword = sha1(password);

      // Insert the user into the database
      const sql = 'INSERT INTO users (full_name, email, password, mobile, role_name, OTP) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [full_name, email, hashedPassword, mobile, role_name, OTP];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'User creation failed' });
        } else {
          res.status(200).json({ message: 'User created successfully' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },


  userRoleAllList: async (req, res) => {
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




UpdateUserPassword: async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Hash the new password
  const hashedPassword = crypto.createHash('sha1').update(newPassword).digest('hex');

  // Check the current password in the database
  const checkPasswordQuery = 'SELECT password FROM users WHERE id = ?';

  connection.query(checkPasswordQuery, [req.params.id], (checkError, checkResults) => {
    if (checkError) {
      console.log('Error checking current password:', checkError);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the current password matches the one in the database
    const storedPassword = checkResults[0].password;
    const hashedPasswords = sha1(currentPassword);
    if (storedPassword !== hashedPasswords) {
      console.log('Current password does not match');
      res.status(400).send('Current password is incorrect');
      return;
    }

    // Update the password in the database
    const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';

    connection.query(updatePasswordQuery, [hashedPassword, req.params.id], (updateError, updateResults) => {
      if (updateError) {
        console.log('Error resetting password:', updateError);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Password reset successfully');
        res.status(200).send('Password reset successfully');
      }
    });
  });
},




  // options_color_sub_header color_sub_header bg_sub_header
  addColumn: async (req, res) => {
    try {
      // SQL query to add the new column if it doesn't exist
      const alterTableQuery = 'ALTER TABLE admin_panel_settings ADD  COLUMN admin_template VARCHAR(255)';
      // const alterTableQuery = 'ALTER TABLE admin_panel_settings DROP  COLUMN sub_header_pg_text_color VARCHAR(255)';
      // const alterTableQuery = 'ALTER TABLE admin_panel_settings ADD COLUMN options_color_sub_header VARCHAR(255), ADD COLUMN color_sub_header VARCHAR(255), ADD COLUMN bg_sub_header VARCHAR(255), ADD COLUMN color_card_body VARCHAR(255);';

      // Execute the query to add the column
      connection.query(alterTableQuery, (error, result) => {
        if (error) {
          console.log('Error adding column:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        console.log('Column added successfully');

        // You can choose to include additional logic or send a response here if needed

        // Close the MySQL connection
        connection.end();
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },




  // createSideMenu: async (req, res) => {
  //   const file = req.body;
  //   console.log(file)

  //   const cssContent = req.body.css;

  //   // Generate a folder structure based on the current date and time
  //   const currentDate = new Date();
  //   const year = String(currentDate.getFullYear());
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(currentDate.getDate()).padStart(2, '0');
  //   const hours = String(currentDate.getHours()).padStart(2, '0');
  //   const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  //   const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  //   const cssFolderPath = path.join(__dirname, 'css', year, month, day, hours, minutes, seconds);

  //   // Create the folder structure if it doesn't exist
  //   if (!fs.existsSync(cssFolderPath)) {
  //     fs.mkdirSync(cssFolderPath, { recursive: true });
  //   }

  //   // Create the CSS file path
  //   const cssFilePath = path.join(cssFolderPath, 'style.css');

  //   // Write the CSS content to the file


  //         fs.writeFileSync(cssFilePath, cssContent);

  //         res.json({ message: 'CSS file generated successfully', cssFilePath });

  //   try {
  //     const {
  //       created_by,
  //       left_menu,
  //       created_date,
  //       modified_date,
  //       modified_by,
  //       login_template_name,
  //       student_fee_invoice,
  //       admin_panel_name,
  //       status,
  //       version_code,
  //       css,
  //       project_name_color,
  //       bg_header,
  //       color_header,
  //       bg_sidebar,
  //       bg_body,
  //       bg_body_status,
  //       color_body,
  //       bg_body_content,
  //       bg_body_content_status,
  //       color_body_content,
  //       bg_left_menu_three,
  //       color_left_menu_three,
  //       bg_left_menu_one,
  //       color_left_menu_one,
  //       bg_left_menu_two,
  //       color_left_menu_two,
  //       bg_card_header,
  //       bg_card_header_status,
  //       color_card_header,
  //       border_left_menu_one,
  //       border_left_menu_two,
  //       border_left_menu_three,
  //       side_menu_position,
  //       bg_card_body,
  //       options_color_sub_header ,
  //       color_sub_header, 
  //       bg_sub_header, 
  //       color_card_body
  //     } = req.body;

  //     const insertQuery = `
  //       INSERT INTO admin_panel_settings (
  //         created_by,
  //         left_menu,
  //         created_date,
  //         modified_date,
  //         modified_by,
  //         login_template_name,
  //         student_fee_invoice,
  //         admin_panel_name,
  //         status,
  //         version_code,
  //         css,
  //         project_name_color,
  //         bg_header,
  //         color_header,
  //         bg_sidebar,
  //         bg_body,
  //         bg_body_status,
  //         color_body,
  //         bg_body_content,
  //         bg_body_content_status,
  //         color_body_content,
  //         bg_left_menu_three,
  //         color_left_menu_three,
  //         bg_left_menu_one,
  //         color_left_menu_one,
  //         bg_left_menu_two,
  //         color_left_menu_two,
  //         bg_card_header,
  //         bg_card_header_status,
  //         color_card_header,
  //         border_left_menu_one,
  //         border_left_menu_two,
  //         border_left_menu_three,
  //         side_menu_position,
  //         bg_card_body,
  //         options_color_sub_header ,
  //         color_sub_header, 
  //         bg_sub_header, 
  //         color_card_body
  //       ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //     `;

  //     connection.query(
  //       insertQuery,
  //       [
  //         created_by,
  //         left_menu,
  //         created_date,
  //         modified_date,
  //         modified_by,
  //         login_template_name,
  //         student_fee_invoice,
  //         admin_panel_name,
  //         status,
  //         version_code,
  //         css,
  //         project_name_color,
  //         bg_header,
  //         color_header,
  //         bg_sidebar,
  //         bg_body,
  //         bg_body_status,
  //         color_body,
  //         bg_body_content,
  //         bg_body_content_status,
  //         color_body_content,
  //         bg_left_menu_three,
  //         color_left_menu_three,
  //         bg_left_menu_one,
  //         color_left_menu_one,
  //         bg_left_menu_two,
  //         color_left_menu_two,
  //         bg_card_header,
  //         bg_card_header_status,
  //         color_card_header,
  //         border_left_menu_one,
  //         border_left_menu_two,
  //         border_left_menu_three,
  //         side_menu_position,
  //         bg_card_body,
  //         options_color_sub_header ,
  //         color_sub_header, 
  //         bg_sub_header, 
  //         color_card_body
  //       ],
  //       (error, results) => {
  //         if (error) {
  //           console.error(error);
  //           return res.status(500).json({ message: 'Internal Server Error' });
  //         }

  //         console.log('Data inserted successfully');
  //         return res.status(200).json({ message: 'Data inserted successfully' });
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // },

  createSideMenu: async (req, res) => {
    const file = req.body;
    console.log(file);

    const cssContent = req.body.css;

    // Generate a folder structure based on the current date and time


    // const cssFolderPath = path.join(__dirname, '../../../connection/css');
    const cssFolderPath = path.join(__dirname, '../../../../../files/admin_template');

    // Create the folder structure if it doesn't exist
    if (!fs.existsSync(cssFolderPath)) {
      fs.mkdirSync(cssFolderPath, { recursive: true });
    }


    try {
      // Write the CSS content to the file

      // res.status(200).json({ message: 'CSS file generated successfully', cssFilePath });

      const {
        created_by,
        left_menu,
        created_date,
        modified_date,
        modified_by,
        login_template_name,
        student_fee_invoice,
        admin_panel_name,
        status,
        version_code,
        css,
        project_name_color,
        bg_header,
        color_header,
        bg_sidebar,
        bg_body,
        bg_body_status,
        color_body,
        bg_body_content,
        bg_body_content_status,
        color_body_content,
        bg_left_menu_three,
        color_left_menu_three,
        bg_left_menu_one,
        color_left_menu_one,
        bg_left_menu_two,
        color_left_menu_two,
        bg_card_header,
        bg_card_header_status,
        color_card_header,
        border_left_menu_one,
        border_left_menu_two,
        border_left_menu_three,
        side_menu_position,
        bg_card_body,
        options_color_sub_header,
        color_sub_header,
        bg_sub_header,
        color_card_body,
        sub_header_pg_text_color
      } = req.body;

      const insertQuery = `
        INSERT INTO admin_panel_settings (
          created_by,
          left_menu,
          created_date,
          modified_date,
          modified_by,
          login_template_name,
          student_fee_invoice,
          admin_panel_name,
          status,
          version_code,
          css,
          project_name_color,
          bg_header,
          color_header,
          bg_sidebar,
          bg_body,
          bg_body_status,
          color_body,
          bg_body_content,
          bg_body_content_status,
          color_body_content,
          bg_left_menu_three,
          color_left_menu_three,
          bg_left_menu_one,
          color_left_menu_one,
          bg_left_menu_two,
          color_left_menu_two,
          bg_card_header,
          bg_card_header_status,
          color_card_header,
          border_left_menu_one,
          border_left_menu_two,
          border_left_menu_three,
          side_menu_position,
          bg_card_body,
          options_color_sub_header,
          color_sub_header,
          bg_sub_header,
          color_card_body,
          sub_header_pg_text_color
         
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        insertQuery,
        [
          created_by,
          left_menu,
          created_date,
          modified_date,
          modified_by,
          login_template_name,
          student_fee_invoice,
          admin_panel_name,
          status,
          version_code,
          css,
          project_name_color,
          bg_header,
          color_header,
          bg_sidebar,
          bg_body,
          bg_body_status,
          color_body,
          bg_body_content,
          bg_body_content_status,
          color_body_content,
          bg_left_menu_three,
          color_left_menu_three,
          bg_left_menu_one,
          color_left_menu_one,
          bg_left_menu_two,
          color_left_menu_two,
          bg_card_header,
          bg_card_header_status,
          color_card_header,
          border_left_menu_one,
          border_left_menu_two,
          border_left_menu_three,
          side_menu_position,
          bg_card_body,
          options_color_sub_header,
          color_sub_header,
          bg_sub_header,
          color_card_body,
          sub_header_pg_text_color
        ],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          const insertedId = results.insertId;
          const cssFilePath = path.join(cssFolderPath, `admin_template_${insertedId}.css`);
          const paths = (`admin_template_${insertedId}.css`)
          fs.writeFileSync(cssFilePath, cssContent);

          connection.query(
            `UPDATE admin_panel_settings SET admin_template = ? WHERE id = ?`,
            [paths, insertedId],
            (updateError) => {
              if (updateError) {
                console.error(updateError);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              console.log('Data inserted successfully');
              // res.status(200).json({ message: 'Data inserted successfully', cssPath: cssFilePath });
            }
          );

          console.log('Data inserted successfully');
          // Send the response here, outside of the query callback
          res.status(200).json({ message: 'Data inserted successfully', cssPath: cssFilePath, insertedId });

        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },



  updateSideMenu: async (req, res) => {
    const file = req.body;
    console.log(file);

    const cssContent = req.body.css;

    // Generate a folder structure based on the current date and time
    // const cssFolderPath = path.join(__dirname, '../../../connection/css');
    const cssFolderPath = path.join(__dirname, '../../../../../files/admin_template');

    // Create the folder structure if it doesn't exist
    if (!fs.existsSync(cssFolderPath)) {
      fs.mkdirSync(cssFolderPath, { recursive: true });
    }

    try {
      // Write the CSS content to the file

      const {
        created_by,
        left_menu,
        created_date,
        modified_date,
        modified_by,
        login_template_name,
        student_fee_invoice,
        admin_panel_name,
        status,
        version_code,
        css,
        project_name_color,
        bg_header,
        color_header,
        bg_sidebar,
        bg_body,
        bg_body_status,
        color_body,
        bg_body_content,
        bg_body_content_status,
        color_body_content,
        bg_left_menu_three,
        color_left_menu_three,
        bg_left_menu_one,
        color_left_menu_one,
        bg_left_menu_two,
        color_left_menu_two,
        bg_card_header,
        bg_card_header_status,
        color_card_header,
        border_left_menu_one,
        border_left_menu_two,
        border_left_menu_three,
        side_menu_position,
        bg_card_body,
        options_color_sub_header,
        color_sub_header,
        bg_sub_header,
        color_card_body,
        sub_header_pg_text_color
      } = req.body;

      // Check if the ID of the record to be updated is available in the request
      const recordId = req.params.id;

      // if (!recordId) {
      //   return res.status(400).json({ message: 'Record ID is required for update' });
      // }

      const updateQuery = `
            UPDATE admin_panel_settings
            SET 
              created_by = ?,
              left_menu = ?,
              created_date = ?,
              modified_date = ?,
              modified_by = ?,
              login_template_name = ?,
              student_fee_invoice = ?,
              admin_panel_name = ?,
              status = ?,
              version_code = ?,
              css = ?,
              project_name_color = ?,
              bg_header = ?,
              color_header = ?,
              bg_sidebar = ?,
              bg_body = ?,
              bg_body_status = ?,
              color_body = ?,
              bg_body_content = ?,
              bg_body_content_status = ?,
              color_body_content = ?,
              bg_left_menu_three = ?,
              color_left_menu_three = ?,
              bg_left_menu_one = ?,
              color_left_menu_one = ?,
              bg_left_menu_two = ?,
              color_left_menu_two = ?,
              bg_card_header = ?,
              bg_card_header_status = ?,
              color_card_header = ?,
              border_left_menu_one = ?,
              border_left_menu_two = ?,
              border_left_menu_three = ?,
              side_menu_position = ?,
              bg_card_body = ?,
              options_color_sub_header = ?,
              color_sub_header = ?,
              bg_sub_header = ?,
              color_card_body = ?,
              sub_header_pg_text_color = ?
            WHERE id = ?
        `;

      connection.query(
        updateQuery,
        [
          created_by,
          left_menu,
          created_date,
          modified_date,
          modified_by,
          login_template_name,
          student_fee_invoice,
          admin_panel_name,
          status,
          version_code,
          css,
          project_name_color,
          bg_header,
          color_header,
          bg_sidebar,
          bg_body,
          bg_body_status,
          color_body,
          bg_body_content,
          bg_body_content_status,
          color_body_content,
          bg_left_menu_three,
          color_left_menu_three,
          bg_left_menu_one,
          color_left_menu_one,
          bg_left_menu_two,
          color_left_menu_two,
          bg_card_header,
          bg_card_header_status,
          color_card_header,
          border_left_menu_one,
          border_left_menu_two,
          border_left_menu_three,
          side_menu_position,
          bg_card_body,
          options_color_sub_header,
          color_sub_header,
          bg_sub_header,
          color_card_body,
          sub_header_pg_text_color,
          recordId
        ],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          const cssFilePath = path.join(cssFolderPath, `admin_template_${recordId}.css`);
          fs.writeFileSync(cssFilePath, cssContent);
          const paths = (`admin_template_${recordId}.css`)

          connection.query(
            `UPDATE admin_panel_settings SET admin_template = ? WHERE id = ?`,
            [paths, recordId],  // Change insertedId to recordId
            (updateError) => {
              if (updateError) {
                console.error(updateError);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              console.log('Data updated successfully');
              // res.status(200).json({ message: 'Data updated successfully', cssPath: cssFilePath, updatedId: recordId });
            }
          );

          console.log('Data updated successfully');
          res.status(200).json({ message: 'Data updated successfully', cssPath: cssFilePath, updatedId: recordId });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // loginUserEmailPassword: async (req, res) => {

  //     const { email, password } = req.body;

  //     const sql = 'SELECT * FROM users WHERE email = ?';
  //     connection.query(sql, [email], async (err, result) => {
  //         if (err) {
  //             console.error(err);
  //             res.status(500).json({ message: 'Login failed' });
  //         } else if (result.length === 0) {
  //             res.status(401).json({ message: 'User not found' });
  //         } else {
  //             const user = result[0];
  //             const match = await bcrypt.compare(password, user.password);

  //             if (match) {

  //                 res.status(200).json({ message: 'Login successful' });
  //                 // res.redirect('http://192.168.0.107:3000')
  //             } else {
  //                 res.status(401).json({ message: 'Invalid password' });
  //             }
  //         }
  //     });


  // },


  // Import the sha1 library

  // ...

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
        const hashedPassword = sha1(password); // Hash the password using SHA-1

        if (hashedPassword === user.password) { // Compare with the stored hash
          res.status(200).json({ message: 'Login successful' });
          // res.redirect('http://192.168.0.107:3000')
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      }
    });
  },

  updateLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const query = 'UPDATE users SET email = ?, password = ?  WHERE email = ? ';
      connection.query(query, [ email, password, req.params.email], (error, result) => {
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



  UpdateSingleUser: async (req, res) => {
    try {
      const { full_name, email, mobile, modified_date } = req.body;
      const query = 'UPDATE users SET full_name = ?, email = ?, mobile = ?, modified_date = ? WHERE id = ? ';
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

  UpdateSingleUserMobileVerificationCode: async (req, res) => {
    try {
      const { OTP,  verifiy_codes } = req.body;
      const query = 'UPDATE users SET OTP = ? , verifiy_codes = ?  WHERE id = ? ';
      connection.query(query, [OTP, verifiy_codes, req.params.id], (error, result) => {
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

  // UpdateSingleUserEmailVerificationCode: async (req, res) => {
  //   try {
  //     const { OTP,  email_verifiy_code } = req.body;
  //     const query = 'UPDATE users SET OTP = ? , email_verifiy_code = ?  WHERE id = ? ';
  //     connection.query(query, [OTP, email_verifiy_code, req.params.id], (error, result) => {
  //       if (!error && result.affectedRows > 0) {
  //         console.log(result);
  //         return res.send(result);
  //       } else {
  //         console.log(error || 'Product not found');
  //         return res.status(404).json({ message: 'Product not found.' });
  //       }
  //     });
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // },

  usersBtnIcons: async (req, res) => {
    try {
      const controllerName = 'users';
      const query = 'SELECT * FROM module_info WHERE controller_name = ?';

      connection.query(query, [controllerName], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.json(results);
      });
    }
    catch (error) {
      console.log(error)
    }
  },


  numberOtpSend: async (req, res) => {
    try {
      const { quick_api, mobile, msg } = req.body;
  
      // Validate that required parameters are present
      if (!quick_api || !mobile || !msg) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      const response = await axios.get(
        'https://quicksmsapp.com/Api/sms/campaign_api',
        {
          params: {
            quick_api,
            mobile,
            msg,
            // msg: `Your OTP is ${otp}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  emailOtpSend: async (req, res) => {
    try {
      const { quick_api, email, msg } = req.body;
  
      // Validate that required parameters are present
      if (!quick_api || !email || !msg) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      const response = await axios.get(
        'https://quicksmsapp.com/Api/sms/campaign_api',
        {
          params: {
            quick_api,
            email,
            msg,
            // msg: `Your OTP is ${otp}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },




  usersRole: async (req, res) => {
    connection.query('SELECT * FROM user_role', (err, userRoleResult) => {
      if (err) {
        console.error('Error retrieving users: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Organize the results into an array of users with their permissions
      const users = [];

      userRoleResult.forEach((userRole) => {
        const userRoleId = userRole.id;
        const user = { ...userRole };
        user.user_role_permission = [];

        // Retrieve user role permission data
        connection.query('SELECT * FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
          if (err) {
            console.error('Error retrieving user role permission: ' + err);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }

          user.user_role_permission = permissionResult;
          users.push(user);

          // Check if this is the last user role entry to respond to the client
          if (users.length === userRoleResult.length) {
            res.json({ users });
          }
        });
      });
    });
  },





  usersRoleBtn: async (req, res) => {
    try {
      const controllerName = 'user_role';
      const query = 'SELECT * FROM module_info WHERE controller_name = ?';

      connection.query(query, [controllerName], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.json(results);
      });
    }
    catch (error) {
      console.log(error)
    }
  },

  getPageGroupAndDisplayName: async (req, res) => {
    const query = `
          SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, GROUP_CONCAT(DISTINCT ap.display_name) AS display_names,
          GROUP_CONCAT(DISTINCT ap.method_name) AS method_names
          FROM module_info ap
          
          GROUP BY ap.page_group, ap.controller_name
          HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
        `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Process the data to group by page_group and create an object
      const groupedData = results.reduce((acc, row) => {
        const { page_group_id, page_group, controller_name, display_names, method_names } = row;
        if (!acc[page_group]) {
          acc[page_group] = {
            page_group_id,
            page_group,
            controllers: [],
          };
        }

        acc[page_group].controllers.push({
          controller_name,
          display_names: display_names.split(','),
          method_names: method_names.split(','),
        });

        return acc;
      }, {});

      const responseData = Object.values(groupedData);

      if (responseData.length > 0) {
        res.json(responseData);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });
  },



  userRoleCreate: async (req, res) => {
    const { role_name, status, user_page_list_id, user_default_page, OTP } = req.body;

    // Check if role_name, status, user_page_list_id, and user_default_page are provided and not null
    if (!role_name || !status || !user_page_list_id || !user_default_page || !OTP) {
      res.status(400).json({ message: 'role_name, status, user_page_list_id, and user_default_page are required and should not be null' });
      return;
    }

    // Start a database transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting database transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Insert data into the 'user_role' table
      connection.query(
        'INSERT INTO user_role (role_name, status, OTP) VALUES (?, ?, ?)',
        [role_name, status, OTP],
        (err, result) => {
          if (err) {
            // Rollback the transaction on error
            connection.rollback(() => {
              console.error('Error inserting into user_role table: ' + err);
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }
          const userRoleId = result.insertId;

          // Insert data into the 'user_role_permission' table
          connection.query(
            'INSERT INTO user_role_permission (user_page_list_id, user_default_page, user_role_id) VALUES (?, ?, ?)',
            [user_page_list_id, user_default_page, userRoleId],
            (err, permissionResult) => {
              if (err) {
                // Rollback the transaction on error
                connection.rollback(() => {
                  console.error('Error inserting into user_role_permission table: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                });
                return;
              }

              // Commit the transaction when both inserts are successful
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing the transaction: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
                }

                res.status(201).json({
                  user_role_id: userRoleId,
                  role_name,
                  status,
                  user_page_list_id,
                  user_default_page,
                  OTP
                });
              });
            }
          );
        }
      );
    });
  },





  userRoleUpdate: async (req, res) => {

    const { user_role_id, role_name, status, user_page_list_id, user_default_page } = req.body;

    // Check if user_role_id, role_name, status, user_page_list_id, and user_default_page are provided and not null
    if (!user_role_id || !role_name || !status || !user_page_list_id || !user_default_page) {
      res.status(400).json({ message: 'user_role_id, role_name, status, user_page_list_id, and user_default_page are required and should not be null' });
      return;
    }

    // Start a database transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting database transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Update data in the 'user_role' table
      connection.query(
        'UPDATE user_role SET role_name = ?, status = ? WHERE id = ?',
        [role_name, status, user_role_id],
        (err, result) => {
          if (err) {
            // Rollback the transaction on error
            connection.rollback(() => {
              console.error('Error updating user_role table: ' + err);
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }

          // Update data in the 'user_role_permission' table
          connection.query(
            'UPDATE user_role_permission SET user_page_list_id = ?, user_default_page = ? WHERE user_role_id = ?',
            [user_page_list_id, user_default_page, user_role_id],
            (err, permissionResult) => {
              if (err) {
                // Rollback the transaction on error
                connection.rollback(() => {
                  console.error('Error updating user_role_permission table: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                });
                return;
              }

              // Commit the transaction when both updates are successful
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing the transaction: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
                }

                res.status(200).json({
                  user_role_id,
                  role_name,
                  status,
                  user_page_list_id,
                  user_default_page,
                });
              });
            }
          );
        }
      );
    });
  },








  getUserRoleIdSingle: async (req, res) => {
    const userRoleId = req.params.id;

    // Retrieve user role data and its related permissions
    connection.query('SELECT * FROM user_role WHERE id = ?', [userRoleId], (err, userRoleResult) => {
      if (err) {
        console.error('Error retrieving user role: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      if (userRoleResult.length === 0) {
        res.status(404).json({ message: 'User role not found' });
        return;
      }

      // Retrieve user role permission data
      connection.query('SELECT * FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
        if (err) {
          console.error('Error retrieving user role permission: ' + err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        // Combine user role and permission data
        const user_role = userRoleResult[0]; // Assuming there's only one user role with the given ID
        user_role.user_role_permission = permissionResult;

        res.json({ user_role });
      });
    });
  },

  deleteUserRoleIdSingle: async (req, res) => {
    // try {
    //   const query = 'DELETE FROM user_role WHERE id = ?';
    //   connection.query(query, [req.params.id], (error, result) => {
    //     if (!error && result.affectedRows > 0) {
    //       console.log(result);
    //       return res.send(result);
    //     } else {
    //       console.log(error || 'User role not found');
    //       return res.status(404).json({ message: 'User role not found.' });
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Internal server error' });
    // }

    // Transaction to delete user_role with related permissions
    const userRoleId = req.params.id;

    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      connection.query('DELETE FROM user_role WHERE id = ?', [userRoleId], (err, result) => {
        if (err) {
          console.error('Error deleting user role: ' + err);
          connection.rollback(() => {
            res.status(500).json({ message: 'Internal server error' });
          });
          return;
        }
        connection.query('DELETE FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
          if (err) {
            console.error('Error deleting user role permissions: ' + err);
            connection.rollback(() => {
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }

          connection.commit((err) => {
            if (err) {
              console.error('Error committing transaction: ' + err);
              connection.rollback(() => {
                res.status(500).json({ message: 'Internal server error' });
              });
              return;
            }
            if (!err && result.affectedRows > 0) {

              res.json({ message: 'User role and related permissions deleted successfully' });
            }
          });
        });
      });
    });

    // try {
    //   const query = 'DELETE FROM user_role WHERE id = ?';
    //   connection.query(query, [req.params.id], (error, result) => {
    //     if (!error && result.affectedRows > 0) {
    //       console.log(result);
    //       return res.send(result);
    //     } else {
    //       console.log(error || 'Product not found');
    //       return res.status(404).json({ message: 'Product not found.' });
    //     }
    //   });
    // }
    // catch (error) {
    //   console.log(error)
    // }
    // const userRoleId = req.params.id;

    // connection.beginTransaction((err) => {
    //   if (err) {
    //     console.error('Error starting transaction: ' + err);
    //     res.status(500).json({ message: 'Internal server error' });
    //     return;
    //   }


    //     connection.query('DELETE FROM user_role WHERE id = ?', [userRoleId], (err, result) => {
    //       if (err) {
    //         console.error('Error deleting user role: ' + err);
    //         connection.rollback(() => {
    //           res.status(500).json({ message: 'Internal server error' });
    //         });
    //         return;
    //       }
    //       connection.query('DELETE FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
    //         if (err) {
    //           console.error('Error deleting user role permissions: ' + err);
    //           connection.rollback(() => {
    //             res.status(500).json({ message: 'Internal server error' });
    //           });
    //           return;
    //         }

    //       connection.commit((err) => {
    //         if (err) {
    //           console.error('Error committing transaction: ' + err);
    //           connection.rollback(() => {
    //             res.status(500).json({ message: 'Internal server error' });
    //           });
    //           return;
    //         }

    //         res.json({ message: 'User role and related permissions deleted successfully' });
    //       });
    //     });
    //   });
    // });
  }




}

module.exports = usersListModel
