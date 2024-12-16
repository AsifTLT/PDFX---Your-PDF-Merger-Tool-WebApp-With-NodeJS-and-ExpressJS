import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

app.use('/static', express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), "templates/index.html")); // Use process.cwd() for ES Modules
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files)
  let d = await mergePdfs(path.join( req.files[0].path), path.join( req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
