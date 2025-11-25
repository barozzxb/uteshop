import Counter from '../models/Counter.js';

export async function getNextSkuByGenre({ genreId, pad = 4, sep = '-', session = null }) {
    if (!genreId) throw new Error('genreId is required');

    const seqName = genreId;

    const updated = await Counter.findOneAndUpdate(
        { _id: seqName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true, session }
    );

    const seq = updated.seq;
    const seqStr = String(seq).padStart(pad, '0');
    return `${genreId}${sep}${seqStr}`;
}