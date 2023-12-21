const connection = require('../../../connection/config/database')
const AdminPageListModel = {
    getAllIconList: async (req, res) => {
        try {
            const data = "select * from fa";
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


module.exports = AdminPageListModel