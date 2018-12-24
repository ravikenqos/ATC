'use strict';

const request = require('request');
const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(5, 'second');

class Rest {

  constructor() {
    this.url = '';
    this.headers = {};
    this.request = {};
  }

  _setOptions(methodName) {
    let options = {
        url: this.url,
        method: methodName,
        form: this.request
      };
      if (!this.headers || Object.keys(this.headers).length == 0) {
        throw new Error('headers not defined');
      }
      options.headers = this.headers;
      return options;
  }

  async doPost() {
    let options = _setOptions('POST');
    return await _request(options);
  }

  async doPut() {
    let options = _setOptions('PUT');
    return await _request(options);
  }

  async doGet() {
    let options = _setOptions('GET');
    return await _request(options);
  }

  async doDelete() {
    let options = _setOptions('GET');
    return await _request(options);
  }

  _request (options) {
    return new Promise(async (resolve, reject) => {
      try {
        limiter.removeTokens(1, () => {
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                } else if (!body) {
                    return reject(new Error('Response is empty'));
                } else {
                    return resolve ({ body: body, response: response} );
                }
           });
        });
      } catch (e) {
        // log
        reject(e);
      }
    })
  }
}

module.exports = Rest;
