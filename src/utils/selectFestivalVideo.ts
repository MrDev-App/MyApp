import {
  FestivalVideoEntry,
  HomeScreenVideoConfig,
} from '../types/festivalVideo';
import imagePath from '@assets/index';

/**
 * Normalizes dates like "2026-9-24" or "2026-09-24" into standard "YYYY-MM-DD"
 */
function normalizeDateStr(dateStr?: string): string {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('-');
  if (parts.length === 3) {
    const y = parts[0];
    const m = parts[1].padStart(2, '0');
    const d = parts[2].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return dateStr.trim();
}

export function selectActiveFestivalVideo(
  config: HomeScreenVideoConfig,
  today: Date = new Date(),
): FestivalVideoEntry | null {
  if (!config?.featureEnabled) {
    console.log('[FestivalVideo] featureEnabled is false');
    return null;
  }

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const active = (config.videos || []).filter(v => {
    const start = normalizeDateStr(v.startDate);
    const end = normalizeDateStr(v.endDate);
    const isMatch = todayStr >= start && todayStr <= end;
    console.log(`[FestivalVideo] Checking "${v.festivalName}": Today=${todayStr}, Range=${start} to ${end} -> Match=${isMatch}`);
    return isMatch;
  });

  if (active.length === 0) {
    console.log('[FestivalVideo] No active festival video found for date:', todayStr);
    return null;
  }

  const selected = active.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
  console.log('[FestivalVideo] Selected active festival video:', selected.festivalName, selected.videoUrl);
  return selected;
}

export function resolveFestivalVideoSource(
  config: HomeScreenVideoConfig,
  today: Date = new Date(),
): any {
  const activeVideo = selectActiveFestivalVideo(config, today);

  if (activeVideo) {
    if (activeVideo.type === 'remote' && activeVideo.videoUrl) {
      return { uri: activeVideo.videoUrl };
    }
    if (
      activeVideo.type === 'bundled' &&
      activeVideo.assetKey &&
      (imagePath as any)[activeVideo.assetKey]
    ) {
      return (imagePath as any)[activeVideo.assetKey];
    }
  }

  // Fallback to default asset
  const defaultKey = config?.defaultAssetKey;
  if (defaultKey && (imagePath as any)[defaultKey]) {
    return (imagePath as any)[defaultKey];
  }

  return imagePath.bhaktiVideo;
}
