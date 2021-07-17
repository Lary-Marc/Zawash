const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Manager = require('../models/Manager');  

router.get('/', (req, res) => {
    res.render('sign', {
        title: "Register Manager",
        alert: req.query.alert
    })
})


router.post("/", async (req, res) => {
    
    const manager = new Manager(req.body);
    await Manager.register(manager, req.body.password, (err) => {
        if (err) {
            res.status(400).render('sign', { title: "Register Manager", alert: 'error' })
            console.log(err)
        } else {
            res.redirect('manager?alert=success')
        }
    })
})


module.exports = router