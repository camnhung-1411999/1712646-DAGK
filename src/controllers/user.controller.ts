import UserService from "../services/user.service";
import { Request, Response } from "express";
import { User } from "../types/user.type";
class UserController {
  async list(req: Request, res: Response) {
    const users = await UserService.list();
    res.json(users);
  }

  async find(req: Request, res: Response) {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      res.status(403).json({
        name: 'ERROR',
        message: 'TOKEN_NOT_FOUND'
      })
    }
    const user = await UserService.find(accessToken);
    res.json(user);
  }

  async checkPassword(req: Request, res: Response) {
    const input = {
      user: req.params.user,
      password: req.body.password,
    }
    await UserService.checkPassword(input).then((user) => {
      res.json(user);
    }).catch((err) =>{
      res.status(422).json({
        name:'ERROR',
        message:err.message,
      })
    });
    
  }
  async detail(req: Request, res: Response) {
    
    const iuser: User = {
      user: req.body.username,
      password: req.body.password,
    };
    await UserService.detail(iuser).then((user) =>{
      res.json(user);
    }).catch(err => {
      if(err.message === 'NOT_FOUND') {
        res.status(404).json({
          name:'ERROR',
          message:err.message,
        });
      } else {
        res.status(422).json({
          name:'ERROR',
          message:err.message,
        })
      }
    });
  }

  async create(req: Request, res: Response) {
    const input = {
      ...req.body,
    };
    await UserService.create(input).then((user) => {
      res.json(user);
    }).catch(err => {
        res.status(422).json({
            name: 'ERROR',
            message: err.message,
        })
    });
  }
  async update(req: Request, res: Response) {
    const input = {
      ...req.body,
      user: req.params.user,
    };
    const user = await UserService.update(input);
    res.json(user);
  }
}

export default new UserController();
