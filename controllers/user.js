
const Blogs = require("../models/blogs");
const Admin = require('../models/admin');
const password = require('../services/security');
const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key";


const register = async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);

    const existingEmployee = await Admin.findOne({ email: data.email });
    if (existingEmployee) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const encryptedPassword = await password.passwordEncryption(data?.password);
    console.log("encryptedPassword", encryptedPassword);

    const addUser = await Admin.create({
      password: encryptedPassword,
      email: data.email,
      username: data.username
    });

    return res.status(200).json({
      data: addUser,
      message: "User added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const adminLogin = async (req, res) => {
  try {
    const data = req.body;

    const user = await Admin.findOne({ email: data.email });
    console.log("data", user)
    if (!user) {
      return res.status(404).send("User does not exist");
    }

    const descrypt = await password.passwordDecryption(user.password);
    console.log("descrypt",descrypt)

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    if (!token) {
      console.error("JWT Token Generation Failed");
      return res.status(500).send("Error generating token");
    }

    if (descrypt === data.password) {
      const userInfo = {
        password: user.password,
        email: user.email,
        userid: user.userid,
      };
      res.send({
        status: true,
        message: "Login successfully",
        data: {
          email: user.email,
          token,
        },
      });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).send("Internal Server Error");
  }
};


const addBlog = async (req, res) => {
  try {
    const data = req.body;
    const addedBlog = await new Blogs(data).save();
    res.status(200).send({
      message: 'Blog added successfully',
    });

  } catch (error) {
    console.error('Error in adding blog.', error);

  }
};

const editBlog = async (req, res) => {
  try {
    const { author, title, description, publishedAt } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ status: false, message: "Blog ID is required" });
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      { author, title, description, publishedAt },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ status: false, message: "Blog not found" });
    }

    res.send({ status: true, message: "Blog updated", data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ status: false, message: "Error updating blog" });
  }
};


const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.send({
      status: true,
      message: 'Blogs retrieved successfully',
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}

const deleteBlog = async (req, res) => {
  try {
    const locationId = req.params.id;
    const deletedBlog = await Blogs.findOneAndDelete({ _id: locationId },
    );
    if (!deletedBlog) {
      return res.status(404).json({
        status: false,
        message: 'blog not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'blog deleted',
      data: deletedBlog,
    });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  addBlog,
  editBlog,
  getBlogs,
  deleteBlog,
  adminLogin,
  register
};
