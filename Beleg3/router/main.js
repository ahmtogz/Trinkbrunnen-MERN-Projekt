const express = require('express');
const router = express.Router();
const loc = require('../models/Location');
const User = require('../models/User');

// Location Routes
router.post("/save", async (req, res) => {
    try {
        console.log(req.body);
        const { titel, address, postCode, city } = req.body;
        const locationExists = await loc.findOne({ titel });
        if (locationExists)
            return res.status(400).json({ message: 'Location already exists' });

        await loc.create({
            titel,
            address,
            postCode,
            city
        });
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Create location failed' });
    }
});

router.get('/addCancel', (req, res) => {
    res.redirect('/home');
});


router.get('/updateDelete/:id', async (req, res) => {
    try {
        const location = await loc.findById(req.params.id).lean();
        res.render('site/updatedelete', { posts: location, displayLink: res.locals.displayLink });
        res.json(location);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await loc.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
        res.redirect('/home');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await loc.findByIdAndDelete(req.params.id);
        res.redirect('/home');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


// User Routes
router.post("/home", async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, responseType } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'User does not exist' });

        const isPasswordCorrect = user.password == password;
        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Wrong Password' });

        // Benutzer in der Session speichern
        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;

        const posts = await loc.find({}).lean();

        if (responseType === 'json') {
            // JSON yanıtı gönder
            res.json({ user, posts, displayLink: user.isAdmin === 'true' });
        } else {
            // HTML yanıtı render et
            res.render('site/home', { user, posts, displayLink: user.isAdmin === 'true' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


// loc.find({}).lean() Ruft alle Standorte aus der MongoDB-Datenbank ab Die .lean()-Methode gibt Dokumente als „lean“ zurück, d. h. sie konvertiert MongoDB-Dokumente nicht in Mongoose-Dokumente.
// Dies ist schneller und verbraucht weniger Speicher, verhindert jedoch die Verwendung von Mongoose-Methoden für Dokumente.

// Mit res.json(locations) werden diese Standorte als Antwort im JSON-Format an den Client gesendet.

router.get('/home', async (req, res) => {
    try {
        const locations = await loc.find({}).lean();
        res.json(locations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// Page Rendering Routes
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('site/login');
});


router.get('/home', (req, res) => {
    loc.find({}).lean().then(posts => {                                                 //Alle eingehenden Standorte werden „posts“ zugeordnet.
        res.render('site/home', { posts: posts, displayLink: res.locals.displayLink });
    });
});


router.get('/add', (req, res) => {
    loc.find({}).lean().then(posts => {
        res.render('site/add', { posts: posts});
    });
});


//Die Methode „req.session.destroy()“ ermöglicht die Zerstörung der Sitzung. Dadurch wird die Sitzung des Benutzers beendet und alle Sitzungsdaten gelöscht
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        console.log('Session destroyed');
        res.redirect('/');
    });

});


module.exports = router;