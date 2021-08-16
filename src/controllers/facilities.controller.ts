import { NextFunction, Request, Response } from 'express';
import { CreateFacilityDto } from '@dtos/facilities.dto';
import { Facility } from '@interfaces/facilities.interface';
import facilityService from '@services/facilities.service';

class FacilitiesController {
  public facilityService = new facilityService();

  public getFacilities = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFacilitiesData: Facility[] = await this.facilityService.findAllFacilities();

      res.status(200).json({ data: findAllFacilitiesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getFacilityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const facilityId: string = req.params.id;
      const findOneFacilityData: Facility = await this.facilityService.findFacilityById(facilityId);

      res.status(200).json({ data: findOneFacilityData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const facilityData: CreateFacilityDto = req.body;
      const createFacilityData: Facility = await this.facilityService.createFacility(facilityData);

      res.status(201).json({ data: createFacilityData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const facilityId: string = req.params.id;
      const facilityData: CreateFacilityDto = req.body;
      const updateFacilityData: Facility = await this.facilityService.updateFacility(facilityId, facilityData);

      res.status(200).json({ data: updateFacilityData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const facilityId: string = req.params.id;
      const deleteFacilityData: Facility = await this.facilityService.deleteFacility(facilityId);

      res.status(200).json({ data: deleteFacilityData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FacilitiesController;
