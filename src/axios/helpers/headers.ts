import { deepMerge, isPlainObject } from './util';
import { Method } from '../types';

function normalizeHeaderName(header: any, normalizeName: string): void {
  if (!header) {
    return;
  }
  Object.keys(header).forEach(name => {
    if (
      name !== normalizeName &&
      name.toUpperCase() === normalizeName.toUpperCase()
    ) {
      header[normalizeName] = header[name];
      delete header[name];
    }
  });
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    const val = vals.join(':').trim();
    parsed[key] = val;
  });
  return parsed;
}

export function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common, headers[method], headers);

  const methodsToDelete = [
    'get',
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ];

  methodsToDelete.forEach(method => {
    delete headers[method];
  });

  return headers;
}
