var express = require('express');
var sharp = require('sharp');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});
router.post('/upload', async function(req, res){

  let input;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.render('index', {});
  } 
  else {
    input = req.files.input;
    await sharp(input.data).resize(100,undefined).toFile('./upload/100' + input.name);
    await sharp(input.data).resize(200,undefined).toFile('./upload/200' + input.name);
    await sharp(input.data).resize(400,undefined).toFile('./upload/400' + input.name);
    res.render('download',{link1: './100' + input.name,
    link2: './200' + input.name,
    link3: './400' + input.name});
  }
})

module.exports = router;
