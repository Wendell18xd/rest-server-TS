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
exports.deleteUsuarios = exports.putUsuarios = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findAll({
        where: {
            estado: true,
        },
    });
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({ usuario });
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con id: ${id}`,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield Usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe el email: " + body.email,
            });
        }
        const usuario = Usuario_1.default.build(body);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const existeEmail = yield Usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "No existe un usuario con el id: " + id,
            });
        }
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe el email: " + body.email,
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.putUsuarios = putUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: "No existe un usuario con el id: " + id,
        });
    }
    yield usuario.update({ estado: false });
    // await usuario.destroy(); Elimininacion fisica
    res.json(usuario);
});
exports.deleteUsuarios = deleteUsuarios;
//# sourceMappingURL=usuarios.js.map