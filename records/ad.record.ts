import { v4 as uuid } from 'uuid';

import { FieldPacket } from 'mysql2';
import { AdEntity, NewAdEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { pool } from '../utils/db';

type AdRecordResult = [AdEntity[], FieldPacket[]]

export class AdRecord implements AdEntity {
  id: string;

  description: string;

  name: string;

  price: number;

  url: string;

  lat: number;

  lon: number;

  constructor(ad: NewAdEntity) {
    AdRecord.validate(ad);
    this.id = ad.id ?? uuid();
    this.name = ad.name;
    this.description = ad.description;
    this.price = ad.price;
    this.url = ad.url;
    this.lat = ad.lat;
    this.lon = ad.lon;
  }

  // eslint-disable-next-line class-methods-use-this
  private static validate(ad: NewAdEntity) {
    if (!ad.name || ad.name.trim().length < 1 || ad.name.trim().length > 100) {
      throw new ValidationError('Nazwa ogłoszenia musi zawierać od 1 do 100 znaków');
    }
    if (ad.description.trim().length > 1000) {
      throw new ValidationError('Opis ogłoszenia nie może przekraczać 1000 znaków');
    }
    if (ad.price < 0 || ad.price > 9999999) {
      throw new ValidationError('Cena musi być większa od 0 ale nie może przekraczać 9 999 999');
    }

    if (!ad.url || ad.url.trim().length > 300) {
      throw new ValidationError('Link do ogłoszenia nie moze być pusty ani przekraczać 300 znaków');
    }

    if (typeof ad.lat !== 'number' || typeof ad.lon !== 'number') {
      throw new ValidationError('Nie można zlokalizować ogłoszenia');
    }
  }

  static async getOne(id: string): Promise<AdRecord | null> {
    const [result] = await pool.execute('SELECT * FROM `ads` WHERE `id` = :id', {
      id,
    }) as AdRecordResult;

    return result.length === 0 ? new AdRecord(result[0]) : null;
  }
}
