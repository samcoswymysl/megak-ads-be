import { AdRecord } from '../records/ad.record';
// import { pool } from '../utils/db';

let newAd: AdRecord;
const newAdId = '456';

beforeAll(() => {
  newAd = new AdRecord({
    id: newAdId,
    name: 'test2',
    description: 'desc',
    price: 1,
    lat: 12.3232,
    url: 'https://localhost:3000',
    lon: 123.422,
  });
});

// afterAll(() => {
//   pool.end();
// });

test('AdRecord returns data from database for one entry', async () => {
  const ad = await AdRecord.getOne('123');
  console.log(ad);
  expect(ad).toBeDefined();
  expect(ad!.id).toBe('123');
  expect(ad!.name).toBe('test');
  expect(ad!.description).toBe('testowy opis');
  expect(ad!.price).toBe(0.00);
  expect(ad!.url).toBe('https://megak.pl');
  expect(ad!.lat).toBe(50.2657152);
  expect(ad!.lon).toBe(18.9945008);
  expect(ad).toBeInstanceOf(AdRecord);
});

test('AdRecord return null from database unexsisting entry', async () => {
  const ad = await AdRecord.getOne('zzz');
  expect(ad).toBeNull();
});
//
test('Find all Ads and return only id and lat & lon', async () => {
  const allAd = await AdRecord.getAll();
  allAd.forEach((ad) => {
    expect(ad).toBeDefined();
    expect(ad!.id).toBeDefined();
    expect(ad!.lat).toBeDefined();
    expect(ad!.lon).toBeDefined();
  });
});
//
test('Add record should be added to db', async () => {
  const id = await newAd.save();
  const checkAdInDb = await AdRecord.getOne(newAdId);

  expect({
    id: newAdId,
    name: 'test2',
    description: 'desc',
    price: 1,
    lat: 12.3232,
    url: 'https://localhost:3000',
    lon: 123.422,
  }).toEqual(checkAdInDb);
  expect(id).toBe(newAdId);
});

test('Remove Ad  should remove ad from db', async () => {
  await newAd.remove();
  const checkAdInDb = await AdRecord.getOne(newAdId);
  expect(checkAdInDb).toBeNull();
});
