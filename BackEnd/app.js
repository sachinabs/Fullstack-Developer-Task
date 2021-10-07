let express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(cors());
let services = require('./modules/services');
let logins = require('./modules/login');
let inprogressStatus  = require('./modules/inprogress');
let pending = require('./modules/pendingBookings');
let delivery = require('./modules/outForDelivery');
let deliveredLists = require('./modules/deliveredLists');
let history = require('./modules/userHistory');
let customerState =require('./modules/customerStatus');
let allBookingStatus =require('./modules/allBookingStatus')
let showAllCompleted = require('./modules/showAllCompleted')
let mailer = require('./modules/sendEmail');
let goto = require('./modules/goToDelivered')

app.get('/login',cors(),(req,res)=>{
    logins.userLogin(req,res);
});

app.get('/signIn',cors(),(req,res)=>{
    logins.userSignIN(req,res);
})


app.get('/service',cors(),(req,res)=>{
   services.userServices(req,res);
})

app.get('/inprogress',(req,res)=>{
    inprogressStatus.inProgress(req,res);
})

app.get('/pendingBookings',(req,res)=>{
    pending.pendingBooking(req,res);

})

app.get('/outForDelivery', cors(),(req,res)=>{
    delivery.delivery(req,res);
})

app.get('/deliveredList',(req,res)=>{
    deliveredLists.deliveredBookings(req,res);
})

app.get('/userHistory',cors(),(req,res)=>{
    history.userHistory(req,res);
})

app.get('/customerStatus',(req,res)=>{
customerState.statusOfBooking(req,res);
})

app.get('/allBookingStatus',cors(), (req,res)=>{
    allBookingStatus.allBookingStatus(req,res);
})

app.get('/showAllCompleted',cors(),(req,res)=>{
    showAllCompleted.showAllCompleted(req,res);
})

app.get('/sendEmail',cors(),(req,res)=>{
    mailer.mailer(req,res);
})

app.get('/update', cors(),(req,res) =>{
    goto.goToDelivery(req,res);
})




const port = 1999;
app.listen( process.env.PORT ||port, () => console.log(`Listening on port ${port}..`));