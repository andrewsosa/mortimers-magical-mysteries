import { MongoClient } from "mongodb";

import * as Sentry from "@sentry/node";
import "@sentry/tracing";

Sentry.init({
  dsn: process.env.SENTRY_DSN_NODE,
  tracesSampleRate: 1.0,
});

/**
 *
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  const mongodb = new MongoClient(process.env.MONGODB_URI);
  const db = mongodb.db(process.env.MONGODB_DATABASE);
  const collection = db.collection("magic-items");

  const { sliderValue, selectedRarities, selectedItemKinds } = req.body;

  console.log(sliderValue, selectedRarities, selectedItemKinds);

  const cursor = collection.aggregate([
    {
      $match: {
        rarity: { $in: selectedRarities },
        type: { $in: selectedItemKinds },
      },
    },
    { $sample: { size: sliderValue } },
  ]);

  const results = await cursor.toArray().then((arr) =>
    arr.map(({ _id, name, ...rest }) => ({
      id: _id,
      name,
      link: `https://www.dndbeyond.com/magic-items?filter-search=${name}`,
      ...rest,
    }))
  );

  res.json({ results });
}
