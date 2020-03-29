var express = require('express'),
    path = require('path'),
    jade = require('jade'),
    active = require('./routes/active'),
    recovered = require('./routes/recovered');
    deceased = require('./routes/deceased'),
    all = require('./routes/all');

var app = new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/active', active);
app.use('/recovered', recovered);
app.use('/deceased', deceased);
app.use('/all', all);

app.get('/',function(req,res){
  res.render('active', { title: 'Locate COVID-19 Patients in India', subtitle: 'with the help of open APIs' });
});

app.listen(3000)
