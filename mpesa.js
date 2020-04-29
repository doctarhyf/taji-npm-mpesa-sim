const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKeyStayHome.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  
  
const port = 8080;

    res.write('MPESA\n');
    const ex = ('Enter Transation data in the link.\nEx\:http://localhost:'+port+'/userPhone\=0828535960/userMPesaName=Franvale\ Mutunda/amount=450.75/TAJIBalance=5000/ROT=xx66mgwnQi/timestamp=126752838123/confirmed=false/timestampConfirmed=null')
    res.write(ex);
    res.write('\n\nDATA:\n\n\n');
    const url  = req.url;


    /*
    const data = url.split('/');
    const size = data.length + "";

    var trans = {};

    


    for(var i = 1 ; i < size; i++){
        
        var d = data[i];
        var k = d.split("=")[0];
        var v = d.split("=")[1];
        trans[k] = v;

    }

    trans.rot = makeid(10);


    res.write(JSON.stringify(trans));*/

    
    var transaction = require('url').parse(req.url, true).query;

    transaction.timestamp = admin.firestore.Timestamp.fromDate(new Date()).seconds * 1000;

    res.write(JSON.stringify(transaction));

    
    db.collection('taji_transactions').doc().set(transaction).then(snapshot => {

            console.log('transaction saved successfully');

        
      })
      .catch(err => {
        console.log('Error writing transaction', err);
      });

    res.end();
}).listen(8080);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }