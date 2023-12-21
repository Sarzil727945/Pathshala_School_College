const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require('../connection/config/database');
console.log(db, 'db')
// http://localhost:5002/allUsers?email=abutaher01725@gmail.com
const usersModel = require('../app/model/Admin/usersListModel')
app.get('/user/allUser', usersModel.usersListAll)
app.get('/user/allUser/:id', usersModel.usersListSingle)
app.get('/user/userRole', usersModel.getUserRole)
app.get('/users', usersModel.usersBtnIcons)
app.get('/users/add', usersModel.addColumn)
app.get('/users/role_all', usersModel.userRoleAllList)
app.post('/send-otp', usersModel.numberOtpSend)
app.post('/reset-password/:id', usersModel.UpdateUserPassword);
// app.post('/send-otp/email', usersModel.emailOtpSend)


app.delete('/allUser/:id', usersModel.usersListDelete)
app.put('/updateUsers/:id', usersModel.UpdateSingleUser)
app.put('/update/verification_code/:id', usersModel.UpdateSingleUserMobileVerificationCode)
app.get('/allUsers', usersModel.getSingleUsersListEmail)
app.post('/login', usersModel.loginUserEmailPassword);
app.put('/updateLogin/:email', usersModel.updateLogin);
app.post('/create-users', usersModel.CreateUserList);

app.get('/addColumn', usersModel.addColumn)
app.post('/admin/create_side_menu',  usersModel.createSideMenu);
app.put('/admin/update_side_menu/:id',  usersModel.updateSideMenu);
app.put('/admin/reset_password/:id',  usersModel.UpdateUserPassword);

// role
app.get('/user/role', usersModel.usersRole);
app.get('/user-role/btn', usersModel.usersRoleBtn);
app.get('/page-group/display-name', usersModel.getPageGroupAndDisplayName);
app.post('/user/user-role-create', usersModel.userRoleCreate);
app.get('/user/user-role-single/:id', usersModel.getUserRoleIdSingle);
app.put('/user/user-role/edit/:id', usersModel.userRoleUpdate);
app.delete('/user/user-role/delete/:id', usersModel.deleteUserRoleIdSingle);



const adminPageList = require('../app/model/Admin/adminPageListModel')
app.post('/admin/allAdmin/', adminPageList.createAllAdminPageList)
app.get('/admin/allAdmin/', adminPageList.getAllAdminPageList)
app.post('/admin/copy/', adminPageList.copyAdminPageList)
app.post('/updateAdminList/:id', adminPageList.UpdateAdminPageList)
app.post('/admin/delete/', adminPageList.deleteAdminPageList)
app.delete('/admin/allAdmin/:id', adminPageList.deleteSingleAdminPageList)

// admin_panel_settings part start 
app.get('/admin/admin_panel_settings', adminPageList.getAllAdminPanelSettingsList)
app.get('/admin/admin_panel_settings/:id', adminPageList.getSingleAdminPanelSettingsList)
app.delete('/admin/admin_panel_settings/delete/:id', adminPageList.deleteAllAdminPanelSettingsList)
// admin_panel_settings part end

app.get('/admin/group-namesss', adminPageList.getPageGroupAndControllerNamesss)
app.get('/admin/group-names-id', adminPageList.getPageGroupAndControllerNamesssId)
app.get('/page-group/display-name/with-id', adminPageList.getPageGroupAndDisplayNameWithId)

const smsSettings = require('../app/model/SMS/smsSettings')
app.post('/smsSettings', smsSettings.updateSmsSettings)
app.get('/smsSettings/', smsSettings.getSmsSettings)
// app.get('/addColumn', smsSettings.addColumn)

const excelSheet = require('../app/model/ExcelSheet/excelSheet')
app.post('/createExcelSheet/', excelSheet.createExcelSheet)
app.put('/updateExcelSheet/:id', excelSheet.updateExcelSheet)
app.get('/getExcelSheet/', excelSheet.getExcelSheet)
// app.get('/addTable', excelSheet.addTable)


const faIcons = require('../app/model/Admin/faIconsModel')
app.get('/faIcons', faIcons.getAllIconList)
app.get("/Pagination/:pageNo/:perPage", adminPageList.PaginationController);
app.get('/admin/group-names-id', adminPageList.getPageGroupAndControllerNamesId)


// url to pdf
// const { default: puppeteer } = require('puppeteer')
// app.post('/convertToPDF', async (req, res) => {
//   const { url } = req.body;

//   try {
//     // Launch Puppeteer
//     const browser = await puppeteer.launch({
//       headless: true,
//     });

//     // Create a new page
//     const page = await browser.newPage();

//     // Navigate to the specified URL
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // Generate a PDF buffer
//     const pdfBuffer = await page.pdf();

//     // Close the browser
//     await browser.close();

//     // Set the content type and send the PDF buffer as the response
//     res.contentType('application/pdf');
//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error('Error converting to PDF:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

const puppeteer = require('puppeteer');
app.post('/convertToPDF', async (req, res) => {
  const { url } = req.body;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Generate a PDF buffer
    const pdfBuffer = await page.pdf();

    // Close the browser
    await browser.close();

    // Set the content type and send the PDF buffer as the response
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error converting to PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/', (req, res) => {
  res.send('Server running...')
})


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})




