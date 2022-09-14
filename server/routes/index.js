const express = require('express');
const router = express.Router();
const User = require('../models/property.model');

router.get('/', (req, res) => {
    res.send('server runnning')
})

router.get('/users/all', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json({ properties: users });
    }
    catch(err) {
        res.status(500).json({
            message: 'Problem occured while fetching properties',
            err
        });
    }
})

router.post('/user/create', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).json({
            message: 'Property created successfully',
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Property creation failed!',
            err
        })
    }

})

router.delete('/user/delete', async(req, res) => {
    console.log(req.query)
    const { id } = req.query;

    try {
        const data = await User.findByIdAndDelete(id)
        console.log(data);
        res.status(200).json({
            message: `Porperty with id - ${id} successfully deleted`,
        })
    }
    catch (err) {
        res.status(400).json({
            message: `Porperty could not be removed`,
            err,
        })
    }
})


module.exports = router;