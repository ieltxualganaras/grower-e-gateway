import { Router } from 'express';
import FacilitiesController from '@controllers/facilities.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class FacilitiesRoutes implements Routes {
  public path = '/facilities';
  public router = Router();
  public facilitiesController = new FacilitiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.facilitiesController.getFacilities);
  }
}

export default FacilitiesRoutes;
