const { Router } = require('express');
const { Temperament } = require('../db');
const router = Router();
const axios = require('axios');

router.get('/', async (req,res) => {
    let allTemperaments = await Temperament.findAll();
    if (!allTemperaments.length) {
        await axios("https://api.thedogapi.com/v1/breeds")
        .then(res => res.data.map(r => {
            let aux = r.temperament
            if(aux) {
            aux = aux.split(", ").map(t => {
                if (!allTemperaments.includes(t)) allTemperaments.push(t)
                allTemperaments.sort()
            })}
        }));
        const bulk = []
        allTemperaments.map(t => bulk.push({name: t}));
        Temperament.bulkCreate(bulk);
    } res.status(200).json(allTemperaments);
});
module.exports = router;