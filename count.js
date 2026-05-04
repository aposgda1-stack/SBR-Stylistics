const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/quiz-questions.json'));
const counts = {};
data.forEach(q => {
  counts[q.chapterId] = (counts[q.chapterId] || 0) + 1;
});
console.log(counts);
