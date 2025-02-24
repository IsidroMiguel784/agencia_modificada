import Sequelize from "sequelize";
import db from "../config/db.js";

export const Valoracion = db.define("valoraciones", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // me aseguro de que el `id` sea autoincremental
    },
    nombre: {
        type: Sequelize.STRING
    },
    correoelectronico: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mensaje: {
        type: Sequelize.STRING
    },
    mejora: {
        type: Sequelize.STRING
    },
    estrella: {
        type: Sequelize.STRING
    }},{
    tableName: 'valoraciones', // Asegúrate de que la tabla se llame 'clientes'
    timestamps: false, // Si no deseas los campos `createdAt` y `updatedAt`
});

// Sincroniza la base de datos
Valoracion.sync({ alter: true }).catch(console.error);