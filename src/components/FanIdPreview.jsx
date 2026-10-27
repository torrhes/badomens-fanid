import FanIdCard from './FanIdCard.jsx';
import { getExportDimensions } from '../lib/exportPng.js';

export default function FanIdPreview({ vertical, exportMode, ...props }) {
  const layout = exportMode === 'vertical' ? 'vertical' : 'horizontal';
  const isExport = Boolean(exportMode);
  const previewVertical = isExport ? layout === 'vertical' : Boolean(vertical);
  const dims = getExportDimensions(layout);

  return (
    <div
      className={`wrap${previewVertical ? ' v' : ''}${isExport ? ' export' : ''}`}
      style={isExport ? { width: dims.width, maxWidth: 'none' } : undefined}
    >
      <div
        className={`scene${previewVertical ? ' v' : ''}${isExport ? ' export' : ''}`}
        data-layout={isExport ? layout : previewVertical ? 'vertical' : 'landscape'}
        style={
          isExport
            ? {
                '--c': '1px',
                width: dims.width,
                height: dims.height,
                aspectRatio: 'auto',
              }
            : undefined
        }
      >
        <div className="strap">BAD OMENS</div>
        <div className="clip" />
        <div className="holder"><FanIdCard {...props} vertical={previewVertical} /></div>
      </div>
    </div>
  );
}
