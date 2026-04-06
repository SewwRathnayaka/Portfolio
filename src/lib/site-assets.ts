/** Public files under `public/assets/` — add the listed files locally for images to load. */
const base = "/assets";

export const SITE_IMAGES = {
  background: `${base}/images/background.webp`,
  backgroundMobile: `${base}/images/background-mobile.webp`,
  profile: `${base}/images/profile.webp`,
} as const;

export const RESUME_PATH = `${base}/resume.pdf`;
