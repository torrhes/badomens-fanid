import html2canvas from 'html2canvas';

export const EXPORT_LAYOUTS = {
  horizontal: { width: 960, height: 760 },
  vertical: { width: 760, height: 1200 }
};

export function getExportDimensions(layout = 'horizontal') {
  return EXPORT_LAYOUTS[layout] || EXPORT_LAYOUTS.horizontal;
}

export function getShareUrl(text, url) {
  const shareUrl = new URL('https://x.com/intent/post');
  shareUrl.searchParams.set('text', text);
  shareUrl.searchParams.set('url', url);
  return shareUrl;
}

export function getMobileXAppUrl(text, url) {
  const shareUrl = new URL('x://post');
  shareUrl.searchParams.set('text', `${text} ${url}`.trim());
  return shareUrl.toString();
}

export async function toPngBlob(el, layout = 'horizontal') {
  const { width, height } = getExportDimensions(layout);
  await document.fonts.ready;
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    width,
    height,
    windowWidth: 1280
  });
  return new Promise((res) => canvas.toBlob(res, 'image/png'));
}

export function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
