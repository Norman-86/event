const express = require('express');
//calling an instance of router
const router = express.Router();
const eventCtrl = require('../controllers/eventControllers');

// POST request /events to Create a new event
router.post('/events', eventCtrl.createNewEvent);

// GET request /events to Fetch all events
router.get('/events', eventCtrl.fetchAllEvents);

// GET request /events/:id to Fetch a single event
router.get('/events/:id', eventCtrl.fetchSingleEvent);

// PUT request /events/:id to Update a single event
router.put('/events/:id', eventCtrl.updateSingleEvent);

// DELETE request /events/:id to Destroy a single event
router.delete('/events/:id', eventCtrl.deleteSingleEvent);
module.exports = router;