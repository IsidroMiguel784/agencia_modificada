import {Viaje} from "../models/Viaje.js";
import {Testimonial} from "../models/Testimoniales.js";
import {Valoracion} from "../models/Valoraciones.js";

import moment from 'moment';

const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try {
        const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment,
        });

    } catch (err) {
        console.log(err);
    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros',
        moment: moment,
    });
}

const paginaViajes = async (req, res) => {
    //Consultar BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Viajes Disponibles',
        viajes: viajes,
        moment: moment,

    });
}

const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    } catch (err) {
        console.log(err);
    }
}

const paginaValoraciones = async (req, res) => {
    try {
        const valoraciones = await Valoracion.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('valoraciones', {
            pagina: 'Valoraciones',
            valoraciones: valoraciones,
            moment: moment,
        });
    } catch (err) {
        console.log(err);
    }
}

//Muestra una página por su Detalle
const paginaDetallesViajes = async (req, res) => {
    // req.params te va a dar los :slug que ponemos al pasarlo del router
    const {slug} = req.params;
    //console.log(slug);
    //por si falla la consulta lo mejor es try catch
    try {
        //Me traigo una sola columna y lo hago con un where donde coincida el slug
        const resultado = await Viaje.findOne({where: {slug: slug}});
        res.render('viaje', {
            pagina: 'Información del Viaje',
            resultado: resultado,
            moment: moment,
        })
    } catch (error) {
        console.log(error);
    }
}

const guardarTestimonios = async (req, res) => {

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if (correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if (errores.length > 0) { //Debemos volver a la vista y mostrar los errores

        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });

        res.render('testimonios', {
            pagina: 'Testimonios',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            testimonios: testimonios,
        })
    } else {//Almacenar el mensaje en la BBDD
        try {

            await Testimonial.create({nombre: nombre, correoelectronico: correo, mensaje: mensaje,});
            res.redirect('/testimonios'); //Guardo en la base de datos y lo envío a la misma vista
        } catch (error) {
            console.log(error);
        }
    }
}

const guardarValoraciones = async (req, res) => {

    const {nombre, correo, mensaje, mejora, estrella} = req.body;

    const errores2 = [];

    if (nombre.trim() === '') {
        errores2.push({mensaje: 'El nombre está vacío'});
    }
    if (correo.trim() === '') {
        errores2.push({mensaje: 'El correo está vacío'});
    }
    if (mensaje.trim() === '') {
        errores2.push({mensaje: 'El mensaje está vacío'});
    }
    if (mejora.trim() === '') {
        errores2.push({mensaje: 'La mejora está vacío'});
    }
    if (estrella.trim() === '') {
        errores2.push({mensaje: 'La estrella está vacío'});
    }

    if (errores2.length > 0) { //Debemos volver a la vista y mostrar los errores

        const valoraciones = await Valoracion.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });

        res.render('valoraciones', {
            pagina: 'Valoraciones',
            errores2: errores2,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            mejora: mejora,
            estrella: estrella,
            valoraciones: valoraciones,
        })
    } else {//Almacenar el mensaje en la BBDD
        try {

            await Valoracion.create({nombre: nombre, correoelectronico: correo, mensaje: mensaje, mejora: mejora, estrella: estrella,});
            res.redirect('/valoraciones'); //Guardo en la base de datos y lo envío a la misma vista
        } catch (error) {
            console.log(error);
        }
    }
}


export {
    paginaInicio,
    paginaViajes,
    paginaTestimonios,
    paginaValoraciones,
    paginaNosotros,
    paginaDetallesViajes,
    guardarTestimonios,
    guardarValoraciones,
}