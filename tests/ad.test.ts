import { AdRecord } from '../records/ad.record';

test('AdRecord returns data from database for one entry', async () => {
  const ad = await AdRecord.getOne('123');
  expect(ad).toBeDefined();
  expect(ad!.id).toBe('123');
  expect(ad!.name).toBe('test');
  expect(ad!.description).toBe('testowy opis');
  expect(ad!.price).toBe(0.00);
  expect(ad!.lat).toBe(50.2657152);
  expect(ad!.lon).toBe(18.9945008);
  expect(ad).toBeInstanceOf(AdRecord);
});

test('AdRecord return null from database unexsisting entry', async () => {
  const ad = await AdRecord.getOne('zzz');
  expect(ad).toBeNull();
});
