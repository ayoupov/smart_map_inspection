import express from "express";

const app = express()
const port = 3001

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hack2020',
    password: '12wert',
    port: 5432,
});

const getTableList = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM title_list_table ORDER BY global_id', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.html');
})

app.post('/savetask', (req, res) => {
    const tasks_list = req.body;
    console.log(tasks_list);
    const assemsentList = req.body;

    for (const element of assemsentList) {
        element.inspector = 'Инспектор 3';
        element.assesmentList = {
            carriageway: 3 * 20,
            border_stone: 1 * 20,
            lamp_posts: 4 * 20,
            man_hole: 5 * 20
        };
    }

    fs_extra.writeJsonSync('./dist/assesment_list.json', assemsentList);
});

app.post('/savetask', (req, res) => {
    const tasks_list = req.body; //console.log(tasks_list);

    const inspector1 = [];
    const inspector2 = [];
    const inspector3 = [];
    const inspector4 = [];

    for (const task of tasks_list) {
        if (task.inspector === 'Инспектор 1') {
            inspector1.push(task);
        }

        if (task.inspector === 'Инспектор 2') {
            inspector2.push(task);
        }

        if (task.inspector === 'Инспектор 3') {
            inspector3.push(task);
        }

        if (task.inspector === 'Инспектор 4') {
            inspector4.push(task);
        }
    }

    fs_extra.writeJsonSync('./dist/task_list.json', tasks_list);
    fs_extra.writeJsonSync('./dist/task_list_1.json', inspector1);
    fs_extra.writeJsonSync('./dist/task_list_2.json', inspector2);
    fs_extra.writeJsonSync('./dist/task_list_3.json', inspector3);
    fs_extra.writeJsonSync('./dist/task_list_4.json', inspector4);
});

app.get('/list', (req, res) => {
    getTableList()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
