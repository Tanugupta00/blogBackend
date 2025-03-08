const express = require('express');
const USER = require('../controllers/user');

const router = express.Router();
router.post('/register', USER.register)
router.post("/addPosts", USER.addBlog);
router.put('/editBlog/:id', USER.editBlog)
router.get('/posts', USER.getBlogs)
router.delete('/deleteBlogs/:id', USER.deleteBlog)
router.post('/login', USER.adminLogin)

module.exports = router;
