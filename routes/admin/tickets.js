var express = require('express');
var router = express.Router();
var ticketsModel = require('./../../models/ticketsModel');



router.get('/', async function (req, res, next) {
    var tickets = await ticketsModel.getTickets();
    res.render('admin/tickets', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        tickets
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await ticketsModel.deleteTicketsById(id);
    res.redirect('/admin/tickets')
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.Fecha != "" && req.body.Lugar != "" && req.body.Direccion != "" && req.body.link != "") {
            await ticketsModel.insertTickets(req.body);
            res.redirect('/admin/tickets')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, message: 'no se cargo la novedad'
        });
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let tickets = await ticketsModel.getTicketsById(id);
    res.render(' admin/modificar', {
        layout: 'admin/layout',
        tickets
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            Fecha: req.body.fecha,
            Lugar: req.body.Lugar,
            Direccion: req.body.Direccion,
            link: req.body.link
        }
        await ticketsModel.modificarTicketsById(obj, req.body.id);
        res.redirect('/admin/tickets');
    }
    catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'no se modifico la novedad'
        })
    }
})

module.exports = router;


