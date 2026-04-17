import express from 'express'; 
import statusRoutes from './features/status/status.routes.js';
import optionRoutes from './features/option/option.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoutes);
app.use(optionRoutes);

app.listen(3000, () => {
  console.log('connect on http://localhost:3000');
});