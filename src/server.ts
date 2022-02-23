import express from 'express';

const app = express();
app.listen(3000, () => {console.log("The Server is alive")}); 

app.get('/test', (req, res)=> {
  return res.send("hi world, freazing here");
})
app.post('/test-post', (req, res)=> {
  return res.send('checking method put')
})