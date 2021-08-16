import bcrypt from 'bcrypt';
import * as DevelopmentSeed from './development';
import usersModel from '@models/users.model';
import facilitiesModel from '@models/facilities.model';
import config from 'config';
import { logger } from '@utils/logger';

export function seedRunner() {
  const { executeSeed } = config.get('dbConfig');
  const env = config.get('env');
  if (!executeSeed) return;

  switch (env) {
    case 'development':
      doSeed(DevelopmentSeed);
      break;
    default:
      doSeed(DevelopmentSeed);
  }
}

const doSeed = seedData => {
  if (seedData.DevelopmentUsersSeed) {
    logger.info('----- RUNNING USERS SEED ------');
    loadUsers(seedData.DevelopmentUsersSeed);
  }
  if (seedData.DevelopmentFacilitiesSeed) {
    logger.info('----- RUNNING FACILITIES SEED ------');
    loadFacilities(seedData.DevelopmentFacilitiesSeed);
  }
};

const loadUsers = async usersData => {
  usersModel
    .deleteMany()
    .then(async () => {
      usersData = await Promise.all(
        usersData.map(async u => {
          const password = await bcrypt.hash(u.password, 10);
          return {
            ...u,
            password
          };
        })
      );
      usersModel
        .insertMany(usersData)
        .then(() => {
          logger.info('-----USERS SEED LOADED-----');
        })
        .catch(e => {
          logger.error('Could not execute users seed');
        });
    })
    .catch(() => {
      logger.error('Could not clean users collection');
    });
};

const loadFacilities = async facilitiesData => {
  facilitiesModel
    .deleteMany()
    .then(() => {
      facilitiesModel
        .insertMany(facilitiesData)
        .then(() => {
          logger.info('----- FACILITIES SEED LOADED -----');
        })
        .catch(() => {
          logger.error('Could not execute facilities seed');
        });
    })
    .catch(() => {
      logger.error('Could not clean facilities collection');
    });
};
