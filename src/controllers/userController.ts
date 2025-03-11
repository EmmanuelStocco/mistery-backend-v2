// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UserController {
    // Criar um novo usuário
    static async create(req: Request, res: Response): Promise<Response> {
        const userRepository = getRepository(User);
        const { name, email, password } = req.body;

        try {
            const user = userRepository.create({ name, email, password });
            await userRepository.save(user);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Error creating user', error });
        }
    }

    // Buscar todos os usuários
    static async getAll(req: Request, res: Response): Promise<Response> {
        const userRepository = getRepository(User);

        try {
            const users = await userRepository.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ message: 'Error fetching users', error });
        }
    }

    // Buscar um usuário pelo ID
    static async getById(req: Request, res: Response): Promise<Response> {
        const userRepository = getRepository(User);
        const { id } = req.params;
    
        try {            
            const userId = parseInt(id, 10);
                        
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
                
            const user = await userRepository.findOne({ where: { id: userId } });
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Error fetching user', error });
        }
    }
    
    

    // Atualizar um usuário
    static async update(req: Request, res: Response): Promise<Response> {
        const userRepository = getRepository(User);
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }      
        try {

      
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;

            await userRepository.save(user);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Error updating user', error });
        }
    }

    // Deletar um usuário
    static async delete(req: Request, res: Response): Promise<Response> {
        const userRepository = getRepository(User);
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }      
        try {
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await userRepository.remove(user);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(400).json({ message: 'Error deleting user', error });
        }
    }
}
