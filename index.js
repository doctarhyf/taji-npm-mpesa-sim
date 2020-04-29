const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKeyStayHome.json');
var app = require('http');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


const db = admin.firestore();


//test();

/*function test() {
    console.log("this is a test function!");

    const quoteData = {
        quote: "Life goes on ...",
        author: "2PAC"
    }

    return db.collection('npm-test').doc('inspiration')
    .set(quoteData).then(() => {
        console.log('nwe quote written to database.');
    })
}*/

const url = require('url');



loadData();

function loadData(){

    let ref = db.collection('tasks');
    let query = ref.where("taskMasterEmail", "==", "drrhyf@yahoo.com")
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          //tojz(doc.data);
          return doc.data();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    
    

}


app.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/plain'});
    const q = url.parse(req.url, true).query;
    const name = q.name;
    const age = q.age;


    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    


    const person = {
        "name" : name,
        "age" : age
      
    };

    
    /*db.collection('persons')
    .add(person).then( ref => {
        console.log("added new person : \n" + pers);
    });*/


    let citiesRef = db.collection('persons');
let allCities = citiesRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


  
    res.end(tojz(loadData));
}).listen(3000);




function tojz(obj){
    return JSON.stringify(obj);
};
/*
getQuote().then(result => {
    console.log(result.body);

    const obj = JSON.parse(result.body);
    const quoteData = {
        quote: obj.quote,
        author: obj.author
    }

    return db.collection('npm-test').doc('inspiration')
    .set(quoteData).then(() => {
        console.log('nwe quote written to database.');
    })
})

exports.quote = function getQuote(){

    return {
        "quote" : "life goes on",
        "author":"2Pac"
    };

}*/