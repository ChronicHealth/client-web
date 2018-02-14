// @flow
import merge from 'deepmerge';
import prefetch from 'isomorphic-fetch';
import { logout, login } from '@client/actions/pages/sessions/noService';
import store from '../../../configureStore';

import * as storage from '../localStorage';

const getDefaultOptions = (method: string) => ({
  method,
  headers: {
    Authorization: storage.get('token'),
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'default'
});

const fetch = function fetch(url, options) {
  return prefetch(url, options).then(resp => {
    if (resp.status >= 400) {
      if (resp.status === 401) {
        store.dispatch(logout());
      }
      throw new Error('Bad response from server');
    }
    if (resp.headers.get('authorization')) {
      store.dispatch(login(resp.headers.get('authorization')));
    }
    return resp
      .json()
      .then(jsonResp => {
        if (jsonResp.data !== undefined) {
          return jsonResp.data;
        }
        return jsonResp;
      })
      .catch(() => null);
  });
};

export const get = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('GET')));
export const put = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('PUT')));
export const patch = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('PATCH')));
export const post = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('POST')));
export const del = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('DELETE')));

type $url = string | number;

function processUrl(url) {
  if (!url) {
    return '';
  }
  return `/${url}`;
}

export const baseServices = (thisPrefix: string, host: string) => {
  const thisHost = `${host ||
    process.env.API_CONNECTION ||
    'https://beaprogrammer.org/api'}/`;
  function _getUrl(prefix: string, url?: $url) {
    return `${thisHost}${prefix}${processUrl(url)}`;
  }
  return {
    get: (url: $url, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return get(_getUrl(prefix || thisPrefix, url), finalOptions);
    },
    update: (url: $url, body: any = {}, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return patch(_getUrl(prefix || thisPrefix, url), {
        ...finalOptions,
        body: JSON.stringify(body)
      });
    },
    index: (url?: $url, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return get(_getUrl(prefix || thisPrefix, url), finalOptions);
    },
    del: (url?: $url, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return del(_getUrl(prefix || thisPrefix, url), finalOptions);
    },
    create: (body: Object, options?: Object = {}) => {
      const { prefix, url, ...finalOptions } = options;
      return post(_getUrl(prefix || thisPrefix, url), {
        ...finalOptions,
        body: JSON.stringify(body)
      });
    },
    post: (url: string, body: Object, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return post(_getUrl(prefix || thisPrefix, url), {
        ...finalOptions,
        body: JSON.stringify(body)
      });
    },
    search: (searchText: string, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return post(_getUrl(prefix || thisPrefix, 'search'), {
        ...finalOptions,
        body: JSON.stringify({ searchText })
      });
    },
    put: (url: string, body: Object, options?: Object = {}) => {
      const { prefix, ...finalOptions } = options;
      return put(_getUrl(prefix || thisPrefix, url), {
        ...finalOptions,
        body: JSON.stringify(body)
      });
    }
  };
};
