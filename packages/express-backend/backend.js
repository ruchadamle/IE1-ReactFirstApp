import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];

    userServices.findUserById(id)
        .then((result) => {
            if (result === null) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal server error.");
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];

    userServices.deleteUserById(id)
        .then((result) => {
            if (result === null) {
                res.status(404).send("Resource not found.");
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal server error.");
        });
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    userServices.addUser(userToAdd)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal server error.");
        });
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userServices.getUsers(name, job)
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal server error.");
        });
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});