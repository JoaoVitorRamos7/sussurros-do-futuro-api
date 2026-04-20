import express from 'express'; 
import statusRoutes from './features/status/status.routes.js';
import optionRoutes from './features/option/option.routes.js';
import questionRoutes from './features/question/question.routes.js';
import cors from 'cors'

const app = express();

app.use(cors({
  origin: 'http://localhost:5500'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoutes);
app.use(optionRoutes);
app.use(questionRoutes);

app.listen(3000, () => {
  console.log('connect on http://localhost:3000');
});