import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const response = await Usuario.findAll();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error, message: 'No se pudo obtener la lista de usuarios' });
    }
}


export const getUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await Usuario.findByPk(id);

        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
        }
    } catch (error) {
        res.status(400).send({ error, message: 'No se pudo obtener usuario por id' })
    }

}


export const postUsuario = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            res.status(400).send({ message: 'Ya existe un usuario con el email ingresado' });
            return;
        }

        const response = await Usuario.create(body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error, message: 'No se pudo crear el usuario' });
    }
}


export const putUsuario = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
            return;
        }

        if (body.email) {
            const busquedaEmail = await Usuario.findOne({
                where: {
                    email: body.email
                }
            });

            if (busquedaEmail && busquedaEmail.id !== usuario.id) {
                res.status(400).send({ message: `El email ya esta en uso` });
                return;
            }
        }

        const response = await usuario.update(body);
        res.status(204).send(response);
    } catch (error) {
        res.status(400).send({ error, message: 'No se pudo actualizar el usuario' });
    }
}


export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
            return;
        }

        const response = await usuario.update({ estado: false });
        res.status(200).send({message: 'Registro eliminado'});
    } catch (error) {
        
    }

    
}