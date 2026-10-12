import test from 'node:test';
import assert from 'node:assert/strict';

import { dedupeVenuePresets, normalizeVenuePresets } from '../src/featureBPresetUtils.mjs';

test('dedupeVenuePresets keeps only one preset per venue and keeps the latest values', () => {
  const original = [
    { id: 'preset_a', venueId: 'venue-1', slots: ['2026-10-12|17:00'], gameIds: ['g1'] },
    { id: 'preset_b', venueId: 'venue-2', slots: ['2026-10-12|18:00'], gameIds: ['g2'] },
    { id: 'preset_c', venueId: 'venue-1', slots: ['2026-10-12|19:00'], gameIds: ['g3'] }
  ];

  const result = dedupeVenuePresets(original, { id: 'preset_d', venueId: 'venue-1', slots: ['2026-10-12|19:00'], gameIds: ['g3'] });

  assert.equal(result.length, 2);
  assert.deepEqual(result.map(item => item.venueId).sort(), ['venue-1', 'venue-2']);
  assert.equal(result.find(item => item.venueId === 'venue-1').id, 'preset_d');
});

test('normalizeVenuePresets removes duplicate venue entries without losing the latest preset', () => {
  const original = [
    { id: 'old', venueId: 'venue-9', slots: ['2026-10-12|17:00'], gameIds: ['g1'] },
    { id: 'latest', venueId: 'venue-9', slots: ['2026-10-12|18:00'], gameIds: ['g2'] },
    { id: 'other', venueId: 'venue-3', slots: [], gameIds: ['g4'] }
  ];

  const result = normalizeVenuePresets(original);

  assert.equal(result.length, 2);
  assert.equal(result.find(item => item.venueId === 'venue-9').id, 'latest');
  assert.deepEqual(result.find(item => item.venueId === 'venue-3').gameIds, ['g4']);
});
