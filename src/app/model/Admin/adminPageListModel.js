const connection = require('../../../connection/config/database')
const AdminPageListModel = {
    createAllAdminPageList: async (req, res) => {
        const {
            controller_name, method_name, parent_id, icon, btn, default_page, page_group, page_group_icon, header_menu_page, controller_bg, controller_color, status, method_code, controller_code, method_status
        } = req.body;

        const menu_type = 1;
        const method_sort = 0;

        // SQL query to delete previous records with the same controller_name
        const deleteQuery = 'DELETE FROM module_info WHERE controller_name = ?';

        // SQL query to insert a new record
        const insertQuery = `INSERT INTO module_info (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Function to convert snake_case to Title Case
        const titleCaseWord = (word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };

        // Convert controller_name to display_name
        const display_name = controller_name?.split("_")
            .map(word => titleCaseWord(word))
            .join(" ");



        // SQL query to retrieve max controller_sort and page_group_sort values
        const maxValuesQuery = `
            SELECT 
                MAX(controller_sort) AS max_controller_sort, 
                MAX(page_group_sort) AS max_page_group_sort
            FROM module_info
            WHERE page_group = ?
        `;

        connection.query(maxValuesQuery, [page_group], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Failed to retrieve max values.' });
            }

            const maxControllerSort = result[0].max_controller_sort || 0;
            const maxPageGroupSort = result[0].max_page_group_sort || 0;

            const controller_sort = maxControllerSort + 1;
            const page_group_sort = maxPageGroupSort + 1;

            connection.query(deleteQuery, [controller_name], (deleteError, deleteResult) => {
                if (deleteError) {
                    console.log(deleteError);
                    return res.status(500).json({ message: 'Failed to delete previous records.' });
                }

                connection.query(insertQuery, [display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status], (insertError, insertResult) => {
                    if (insertError) {
                        console.log(insertError);
                        return res.status(500).json({ message: 'Failed to add product.' });
                    }

                    const parent_id = insertResult.insertId;

                    const childRecords = [
                        { display_name: display_name + ' Create', method_name: controller_name + '_create', menu_type: 1, method_sort: 1 },
                        { display_name: display_name + ' List', method_name: controller_name + '_all', menu_type: 1, method_sort: 2 },
                        { display_name: display_name + ' Edit', method_name: controller_name + '_edit', menu_type: 0, method_sort: 3 },
                        { display_name: display_name + ' Copy', method_name: controller_name + '_copy', menu_type: 0, method_sort: 4 },
                        { display_name: display_name + ' Delete', method_name: controller_name + '_delete', menu_type: 0, method_sort: 5 },
                    ];


                    // Function to insert child records
                    const insertChildRecords = (index) => {
                        if (index >= childRecords.length) {
                            // All child records inserted
                            return res.send(insertResult);
                        }

                        const childRecord = childRecords[index];


                        connection.query(insertQuery, [childRecord.display_name, controller_name, childRecord.method_name, parent_id, childRecord.menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, childRecord.method_sort, status, method_code, controller_code, method_status], (childInsertError, childInsertResult) => {
                            if (childInsertError) {
                                console.log(childInsertError);
                                return res.status(500).json({ message: 'Failed to add product.' });
                            }

                            // Insert the next child record
                            insertChildRecords(index + 1);
                        });
                    };

                    // Start inserting child records
                    insertChildRecords(0);
                });
            });
        });
    },


    getAllAdminPageList: async (req, res) => {
        try {
            const data = "select * from 	module_info  order by controller_name asc";

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

    copyAdminPageList: async (req, res) => {
        const {
            display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page,
            page_group, controller_bg, page_group_icon, controller_sort, page_group_sort, method_sort,
            controller_color, status, controller_code, method_status, header_menu_page, method_code
        } = req.body;

        // SQL query to insert a new record
        const insertQuery = `
                INSERT INTO module_info (
                    display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, 
                    page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, 
                    controller_color, method_sort, status, method_code, controller_code, method_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

        // Execute the query
        connection.query(insertQuery, [
            display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page,
            page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg,
            controller_color, method_sort, status, method_code, controller_code, method_status
        ], (insertError, insertResult) => {
            if (insertError) {
                console.error(insertError);
                return res.status(500).json({ message: 'Failed to add product.' });
            }

            // Handle success if needed
            res.status(200).json({ message: 'Product added successfully.' });
        });
    },


    UpdateAdminPageList: async (req, res) => {
        try {
            const {
                display_name,
                controller_name,
                method_name,
                parent_id,
                menu_type,
                icon,
                btn,
                default_page,
                page_group,
                controller_bg,
                page_group_icon,
                controller_sort,
                page_group_sort,
                method_sort,
                controller_color,
            } = req.body;

            const query = `
            UPDATE module_info 
            SET 
              display_name = ?, 
              controller_name = ?, 
              method_name = ?, 
              parent_id = ?, 
              menu_type = ?, 
              icon = ?, 
              btn = ?, 
              default_page = ?, 
              page_group = ?, 
              controller_bg = ?, 
              page_group_icon = ?, 
              controller_sort = ?, 
              page_group_sort = ?, 
              controller_color = ?, 
              method_sort = ? 
            WHERE id = ?
          `;

            connection.query(
                query,
                [
                    display_name,
                    controller_name,
                    method_name,
                    parent_id,
                    menu_type,
                    icon,
                    btn,
                    default_page,
                    page_group,
                    controller_bg,
                    page_group_icon,
                    controller_sort,
                    page_group_sort,
                    controller_color,
                    method_sort,
                    req.params.id,
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
        }
    },


    deleteAdminPageList: async (req, res) => {
        const { id } = req.body

        try {
            const query = 'DELETE FROM module_info WHERE id = ?';
            connection.query(query, [id], (error, result) => {
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


    deleteSingleAdminPageList: async (req, res) => {
        try {
            const query = 'DELETE FROM module_info WHERE id = ?';
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



    getPageGroupAndControllerNamesId: async (req, res) => {
        const query = `
        SELECT ap.page_group, ap.controller_name, ap.display_name, ap.method_name
        FROM module_info ap
        WHERE ap.parent_id != 0
        AND ap.menu_type = 1 
        GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.method_name
        HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
      `;

        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            // Helper function to compare names case-insensitively
            const areNamesEqual = (name1, name2) => name1.toLowerCase() === name2.toLowerCase();

            // Process the data to group by page_group and create an object
            const groupedData = results.reduce((acc, row) => {
                const { page_group_id, page_group, controller_name, display_name, method_name } = row;
                const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase

                if (!acc[pageGroupLowerCase]) {
                    acc[pageGroupLowerCase] = {
                        page_group_id,
                        page_group: pageGroupLowerCase, // Store in lowercase
                        controllers: [],
                    };
                }

                const controller = acc[pageGroupLowerCase].controllers.find((c) => areNamesEqual(c.controller_name, controller_name)); // Compare names case-insensitively

                if (controller) {
                    const display = controller.display_names.find((display) => areNamesEqual(display.display_name, display_name)); // Compare names case-insensitively
                    if (display) {
                        display.method_names.push(method_name);
                    } else {
                        controller.display_names.push({ display_name, method_names: [method_name] });
                    }
                } else {
                    acc[pageGroupLowerCase].controllers.push({
                        controller_name,
                        display_names: [{ display_name, method_names: [method_name] }],
                    });
                }

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


    PaginationController: (req, res) => {
        const pageNo = Number(req.params.pageNo);
        const perPage = Number(req.params.perPage);

        try {
            const skipRow = (pageNo - 1) * perPage;
            const rowsQuery = `SELECT * FROM module_info  where parent_id = 0 order by controller_name asc LIMIT ${skipRow}, ${perPage} `;

            connection.query(rowsQuery, function (error, result) {
                console.log(result)
                if (!error) {
                    res.send(result)
                }
                else {
                    console.log(error)
                }

            })
        } catch (error) {
            console.log(error)
        }

    },


    // admin_panel_settings part 

    getAllAdminPanelSettingsList: async (req, res) => {
        try {
            const data = 'SELECT * FROM admin_panel_settings';
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

    getSingleAdminPanelSettingsList: async (req, res) => {
        try {
            const { id } = req.params;

            const query = 'SELECT * FROM admin_panel_settings WHERE id = ?';

            connection.query(query, [id], function (error, result) {
                if (!error) {
                    res.send(result);
                } else {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

    },

    deleteAllAdminPanelSettingsList: async (req, res) => {
        try {
            const query = 'DELETE FROM admin_panel_settings WHERE id = ?';
            connection.query(query, [req.params.id], (error, result) => {
                if (!error && result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || ' not found');
                    return res.status(404).json({ message: ' not found.' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }


    },

    // user role start 
    getPageGroupAndControllerNamesss: async (req, res) => {
        try {
          const query = `
                SELECT
                  ap.page_group,
                  GROUP_CONCAT(DISTINCT ap.controller_name) AS controller_names
                FROM module_info ap
                WHERE ap.parent_id = 0
                  AND ap.page_group IS NOT NULL
                  AND ap.page_group != ''
                  AND ap.controller_name IS NOT NULL
                  AND ap.controller_name != ''
                GROUP BY ap.page_group
                HAVING COUNT(DISTINCT ap.controller_name) = COUNT(ap.controller_name)
              `;
    
          connection.query(query, (error, result) => {
            if (!error && result.length > 0) {
              console.log(result);
              return res.send(result);
            } else {
              console.log(error || 'Data not found');
              return res.status(404).json({ message: 'Data not found.' });
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
      getPageGroupAndControllerNamesssId: async (req, res) => {
        const query = `
        SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.method_name
        FROM module_info ap
        WHERE ap.parent_id != 0
        AND ap.menu_type = 1 
        GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.method_name
        HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
      `;
    
        connection.query(query, (error, results) => {
          if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
    
          // Helper function to compare names case-insensitively
          const areNamesEqual = (name1, name2) => name1.toLowerCase() === name2.toLowerCase();
    
          // Process the data to group by page_group and create an object
          const groupedData = results.reduce((acc, row) => {
            const { page_group_id, page_group, controller_name, display_name, method_name } = row;
            const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase
    
            if (!acc[pageGroupLowerCase]) {
              acc[pageGroupLowerCase] = {
                page_group_id,
                page_group: pageGroupLowerCase, // Store in lowercase
                controllers: [],
              };
            }
    
            const controller = acc[pageGroupLowerCase].controllers.find((c) => areNamesEqual(c.controller_name, controller_name)); // Compare names case-insensitively
    
            if (controller) {
              const display = controller.display_names.find((display) => areNamesEqual(display.display_name, display_name)); // Compare names case-insensitively
              if (display) {
                display.method_names.push(method_name);
              } else {
                controller.display_names.push({ display_name, method_names: [method_name] });
              }
            } else {
              acc[pageGroupLowerCase].controllers.push({
                controller_name,
                display_names: [{ display_name, method_names: [method_name] }],
              });
            }
    
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
      getPageGroupAndDisplayNameWithId: async (req, res) => {

        //     const query = `
        //     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id, ap.method_name, ap.parent_id, ap.menu_type, ap.method_sort
        //     FROM module_info ap
        //     GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
        //     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
        // `;
    
        // connection.query(query, (error, results) => {
        //     if (error) {
        //         console.error('Error executing MySQL query:', error);
        //         res.status(500).json({ message: 'Internal server error' });
        //         return;
        //     }
    
        //     // Process the data to group by page_group and create an object
        //     const groupedData = results.reduce((acc, row) => {
        //         const { page_group_id, page_group, controller_name, display_name, method_id, method_name, parent_id, menu_type, method_sort } = row;
        //         const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase
    
        //         if (!acc[pageGroupLowerCase]) {
        //             acc[pageGroupLowerCase] = {
        //                 page_group_id,
        //                 page_group: pageGroupLowerCase, // Store in lowercase
        //                 controllers: [],
        //             };
        //         }
    
        //         const controller = acc[pageGroupLowerCase].controllers.find((c) => c.controller_name.toLowerCase() === controller_name.toLowerCase()); // Compare in lowercase
    
        //         if (controller) {
        //             const display = controller.display_names.find((display) => display.display_name.toLowerCase() === display_name.toLowerCase()); // Compare in lowercase
        //             if (display) {
        //                 const method = display.method_names.find((method) => method.method_id === method_id);
        //                 if (method) {
        //                     // If method already exists, just add parent_id, menu_type, and method_sort
        //                     method.parent_id = parent_id;
        //                     method.menu_type = menu_type;
        //                     method.method_sort = method_sort;
        //                 } else {
        //                     display.method_names.push({ method_id, method_name, parent_id, menu_type, method_sort });
        //                 }
        //             } else {
        //                 controller.display_names.push({ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] });
        //             }
        //         } else {
        //             acc[pageGroupLowerCase].controllers.push({
        //                 controller_name,
        //                 display_names: [{ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] }],
        //             });
        //         }
    
        //         return acc;
        //     }, {});
    
        //     const responseData = Object.values(groupedData);
    
        //     if (responseData.length > 0) {
        //         res.json(responseData);
        //     } else {
        //         res.status(404).json({ message: 'Data not found' });
        //     }
        // });
    
    
        // const query = `
        //     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id, ap.method_name, ap.parent_id, ap.menu_type, ap.method_sort
        //     FROM module_info ap
        //     GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
        //     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
        // `;
    
        // connection.query(query, (error, results) => {
        //     if (error) {
        //         console.error('Error executing MySQL query:', error);
        //         res.status(500).json({ message: 'Internal server error' });
        //         return;
        //     }
    
        //     // Process the data to group by page_group and create an object
        //     const groupedData = results.reduce((acc, row) => {
        //         const { page_group_id, page_group, controller_name, display_name, method_id, method_name, parent_id, menu_type, method_sort } = row;
        //         const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase
    
        //         if (!acc[pageGroupLowerCase]) {
        //             acc[pageGroupLowerCase] = {
        //                 page_group_id,
        //                 page_group: pageGroupLowerCase, // Store in lowercase
        //                 controllers: [],
        //             };
        //         }
    
        //         const controller = acc[pageGroupLowerCase].controllers.find((c) => c.controller_name.toLowerCase() === controller_name.toLowerCase()); // Compare in lowercase
    
        //         if (controller) {
        //             const display = controller.display_names.find((display) => display.display_name.toLowerCase() === display_name.toLowerCase()); // Compare in lowercase
        //             if (display) {
        //                 const method = display.method_names.find((method) => method.method_id === method_id);
        //                 if (method) {
        //                     // If method already exists, just add parent_id, menu_type, and method_sort
        //                     method.parent_id = parent_id;
        //                     method.menu_type = menu_type;
        //                     method.method_sort = method_sort;
        //                 } else {
        //                     display.method_names.push({ method_id, method_name, parent_id, menu_type, method_sort });
        //                 }
        //             } else {
        //                 controller.display_names.push({ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] });
        //             }
        //         } else {
        //             acc[pageGroupLowerCase].controllers.push({
        //                 controller_name,
        //                 display_names: [{ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] }],
        //             });
        //         }
    
        //         return acc;
        //     }, {});
    
        //     // Sort display_names based on method_sort in descending order
        //     Object.values(groupedData).forEach((group) => {
        //       group.controllers.forEach((controller) => {
        //           controller.display_names.sort((a, b) => a.method_names[0].method_sort - b.method_names[0].method_sort);
        //       });
        //   });
    
        //     const responseData = Object.values(groupedData);
    
        //     if (responseData.length > 0) {
        //         res.json(responseData);
        //     } else {
        //         res.status(404).json({ message: 'Data not found' });
        //     }
        // });
        const query = `
        SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id, ap.method_name, ap.parent_id, ap.menu_type, ap.method_sort
        FROM module_info ap
        GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
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
            const { page_group_id, page_group, controller_name, display_name, method_id, method_name, parent_id, menu_type, method_sort } = row;
            const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase
    
            if (!acc[pageGroupLowerCase]) {
              acc[pageGroupLowerCase] = {
                page_group_id,
                page_group: pageGroupLowerCase, // Store in lowercase
                controllers: [],
              };
            }
    
            const controller = acc[pageGroupLowerCase].controllers.find((c) => c.controller_name.toLowerCase() === controller_name.toLowerCase()); // Compare in lowercase
    
            if (controller) {
              const display = controller.display_names.find((display) => display.display_name.toLowerCase() === display_name.toLowerCase()); // Compare in lowercase
              if (display) {
                const method = display.method_names.find((method) => method.method_id === method_id);
                if (method) {
                  // If method already exists, just add parent_id, menu_type, and method_sort
                  method.parent_id = parent_id;
                  method.menu_type = menu_type;
                  method.method_sort = method_sort;
                } else {
                  display.method_names.push({ method_id, method_name, parent_id, menu_type, method_sort });
                }
              } else {
                controller.display_names.push({ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] });
              }
            } else {
              acc[pageGroupLowerCase].controllers.push({
                controller_name,
                display_names: [{ display_name, method_names: [{ method_id, method_name, parent_id, menu_type, method_sort }] }],
              });
            }
    
            return acc;
          }, {});
    
          // Add "blank" controller_name for missing method_sort values
          Object.values(groupedData).forEach((group) => {
            group.controllers.forEach((controller) => {
              const methodSorts = controller.display_names.map((display) => display.method_names[0].method_sort);
              for (let i = 0; i <= 5; i++) {
                if (!methodSorts.includes(i)) {
                  controller.display_names.push({ display_name: '', method_names: [{ method_id: '', method_name: '', parent_id: '', menu_type: '', method_sort: i }] });
                }
              }
            });
          });
    
          // Sort display_names based on method_sort in ascending order (lower number to higher number)
          Object.values(groupedData).forEach((group) => {
            group.controllers.forEach((controller) => {
              controller.display_names.sort((a, b) => a.method_names[0].method_sort - b.method_names[0].method_sort);
            });
          });
    
          const responseData = Object.values(groupedData);
    
          if (responseData.length > 0) {
            res.json(responseData);
          } else {
            res.status(404).json({ message: 'Data not found' });
          }
        });
    
      },
}


module.exports = AdminPageListModel