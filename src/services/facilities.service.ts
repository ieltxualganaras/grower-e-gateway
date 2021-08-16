import { CreateFacilityDto } from '@dtos/facilities.dto';
import { HttpException } from '@exceptions/HttpException';
import { Facility } from '@interfaces/facilities.interface';
import facilityModel from '@models/facilities.model';
import { isEmpty } from '@utils/util';

class FacilityService {
  public facilities = facilityModel;

  public async findAllFacilities(): Promise<Facility[]> {
    const facilities: Facility[] = await this.facilities.find();
    return facilities;
  }

  public async findFacilityById(facilityId: string): Promise<Facility> {
    if (isEmpty(facilityId)) throw new HttpException(400, 'id required');

    const findFacility: Facility = await this.facilities.findOne({ _id: facilityId });
    if (!findFacility) throw new HttpException(409, `Couldn't find facility with id: ${facilityId}`);

    return findFacility;
  }

  public async createFacility(facilityData: CreateFacilityDto): Promise<Facility> {
    if (isEmpty(facilityData)) throw new HttpException(400, 'Invalid request');

    const findFacility: Facility = await this.facilities.findOne({ name: facilityData.name });
    if (findFacility) throw new HttpException(409, `${facilityData.name} already exists`);

    const createFacilityData: Facility = await this.facilities.create({ ...facilityData });

    return createFacilityData;
  }

  public async updateFacility(facilityId: string, facilityData: CreateFacilityDto): Promise<Facility> {
    if (isEmpty(facilityData)) throw new HttpException(400, 'Invalid request');

    if (facilityData.name) {
      const findFacility: Facility = await this.facilities.findOne({ name: facilityData.name });
      if (findFacility && findFacility._id != facilityId) throw new HttpException(409, `${facilityData.name} already exists`);
    }

    const updateFacilityById: Facility = await this.facilities.findByIdAndUpdate(facilityId, { facilityData });
    if (!updateFacilityById) throw new HttpException(409, 'Facility does not exist');

    return updateFacilityById;
  }

  public async deleteFacility(facilityId: string): Promise<Facility> {
    const deleteFacilityById: Facility = await this.facilities.findByIdAndDelete(facilityId);
    if (!deleteFacilityById) throw new HttpException(409, 'Facility does not exist');

    return deleteFacilityById;
  }
}

export default FacilityService;
