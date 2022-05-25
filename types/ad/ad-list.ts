import { AdEntity } from './ad-entity';

export type AdListElement = Omit<AdEntity, 'name'| 'description' | 'price' | 'url' >
