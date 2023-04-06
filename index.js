/*
    dependecias
*/

const express = require('express')
const admin = require('firebase-admin');


/*
    config - express
*/
const app = express()
/*
    config-firebase
*/
const serviceAccount = require('./serviceAccountKey');

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/*
    endpoint
*/

app.get('/posts', (request, response) => {
    let posts =[
      {
        caption:'Golden Gate Bridge',
        location:'san Francisco'
      },
      {
        caption:'London Eye',
        location:'London'
      }
    ]
    response.send(posts)
  })

/*
    endpoint - createPosts
*/

app.post('/createPost', (request, response) => {
    response.set('Access-Control-Allow-Origin','*')
    response.send(request.headers)
})

/*
    listen
*/

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening to port ${port}`));

