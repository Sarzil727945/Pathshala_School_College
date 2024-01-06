const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/submit-form', (req, res) => {
  const cssContent = req.body.css;

  // Generate a folder structure based on the current date and time
  const cssFolderPath = path.join(__dirname, 'admin_template');

  // Create the folder structure if it doesn't exist
  if (!fs.existsSync(cssFolderPath)) {
    fs.mkdirSync(cssFolderPath, { recursive: true });
  }
  const cssFilePath = path.join(cssFolderPath, `admin_template.css`);
          fs.writeFileSync(cssFilePath, cssContent);

  res.json({ message: 'CSS file generated successfully', cssFilePath});
});

app.get('/get-css-content/:file', (req, res) => {
  const cssFileName = req.params.file; // Use req.params.file to get the value of :file parameter
  const cssFilePath = path.join(__dirname, 'admin_template', cssFileName);

  try {
    // Read the content of the specified CSS file
    const generatedCssContent = fs.readFileSync(cssFilePath, 'utf-8');

    res.json(generatedCssContent );
  
  } catch (error) {
    // Handle file read error
    console.error('Error reading CSS file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/get-image/:file', (req, res) => {
  const imageFileName = req.params.file;
  const imageFilePath = path.join(__dirname, 'images/2023/11/25/15/59', imageFileName);

  // Check if the image file exists
  if (fs.existsSync(imageFilePath)) {
    res.sendFile(imageFilePath);
  } else {
    res.status(404).json({ error: 'Image file not found' });
  }
});
// app.post('/submit-form', (req, res) => {
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
//   fs.writeFileSync(cssFilePath, cssContent);

//   res.json({ message: 'CSS file generated successfully', cssFilePath });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
 
    const folderPath = path.join(__dirname, '../files/images', getCurrentDateTime());
    
 
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
  
    // const fileName = `${Date.now()}_${file.originalname}`;
    const fileName = `${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files', 5), (req, res) => {
 
  res.json({ message: 'File uploaded successfully' });
});


function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  // const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day}/${hours}/${minutes}`;
}


// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "../../../image")
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${file.originalname}`)
//     // return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const upload = multer({storage})





  app.get('/', (req, res) => {
    res.send('Server running saklain mostak image')
  })


const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})





