const TaskModel = require("../models/TaskModel.js");
const UserModel = require("../models/User.js");

const getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

const saveTask = (req, res) => {
  const { task ,status} = req.body;

  TaskModel.create({ task ,status})
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((e) => {
      res.send({ error: e, msg: "Something Went Wrong!!!" });
    });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { task ,status} = req.body;
  
  TaskModel.findByIdAndUpdate({ _id: id }, { task: task ,updatedAt:Date.now(),status:status}, { new: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).send("Task not found");
      }
      res.send("Updated Successfully...");
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      res.status(500).send("Something went wrong");
    });
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send("Deleted Successfully...");
    })
    .catch((e) => {
      res.send({ error: e, msg: "Something Went Wrong!!!" });
    });
};

const signupUser = async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    //checking user already exists or not
    let userExist = await UserModel.findOne({ email: email});
    console.log(userExist)
    if(userExist){
      return res.send({message:"User Already exists."})
    }

    const user = await UserModel.create({name,email,password})
    
    // Create session after signup
    req.session.userId = user._id;
    req.session.save();

    console.log("New User Created : ",user);

    res.status(201).send({message:"User Signup  successfully.",data:user});
    
  } catch (error) {
    res.status(500).send({message:error})
  }
}

const loginUser = async(req,res)=>{
  try {
    const {email, password}= req.body;
    const user = await UserModel.findOne({email});
    
    if(!user){
      return res.status(400).send({message:"User Not Exist.."})
    }
    // password don't match
    if(user.password !== password){
        return res.status(400).send({ message:'Invalid Password..' });
    }
    
    // Create session after login
    req.session.userId = user._id;
    // console.log(req.session.userId)

    // password matched
    res.status(200).send(user._id);
  } catch (error) {
    res.status(500).send({message:error})
  }
}


module.exports = { getTasks, saveTask, updateTask, deleteTask,signupUser,loginUser};
