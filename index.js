/*
    dependecias
*/

const express = require('express')
const admin = require('firebase-admin')
let inspect = require('util').inspect
let Busboy = require('busboy');


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
  response.set('Access-Control-Allow-Origin','*')
  let posts = []
   db.collection('posts').orderBy('date', 'desc').get().then(snapshot=>

      {
      snapshot.forEach((doc)=>{
         posts.push(doc.data())
      });
   response.send(posts)
})
})

/*
    endpoint - createPosts
*/

app.post('/createPost', (request, response) => {
    response.set('Access-Control-Allow-Origin','*')

    const bb = busboy({ headers: req.headers });
let fields = {}
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[fieldname]=val
  });

  bb.on('close', () => {
  db.collection('posts').doc(fields.id).set({
    id: fields,id,
    caption:fields.caption,
    location:fields.location,
    date:fields.date,
    imageUrl:'https://firebasestorage.googleapis.com/v0/b/quasargram-aeae6.appspot.com/o/HgH52.jpeg?alt=media&token=07e9af21-27ad-4e69-ac3d-0db71d599ba1'

  })
    response.send('Done parsing form!');
  });
  request.pipe(bb);
})

/*
    listen
*/

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening to port ${port}`));

