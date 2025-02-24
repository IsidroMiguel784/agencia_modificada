import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimonios, paginaValoraciones, paginaViajes, paginaDetallesViajes, guardarTestimonios, guardarValoraciones} from "../controllers/paginaController.js";

const router = express.Router();

//req lo que enviamos / res lo que nos responde
router.get('/', paginaInicio);

router.get('/nosotros',paginaNosotros);

router.get('/viajes',paginaViajes);

router.get('/testimonios', paginaTestimonios);

router.get('/valoraciones', paginaValoraciones);

//Los dos puntos es como un comodín y no repetir las páginas
router.get('/viajes/:slug',paginaDetallesViajes);

router.post('/testimonios', guardarTestimonios);

router.post('/valoraciones', guardarValoraciones);

export default router;
