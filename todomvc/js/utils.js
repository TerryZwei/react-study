var app = app || {};

(function () {
  'use strict';

  app.Utils = {
    /**
     * 生成一个随机的uuid
     */
    uuid: function () {
      // 生成一个随机的
      var i, random;
      var uuid = '';

      for (i = 0; i < 32; i++) {
        // 生成一个32位的uuid
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8): random)).toString(16);
      }
    },

    pluralize: function (count, word) {
      return count === 1 ? word : word + 's';
    },

    /**
     * 存储、获取数据
     */
    store: function (namespace, data) {
      // set data to localStorage
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }
      // get data from localStorage
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    },

    extend: function () {
      var newObj = {};
      for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
          }
        }
      }
    }
  };
} ());
