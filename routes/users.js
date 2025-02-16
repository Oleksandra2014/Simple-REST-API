const express = require("express");
const userRouter = express.Router();
const { User } = require("../config/firebaseConfig");

// GET /users - Retrieve all users.
userRouter.get("/users", async (req, res) => {
    try {
        const snapshot = await User.get();
        const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(allUsers);
    } catch (error) {
        res.status(500).send({ error: 'Error' });
    }
});

// POST /users - Add a new user.
userRouter.post("/users", async (req, res) => {
    try {
        const newUser = req.body;
        await User.add(newUser);
        res.send({ message: "New user has been created successfuly" });
    } catch (error) {
        res.status(500).send({ error: "Error, user was not created" });
    }
});

// PUT /users/:id - Update an existing user by ID.
userRouter.put("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const userCheck = await User.doc(id).get(); 
        // check if user exists in db
        if (!userCheck.exists){
            return res.status(404).send({ error: "User was not found" })
        }
        await User.doc(id).update(updatedData); // update only provided data
        res.send({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error, user data was not updated" });
    }
});

//DELETE /users/:id - Delete a user by ID.
userRouter.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userCheck = await User.doc(id).get(); 
        // check if user exists in db
        if (!userCheck.exists){
            return res.status(404).send({ error: "User was not found" })
        }     
        await User.doc(id).delete();
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: 'Error, user was not deleted' });
    }
});

module.exports = userRouter;

