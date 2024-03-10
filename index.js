const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  {
    id: 1,
    username: 'john_doe',
    password: 'password123',
    expenses: [
      { id: 1, description: 'Groceries', amount: 50 },
      { id: 2, description: 'Dinner', amount: 30 },
    ],
  },
  // 添加更多用户数据...
];

// 用户登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 简单的用户认证，实际应用中需要更安全的方式
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 获取用户的所有消费记录
app.get('/expenses/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ expenses: user.expenses });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 添加新的消费记录
app.post('/expenses/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { description, amount } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newExpense = { id: user.expenses.length + 1, description, amount };
    user.expenses.push(newExpense);
    res.json({ message: 'Expense added successfully', expense: newExpense });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
