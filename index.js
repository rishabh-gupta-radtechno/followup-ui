const express = require('express');
const BodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require('cors')
var companyRouter = require('./router/company')
var roleRouter = require('./router/role')
var userRouter = require('./router/user')
var teamRouter = require('./router/team')
var productRouter = require('./router/product')
var customerRouter = require('./router/customer')
var emailTemplateRouter = require('./router/emailTemplate');
const { errors, isCelebrateError } = require('celebrate');
const app = express();
var db_url = require('./config/db').DB_URL;

mongoose.connect(db_url);

mongoose.connection.on("connected", ()=>{
    console.log("Mongo db Connnected")
})
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");   
//     next();
// });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
});



app.use((error, req, res, next) => {
    if (error.joi) { //if joi produces an error, it's likely a client-side problem   
        return res.status(400).json({
            error: error.joi.message
        });
    } //otherwise, it's probably a server-side problem.  
    return res.status(500).send(error)
});
app.use('/company',companyRouter);
app.use('/role',roleRouter);
app.use('/user',userRouter);
app.use('/team',teamRouter);
app.use('/product',productRouter);
app.use('/customer',customerRouter);
app.use('/emailTemplate',emailTemplateRouter);

app.use(errors()); 
app.listen(3000, ()=>{
    console.log("port is working")
});