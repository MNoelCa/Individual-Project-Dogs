const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const router = Router();
const axios = require('axios');


router.get('/', async (req, res) => {
    const name = req.query.name;
    const todasRazas = [];
    let response = [];                                                                                   
    const filterTemp = req.query.filterTemp ?  decodeURIComponent(req.query.filterTemp).split(",") : []; //['amigable', 'tranquilo'] []=>''
 
    if (name) {
        await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        .then(r => {r.data.map(b => todasRazas.push(b))});

        let aux = await Dog.findAll({
            where: {
                name: name
                }
            }, {include: Temperament})
            aux.map(b => todasRazas.push(b.dataValues))

    } else {
        await axios("https://api.thedogapi.com/v1/breeds")
        .then(r => {r.data.map(b => todasRazas.push(b))});
        let aux = await Dog.findAll({
            include: Temperament
        });
        aux.map(b => todasRazas.push(b.dataValues))
    };

    todasRazas.map(r => (response.push({id:r.id, name:r.name, reference_image_id:r.reference_image_id, image: r.image, temperament: r.temperament || r.temperaments && r.temperaments.map(t => t.name).join(', '), height:r.height.metric || r.height, weight: r.weight.metric ||r.weight, life_span: r.life_span})))
    
    if(filterTemp.length) {
        filterTemp.forEach(t => {
            response = response.filter(r => r.temperament && r.temperament.includes(t))  
        });
    }
    res.status(200).json(response);
 

});
/* 
router.get('/names', async (req,res) => {
    let raza = [];
    data = await axios('https://api.thedogapi.com/v1/breeds')
    .then(res => {
        raza.push(res.data.map(r => r.name))
    })
    res.status(200).json(raza);
}); */

router.get('/:idRaza', async (req, res) => {
    const {idRaza} = req.params;
    let raza ;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;   // expresión regular UUID

    if(regexExp.test(idRaza)) {
        raza = await Dog.findByPk(idRaza, {include:Temperament})    
    } else {
        await axios('https://api.thedogapi.com/v1/breeds')          
        .then(res => {
            raza = (res.data.find(r => r.id == idRaza))
        })
    };
  
    if(raza) {
        raza = {id: raza.id, name: raza.name, image: raza.image, temperament: raza.temperament || raza.temperaments && raza.temperaments.map(t => t.name).join(', '), height: raza.height.metric || raza.height, weight: raza.weight.metric || raza.weight, life_span: raza.life_span};
        res.status(200).json(raza);
    } else {
        res.status(404).send('No se encontró ninguna raza que corresponda con ese id')
    }; 

});



router.post('/', async (req,res) => {
    const {name, height, weight, life_span, image, temperament} = req.body;
    if(name && height && weight) {
        try{
            const newBreed = await Dog.create({
                name: name,
                height: height,
                weight: weight,
                life_span: life_span,
                image: image
                });
                temperament.forEach(async t => {
                const temperament = await Temperament.findOne({
                    where:{
                        name: t
                    }
                })
                newBreed.addTemperament(temperament)   //seteo t
            });  
            res.status(201).send(newBreed)
        } catch (err) {
            res.status(500).send(err);
        };
    } else {
        res.status(400).send('Ocurrió un error. Faltan datos obligatorios')
    }
});



module.exports = router;