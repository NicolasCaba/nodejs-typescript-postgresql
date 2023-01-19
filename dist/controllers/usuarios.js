"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usuario_1.default.findAll();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send({ error, message: 'No se pudo obtener la lista de usuarios' });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield usuario_1.default.findByPk(id);
        if (response) {
            res.status(200).send(response);
        }
        else {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
        }
    }
    catch (error) {
        res.status(400).send({ error, message: 'No se pudo obtener usuario por id' });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            res.status(400).send({ message: 'Ya existe un usuario con el email ingresado' });
            return;
        }
        const response = yield usuario_1.default.create(body);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(400).send({ error, message: 'No se pudo crear el usuario' });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
            return;
        }
        if (body.email) {
            const busquedaEmail = yield usuario_1.default.findOne({
                where: {
                    email: body.email
                }
            });
            if (busquedaEmail && busquedaEmail.id !== usuario.id) {
                res.status(400).send({ message: `El email ya esta en uso` });
                return;
            }
        }
        const response = yield usuario.update(body);
        res.status(204).send(response);
    }
    catch (error) {
        res.status(400).send({ error, message: 'No se pudo actualizar el usuario' });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).send({ message: `No existe un usuario con el id ${id}` });
            return;
        }
        const response = yield usuario.update({ estado: false });
        res.status(200).send({ message: 'Registro eliminado' });
    }
    catch (error) {
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map