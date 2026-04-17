export function getStatus(req, res) {
  res.status(200).send({message: 'server is good!'});
}