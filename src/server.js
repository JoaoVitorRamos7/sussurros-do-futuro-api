import express from 'express'; 
import statusRoutes from './features/status/status.routes.js';

const app = express();

app.use(statusRoutes);

app.listen(3000, () => {
  console.log('connect on http://localhost:3000');
});