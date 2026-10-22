import html2canvas from 'html2canvas';

// A exportação é sempre a carteirinha horizontal (960 x 760),
// independente do layout mostrado na tela.
const W = 960;
const H = 760;

export async function toPngBlob(el) {
  await document.fonts.ready;
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    width: W,
    height: H,
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
