var express = require('express'),
    router = express.Router();

router.get('/',function(req,res){
  res.render('all', { title: 'Locate all COVID-19 Patients in India', subtitle: 'with the help of open APIs' });
});

module.exports = router;
