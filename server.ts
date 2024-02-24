import * as express from 'express';
import mongoose from 'mongoose';
import User from './models/userModel';


const app = express();

// Use express.json() middleware
app.use(express.json());
// to use a form
// app.use(express.urlencoded({extended: false}))

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/todo', (req, res) => {
    res.send('Hello, Blog! My name is Andrew.');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ message: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ message: error.message });
    }
});

app.post('/users',async (req, res) => {
    try {
        const users = await User.create(req.body);
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
});

// when you update you use put or patch method
app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body);
        res.status(200).json(user);
        // we can not find any product in database
        if(!user){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        //latest entry in database
        const updateUser = await User.findById(id);
        // res.status(200).json(user);  
        res.status(200).json(updateUser);  
    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ message: error.message });  
    }
});
 // delete 

 app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id,req.body);
        // we can not find any product in database
        if(!user){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(user);  
    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ message: error.message });  
    }
});

// Start the server
mongoose.connect('mongodb+srv://mugaboandre:nirere1983@cluster0.egksdmd.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    
});
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
