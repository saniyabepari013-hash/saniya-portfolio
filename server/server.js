const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Saniya Bepari Portfolio Backend is running!',
    status: 'Success'
  });
});

app.get('/api/portfolio', (req, res) => {
  res.json({
    name: 'Saniya Abdul Aziz Bepari',
    role: 'Aspiring Software Developer',
    education: 'BCA - Third Year',
    graduation: 2027,
    skills: [
      'HTML', 'CSS', 'JavaScript', 'React.js',
      'Node.js', 'Express.js', 'MySQL', 'Python',
      'PHP', 'SQL', 'Tailwind CSS', 'Power BI', 'Excel'
    ],
    linkedin: 'https://www.linkedin.com/in/saniya-bepari-603184321/'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
