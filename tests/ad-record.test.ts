import { AdRecord } from '../records/ad.record';

test('Can build AdRecord', () => {
  const ad = new AdRecord({
    name: 'Buners',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,

  });

  expect(ad.name).toEqual('Buners');
  expect(ad.description).toEqual('blach');
  expect(ad.url).toEqual('https://megak.pl');
  expect(ad.price).toEqual(0);
  expect(ad.lat).toEqual(1);
  expect(ad.lon).toEqual(2);
});

test('Create Add record when name is undefined should throw', () => {
  const wrongAd = {
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,
  } as any;
  expect(() => new AdRecord(wrongAd)).toThrow(/Nazwa ogłoszenia musi zawierać od 1 do 100 znaków/);
});

test('Create Add record when name is only space char should throw', () => {
  const wrongAd = {
    name: '    ',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Nazwa ogłoszenia musi zawierać od 1 do 100 znaków/);
});

test('Create Add record when name is empty string should throw', () => {
  const wrongAd = {
    name: '',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Nazwa ogłoszenia musi zawierać od 1 do 100 znaków/);
});

test('Create Add record when name more than 100 char should throw', () => {
  const wrongAd = {
    name: 'ssssssssssssssssssssafdfsdsfsdfdsfdsfdfsdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssertresss',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Nazwa ogłoszenia musi zawierać od 1 do 100 znaków/);
});

test('Create Add record when description  have 1001 char should throw', () => {
  const wrongAd = {
    name: 'test',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na',
    url: 'https://megak.pl',
    lat: 1,
    price: 0,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Opis ogłoszenia nie może przekraczać 1000 znaków/);
});

test('Create Add record when price is negative number should throw', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: -1,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Cena musi być większa od 0 ale nie może przekraczać 9 999 999/);
});

test('Create Add record when price is greater than 9 999 999', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    url: 'https://megak.pl',
    lat: 1,
    price: 10000000,
    lon: 2,
  };
  expect(() => new AdRecord(wrongAd)).toThrow(/Cena musi być większa od 0 ale nie może przekraczać 9 999 999/);
});

test('Create Add record when url is undefined should throw', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    lat: 1,
    price: 1,
    lon: 2,
  } as any;
  expect(() => new AdRecord(wrongAd)).toThrow(/Link do ogłoszenia nie moze być pusty ani przekraczać 300 znaków/);
});

test('Create Add record when url have 301 char should throw', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    url: 'https://Loremipsumdolorsitametconsectetuer_adipiscing_elit/Aenean/commodo/ligula/eget/dolor/Aenean/massa/Cum/sociis/natoque/penatibus/et/magnis/dis/parturient/montes/nascetur/ridiculus/mus/Donec/quam/felis/ultricies/nec/pellentesque/eu/pretium/quis/sem/Nulla/consequat/massa/quis/enim/Donec/tincidunts',
    lat: 1,
    price: 1,
    lon: 2,
  } as any;
  expect(() => new AdRecord(wrongAd)).toThrow(/Link do ogłoszenia nie moze być pusty ani przekraczać 300 znaków/);
});

test('Create Add record when lat isn\'t number', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    url: 'https://megak.pl',
    price: 1,
    lat: 'lat',
    lon: 2,
  } as any;
  expect(() => new AdRecord(wrongAd)).toThrow(/Nie można zlokalizować ogłoszenia/);
});

test('Create Add record when lon is undefined', () => {
  const wrongAd = {
    name: 'test',
    description: 'blach',
    url: 'https://megak.pl',
    price: 1,
    lat: 'lat',
  } as any;
  expect(() => new AdRecord(wrongAd)).toThrow(/Nie można zlokalizować ogłoszenia/);
});
