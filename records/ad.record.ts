import { v4 as uuid } from 'uuid';

import { FieldPacket } from 'mysql2';
import { AdEntity, NewAdEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { pool } from '../utils/db';
import { AdListElement } from '../types/ad/ad-list';

type AdRecordResult = [AdEntity[], FieldPacket[]]
type AdAllRecordResult = [AdListElement[], FieldPacket[]]

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

    return result.length !== 0 ? new AdRecord(result[0]) : null;
  }

  static async getAll(name: string): Promise<AdListElement[]> {
    const [results] = await pool.execute('SELECT  `id`,  `lat`, `lon` FROM `ads` WHERE  `name` LIKE :name', {
      name: `%${name}%`,
    }) as AdAllRecordResult;

    return results;
  }

  async save() {
    await pool.execute('INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :price, :url, :lat, :lon)', {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      url: this.url,
      lat: this.lat,
      lon: this.lon,
    });

    return this.id;
  }

  async remove() {
    await pool.execute('DELETE FROM `ads` WHERE  `id`=:id', {
      id: this.id,
    });
  }
}
