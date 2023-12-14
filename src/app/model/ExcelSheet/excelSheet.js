const connection = require('../../../connection/config/database')
const excelSheet = {


    //  addTable: async (req, res) => {
    //     try {
    //       const query = `
    //         CREATE TABLE IF NOT EXISTS excel_sheet (
    //           id INT AUTO_INCREMENT PRIMARY KEY,
    //           name VARCHAR(255) NOT NULL,
    //           gender VARCHAR(10),
    //           country VARCHAR(50),
    //           age INT,
    //           date DATE
    //         )
    //       `;
      
    //       const result = await new Promise((resolve, reject) => {
    //         connection.query(query, (error, result) => {
    //           if (error) {
    //             reject(error);
    //           } else {
    //             resolve(result);
    //           }
    //         });
    //       });
      
    //       console.log('Table created successfully');
    //       return res.send(result);
    //     } catch (error) {
    //       console.error('Error creating table:', error);
    //       res.status(500).json({ message: 'Internal Server Error' });
    //     }
    //   },
      

    createExcelSheet: async (req, res) => {
      try {
        const {
          name, gender, country, age, date
        } = req.body;
    
        // Assuming date is in the format dd/mm/yyyy
        const [day, month, year] = date.split('/').map(Number);
        const dateObject = new Date(year, month - 1, day + 1);
        const formattedDate = dateObject.toISOString().split('T')[0];
    
        const insertQuery = `
          INSERT INTO excel_sheet (name, gender, country, age, date)
          VALUES (?, ?, ?, ?, ?);
        `;
    
        const result = await new Promise((resolve, reject) => {
          connection.query(
            insertQuery,
            [name, gender, country, age, formattedDate], // Use formattedDate instead of date
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
        });
    
        if (result.affectedRows > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log('Insert failed');
          return res.status(500).json({ message: 'Insert failed.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    
      
      
    updateExcelSheet: async (req, res) => {
        try {
            const {
                id, name, gender, country, age, date
            } = req.body;

            const query = `
                UPDATE excel_sheet
                SET 
                id = ?, 
                name = ?, 
                gender = ?, 
                country = ?, 
                age = ?, 
                date = ?,   
                WHERE id = ?;
            `;

            connection.query(
                query,
                [
                    id, name, gender, country, age, date
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


    getExcelSheet: async (req, res) => {
      try {
        const dataQuery = "SELECT * FROM excel_sheet";
    
        connection.query(dataQuery, function (error, result) {
          if (!error) {
            const formattedResult = result.map((row) => {
              const dateObject = new Date(row.date);
              const day = dateObject.getDate().toString().padStart(2, '0');
              const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
              const year = dateObject.getFullYear().toString();
    
              const formattedDate = `${day}-${month}-${year}`;
    
              return {
                ...row,
                date: formattedDate,
              };
            });
    
            res.send(formattedResult);
          } else {
            console.log(error);
            res.status(500).json({ message: 'Error fetching data.' });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    
}

module.exports = excelSheet