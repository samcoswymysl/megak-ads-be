import { Router } from 'express';
import { AdRecord } from '../records/ad.record';

export const adRouter = Router();

adRouter
  .get('/search/:name?', async (req, res) => {
    const ads = await AdRecord.getAll(req.params.name ?? '');
    res.json(ads);
  })

  .get('/id/:id', async (req, res) => {
    const ad = await AdRecord.getOne(req.params.id);
    res.json(ad);
  })
  .post('/', async (req, res) => {
    const newAdData = req.body;
    const ad = new AdRecord(newAdData);
    const id = await ad.save();

    res.json(id);
  });
