import dva from 'dva';
import createLoading from 'dva-loading'
import './main-dev.html';
import './lobby-dev.html';
import './kitchen-dev.html';
import './omzetbon-dev.html';
import './index.css'
import 'antd/dist/antd.css';
// 1. Initialize
const app = dva();
// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/products'));
app.model(require('./models/categories'));
app.model(require('./models/checkbox'));
app.model(require('./models/admincrud'));
app.model(require('./models/bezorgkosten'));
app.model(require('./models/bezorgstatus'));
app.model(require('./models/factors'));
app.model(require('./models/overige'));
app.model(require('./models/basicinfo'));
app.model(require('./models/options'));
// 4. Router

app.router(require('./router'));

// 5. Start
app.start('#root');
