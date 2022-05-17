import { AdRecord } from '../../records/ad.record';

export type AdListElement = Omit<AdRecord, 'name'| 'description' | 'price' | 'url' >
