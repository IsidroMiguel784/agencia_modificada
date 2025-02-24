import Sequelize from "sequelize";
import db from "../config/db.js";

export const Testimonial = db.define("testimoniales", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Asegura que el `id` sea autoincremental
    },
    nombre: {
        type: Sequelize.STRING
    },
    correoelectronico: {
        type: Sequelize.STRING,
        allowNull: false,
        //unique: true,
    },
    mensaje: {
        type: Sequelize.STRING
    }},{
    tableName: 'testimoniales', // Asegúrate de que la tabla se llame 'clientes'
    timestamps: false, // Si no deseas los campos `createdAt` y `updatedAt`
});

// Sincroniza la base de datos
Testimonial.sync({ alter: true }).catch(console.error);