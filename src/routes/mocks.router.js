import { Router } from 'express';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';


import UserModel from '../Dao/models/User.js';
import PetModel from '../Dao/models/Pet.js';

const router = Router();

//generar usuarios mockeados
const generateMockUsers = (count) => {
    const users = [];
    
    for (let i = 0; i < count; i++) {
        let first_name= faker.person.firstName();
        let last_name =faker.person.lastName();

        users.push({
            first_name,
            last_name,
            email: faker.internet.email({first_name, last_name}),
            password: bcrypt.hashSync("coder123", 10),
            role: Math.random() > 0.5 ? "user" : "admin",
            pets: []
        });
    }
    return users;
};

// Endpoint GET /mockingusers para generar 50 usuarios
router.get('/mockingusers', async (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.json({ status: 'success', users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint POST /generateData para generar e insertar datos en la BD
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        if (!users || !pets) {
            return res.status(400).json({ status: 'error', message: 'Se requieren los parámetros users y pets.' });
        }

        // Generar e insertar usuarios
        const userMocks = generateMockUsers(users);
        await UserModel.create(userMocks);

        // Generar e insertar mascotas
        const petMocks = [];
        for (let i = 0; i < pets; i++) {
            petMocks.push({
                name: faker.animal.cat(),
                specie: 'cat',
                owner: faker.database.mongodbObjectId()
            });
        }
        await PetModel.create(petMocks);

        res.json({ status: 'success', message: 'Usuarios y mascotas generados e insertados correctamente.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Mocking de mascotas (migrado desde el primer desafío entregable)
router.get('/mockingpets', (req, res) => {
    const pets = [];
    for (let i = 0; i < 10; i++) {
        pets.push({
            name: faker.animal.dog(),
            breed: faker.animal.dog(),
            age: faker.number.int({ min: 1, max: 15 })
        });
    }
    res.json({ status: 'success', pets });
});

export default router;
