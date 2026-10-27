import { describe, expect, it } from 'vitest';
import {
  EXPORT_LAYOUTS,
  getExportDimensions,
  getMobileXAppUrl,
  getShareUrl
} from './exportPng.js';
import { isCardComplete } from './validate.js';

describe('export settings', () => {
  it('keeps the default horizontal size', () => {
    expect(EXPORT_LAYOUTS.horizontal).toEqual({ width: 960, height: 760 });
  });

  it('returns the selected vertical size', () => {
    expect(getExportDimensions('vertical')).toEqual({
      width: 480,
      height: 1024
    });
  });

  it('builds a direct share URL for X', () => {
    const url = getShareUrl('Hello', 'https://example.com');
    expect(url.origin).toBe('https://x.com');
    expect(url.pathname).toBe('/intent/post');
    expect(url.searchParams.get('text')).toBe('Hello');
    expect(url.searchParams.get('url')).toBe('https://example.com');
  });

  it('builds a mobile X app deep link with the message', () => {
    const url = getMobileXAppUrl('Hello', 'https://example.com');
    expect(url).toContain('x://post');
    expect(url).toContain('text=');
    expect(url).toContain('Hello');
    expect(url).toContain('https%3A%2F%2Fexample.com');
  });

  it('blocks completion until required fields are filled', () => {
    expect(
      isCardComplete({
        handle: 'user',
        year: '2024',
        top: ['a', 'b', 'c', 'd', 'e']
      })
    ).toBe(true);
    expect(
      isCardComplete({
        handle: 'user',
        year: '2024',
        top: ['a', 'b', 'c', 'd']
      })
    ).toBe(false);
    expect(
      isCardComplete({
        handle: '',
        year: '2024',
        top: ['a', 'b', 'c', 'd', 'e']
      })
    ).toBe(false);
  });
});
