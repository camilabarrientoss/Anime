/*

{ 
    "1": { 
        "nombre": "Akira", 
        "genero": "Seinen", 
        "ano": "1988", 
        "autor": "Katsuhiro Otomo" 
    }, 
    "2": { 
        "nombre": "Dragon Ball", 
        "genero": "Shonen", 
        "ano": "1986", 
        "autor": "Akira Toriyama" 
    }, 
    "3": { 
        "nombre": "Sailor Moon", 
        "genero": "Shojo", 
        "ano": "1992", 
        "autor": "Naoko Takeuchi" 
    }, 
    "4": { 
        "nombre": "Naruto", 
        "genero": "Shonen", 
        "ano": "2002", 
        "autor": "Masashi Kishimoto"
    }, 
    "5": { 
        "nombre": "Neon Genesis Evangelion", 
        "genero": "Mecha", 
        "ano": "1995", 
        "autor": "Yoshiyuki Sadamoto" 
    } 
}
*/

const express = require('express');
const app = express();
const fs = require('fs/promises');

const PORT = 3000;

// ej: http://localhost:3000/
app.get('/', async (req, res) => {
    try {
        const animeRaiz = JSON.parse(await fs.readFile(__dirname + '/Anime.json'));
        res.status(200).json(animeRaiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
    res.end();
});
//bici=animacion
// ej: http://localhost:3000/read/1
app.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const animeRaiz = JSON.parse(await fs.readFile(__dirname + '/Anime.json'));
        const animacion = animeRaiz[id];
        if (animacion) {
            res.status(200).json(animacion);
        } else {
            res.status(404).json({
                status: 'OK',
                message: 'No existe ese anime'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
    res.end();
});

// ej: http://localhost:3000/create?nombre=Akira&genero=Seinen&ano=1988&autor=Katsuhiro-Otomo
app.get('/create', async (req, res) => {
    try {
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const ano = req.query.ano;
        const autor = req.query.autor;
        const animacion = {
            nombre,
            genero,
            ano,
            autor
        }
        const animeRaiz = JSON.parse(await fs.readFile(__dirname + '/Anime.json'));
        const id = new String(Number(Object.keys(animeRaiz)[Object.keys(animeRaiz).length - 1]) + 1);
        animeRaiz[id] = animacion;
        await fs.writeFile(__dirname + '/Anime.json', JSON.stringify(animeRaiz));
        res.status(201).json(animeRaiz);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
});


// ej: http://localhost:3000/update/1?nombre=Akira&genero=Seinen&ano=1988&autor=Katsuhiro-Otomo
app.get('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const ano = req.query.ano;
        const autor = req.query.autor;
        let encontrado = false;

        const animeRaiz = JSON.parse(await fs.readFile(__dirname + '/Anime.json'));
        let animacion = animeRaiz[id];
        if (animacion) {
            animacion.nombre = nombre;
            animacion.genero = genero;
            animacion.ano = ano;
            animacion.autor = autor;
            encontrado = true;
        }

        if (encontrado) {
            await fs.writeFile(__dirname + '/Anime.json', JSON.stringify(animeRaiz));
            res.status(201).json(animeRaiz);
        } else {
            res.status(404).json({
                status: 'OK',
                message: 'No existe anime a actualizar'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
});

// ej: http://localhost:3000/delete/6
app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const animeRaiz = JSON.parse(await fs.readFile(__dirname + '/Anime.json'));
        delete animeRaiz[id];
        await fs.writeFile(__dirname + '/Anime.json', JSON.stringify(animeRaiz));
        res.status(201).json(animeRaiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
    res.end();
});



app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));


module.exports = { 
    app 
};