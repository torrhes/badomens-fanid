import html2canvas from 'html2canvas';

// Tamanho de referência de cada layout (mesmas unidades usadas no CSS).
const SIZES = {
  landscape: { w: 960, h: 760 },
  vertical: { w: 480, h: 1024 },
};

export async function toPngBlob(el) {
  await document.fonts.ready;
  const { w, h } = SIZES[el.dataset.layout] || SIZES.landscape;
  const canvas = await html2canvas(el, {
    scale: 2, backgroundColor: null, useCORS: true,
    onclone: (d) => {
      const s = d.getElementById('scene');
      if (!s) return;
      s.style.width = `${w}px`;
      s.style.height = `${h}px`;
      s.style.maxWidth = 'none';
      s.style.aspectRatio = 'auto';
      s.style.setProperty('--c', '1px');
    },
  });
  return new Promise((res) => canvas.toBlob(res, 'image/png'));
}
export function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
