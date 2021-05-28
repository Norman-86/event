const express = require('express');
//calling an instance of router
const router = express.Router();
const eventCtrl = require('../controllers/eventControllers');
const { authenticateUser, checkIfAdmin } = require('../middlewares/authentication');

// POST request /events to Create a new event
router.post('/events', authenticateUser, checkIfAdmin, eventCtrl.createNewEvent);

// GET request /events to Fetch all events
router.get('/events', authenticateUser, eventCtrl.fetchAllEvents);

// GET request /events/:id to Fetch a single event
router.get('/events/:id', authenticateUser, eventCtrl.fetchSingleEvent);

// PUT request /events/:id to Update a single event
router.put('/events/:id', authenticateUser, checkIfAdmin, eventCtrl.updateSingleEvent);

// DELETE request /events/:id to Destroy a single event
router.delete('/events/:id', authenticateUser, checkIfAdmin, eventCtrl.deleteSingleEvent);
module.exports = router;