import 'dotenv/config';
import express from 'express';
import { requestLogger } from './middlewares/logger';
import taskRoutes from './routes/taskRoutes';
import { connectDB } from './config';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/auth', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
