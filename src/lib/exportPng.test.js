import { describe, expect, it } from 'vitest';
import {
  EXPORT_LAYOUTS,
  getExportDimensions,
  getShareUrl
} from './exportPng.js';

describe('export settings', () => {
  it('keeps the default horizontal size', () => {
    expect(EXPORT_LAYOUTS.horizontal).toEqual({ width: 960, height: 760 });
  });

  it('returns the selected vertical size', () => {
    expect(getExportDimensions('vertical')).toEqual({
      width: 760,
      height: 1200
    });
  });

  it('builds a direct share URL for X', () => {
    const url = getShareUrl('Hello', 'https://example.com');
    expect(url.origin).toBe('https://x.com');
    expect(url.pathname).toBe('/intent/post');
    expect(url.searchParams.get('text')).toBe('Hello');
    expect(url.searchParams.get('url')).toBe('https://example.com');
  });
});
