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
app.get('/user/userRole', usersModel.getUserRole)
app.get('/user/allUser/:id', usersModel.usersListSingle)
app.put('/updateUsers/:id', usersModel.UpdateSingleUser)
app.delete('/allUser/:id', usersModel.usersListDelete)
app.get('/allUsers', usersModel.getSingleUsersListEmail)
app.post('/login', usersModel.loginUserEmailPassword);




const adminPageList = require('../app/model/Admin/adminPageListModel')
app.post('/admin/allAdmin/', adminPageList.createAllAdminPageList)
app.get('/admin/allAdmin/', adminPageList.getAllAdminPageList)
app.post('/admin/copy/', adminPageList.copyAdminPageList)
app.put('/updateAdminList/:id', adminPageList.UpdateAdminPageList)
app.post('/admin/delete/', adminPageList.deleteAdminPageList)
app.delete('/admin/allAdmin/:id', adminPageList.deleteSingleAdminPageList)


const smsSettings = require('../app/model/SMS/smsSettings')
app.put('/smsSettings/:id', smsSettings.updateSmsSettings)
app.get('/smsSettings/', smsSettings.getSmsSettings)
// app.get('/addColumn', smsSettings.addColumn)


const faIcons = require('../app/model/Admin/faIconsModel')
app.get('/faIcons', faIcons.getAllIconList)
app.get("/Pagination/:pageNo/:perPage", adminPageList.PaginationController);
app.get('/admin/group-names-id', adminPageList.getPageGroupAndControllerNamesId)


app.get('/', (req, res) => {
  res.send('Server running...')
})


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})




