const express = require("express");
const app = express();
const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"root",
    database:"terampil",
    host:"localhost",
    port:5432
});
app.use(express.json());
const port = 5555;



//JOB
app.post("/addJob", async (req, res) => {
    try {
        const {id,name} = req.body;
        const newJob = await pool.query(`INSERT INTO jobs (id,name) VALUES ('${id}','${name}') RETURNING *`);
        res.json(newJob.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/getJob", async (req, res) => {
    try {
        const newJob = await pool.query("SELECT * FROM jobs");
        res.json(newJob.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.put("/updateJob/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {newid,name} = req.body;
        const newJob = await pool.query(`UPDATE jobs SET id='${newid}', name='${name}' WHERE id='${id}' RETURNING *`);
        res.json(newJob.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});

app.delete("/deleteJob", async (req, res) => {
    try {
        const {id,name} = req.body;
        const newJob = await pool.query(`DELETE FROM jobs WHERE id='${id}' AND name='${name}' RETURNING *`);
        res.json(newJob.rows);
    } catch (err){
        console.error(err.message);
    }
});


//USER
app.post("/addUser", async (req, res) => {
    try {
        const {fullname,job_id,email} = req.body;
        const newJob = await pool.query(`INSERT INTO users (fullname,job_id,email) VALUES ('${fullname}','${job_id}','${email}') RETURNING *`);
        res.json(newJob.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/getUser", async (req, res) => {
    try {
        const newJob = await pool.query("SELECT u.id,u.fullname,j.name job,u.email FROM users u INNER JOIN jobs j ON u.job_id = j.id");
        res.json(newJob.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.put("/updateUser/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {fullname,job,email} = req.body;
        const newJob = await pool.query(`UPDATE users SET fullname='${fullname}', job_id=job.id, email='${email}' FROM (SELECT id FROM jobs WHERE name = '${job}') AS job WHERE users.id='${id}' RETURNING *`);
        res.json(newJob.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});

app.delete("/deleteUser", async (req, res) => {
    try {
        const {id,fullname,job,email} = req.body;
        const newJob = await pool.query(`DELETE FROM users WHERE id='${id}' AND fullname='${fullname}' AND job_id = (SELECT id FROM jobs WHERE name = '${job}') AND email='${email}' RETURNING *`);
        res.json(newJob.rows);
    } catch (err){
        console.error(err.message);
    }
});



app.listen(port, () => {
    console.log(`Listening on ${port}`);
});