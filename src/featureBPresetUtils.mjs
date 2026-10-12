export function normalizeVenuePresets(presets = []) {
  const normalized = Array.isArray(presets) ? presets.filter(Boolean) : [];
  const deduped = [];

  normalized.forEach((preset) => {
    const safePreset = {
      id: preset.id || `preset_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      venueId: preset.venueId || null,
      slots: Array.from(new Set((preset.slots || []).filter(Boolean))),
      gameIds: Array.from(new Set((preset.gameIds || []).filter(Boolean))),
      label: preset.label || ''
    };

    if (!safePreset.venueId && safePreset.slots.length === 0 && safePreset.gameIds.length === 0) {
      return;
    }

    const existingIndex = deduped.findIndex(item => item.venueId && safePreset.venueId && item.venueId === safePreset.venueId);
    if (existingIndex >= 0) {
      deduped[existingIndex] = safePreset;
    } else {
      deduped.push(safePreset);
    }
  });

  return deduped;
}

export function dedupeVenuePresets(presets = [], nextPreset = null, activePresetId = null) {
  const base = normalizeVenuePresets(presets);
  const safeNext = nextPreset
    ? {
        id: nextPreset.id || `preset_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        venueId: nextPreset.venueId || null,
        slots: Array.from(new Set((nextPreset.slots || []).filter(Boolean))),
        gameIds: Array.from(new Set((nextPreset.gameIds || []).filter(Boolean))),
        label: nextPreset.label || ''
      }
    : null;

  if (!safeNext || !safeNext.venueId) {
    return base;
  }

  const activeIndex = activePresetId ? base.findIndex(item => item.id === activePresetId) : -1;
  const venueIndex = base.findIndex(item => item.venueId === safeNext.venueId);

  const nextList = base.filter(item => {
    if (activeIndex >= 0 && item.id === activePresetId) return false;
    return item.venueId !== safeNext.venueId;
  });

  if (activeIndex >= 0 && activePresetId) {
    nextList.splice(activeIndex, 0, safeNext);
    return nextList;
  }

  if (venueIndex >= 0) {
    nextList.splice(venueIndex, 0, safeNext);
    return nextList;
  }

  return [...nextList, safeNext];
}
