const EVENT = require('../models/event');
const axios = require('axios');
exports.createNewEvent = (req, res) => {
    EVENT.create({
        ...req.body
    }, (err, newEvent) => {
        if (err) {
            return res.status(500).json({ message: 'an error has occurred', err })
        } else {
            return res.status(200).json({ message: 'new event created', newEvent })
        }
    })
};

exports.fetchAllEvents = (req, res) => {
    let searchConditions = {};
    if (req.query.title) {
        searchConditions.title = req.query.title
    }
    if (req.query.category) {
        searchConditions.category = req.query.category
    }
    if (req.query.image) {
        searchConditions.image = req.query.image
    }
       //image url API
    let event_category = 'regular' || 'business' || 'casual' || 'party'
    axios.get(`https://imagegen.herokuapp.com/?${category=event_category}`)
        .then(res => {
            console.log(res.data.image)
        })
        .catch(err => {
            console.log(err)
    }) 
    EVENT.find(searchConditions, (err, events) => {
        if (err) {
            return res.status(500).json({ message: 'an error has occurred', err })
        } else {
            return res.status(200).json({ events })
        }
    })
};

exports.fetchSingleEvent = (req, res) => {
    EVENT.findById(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).json({ message: 'an error has occurred', err })
        }
        else if (!event) {
            return res.status(404).json({ message: 'event not available' })
        }
        else {
            return res.status(200).json({ event })
        }
    })
};

exports.updateSingleEvent = (req, res) => {
    EVENT.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        cost: req.body.cost,
        category: req.body.category
    }, (err, event) => {
        if (err) {
            return res.status(500).json({ message: 'error has occurred', err })
        } else if (!event) {
            return res.status(404).json({ message: 'event not available' })
        } else {
            event.save((err, updatedEvent) => {
                if (err) {
                    return res.status(500).json({ message: 'error has occurred', err })
                } else {
                    return res.status(200).json({ message: 'event updated successfully', updatedEvent })
                }
            })
        }
    })
};

exports.deleteSingleEvent = (req, res) => {
    EVENT.findByIdAndDelete(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).json({ message: 'error has occurred', err })
        }
        else if (!event) {
            return res.status(404).json({ message: 'event not available' })
        }
        else {
            return res.status(200).json({ message: 'event successfully deleted' })
        }
    })
};