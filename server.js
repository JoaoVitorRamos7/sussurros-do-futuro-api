import express from 'express'; 

const app = express();

app.get('/status', (req, res) => {
  res.status(200).send({message: 'server is good!'});
});

app.listen(3000, () => {
  console.log('connect on http://localhost:3000');
});