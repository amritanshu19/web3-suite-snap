(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.snap = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports.onRpcRequest = async ({
  origin,
  request
}) => {
  let state1 = await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  });
  let state2 = await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  });
  if (!state1) {
    state2 = {
      textcontent: []
    };
    
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state2]
    });
  }
  if (!state1) {
    state1 = {
      book: []
    };
    
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state1]
    });
  }
  switch (request.method) {
    case 'storePassword':
      state1.book.push({
        name: request.params.nameToStore,
        Password: request.params.PasswordToStore
      });
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state1]
      });
      return true;
    case 'storetext':
      state2.textcontent.push({
        textToSend: request.params.textToSend
      });
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state2]
      });
      return true;
    case 'retrievePassword':
      return state1.book;
    case 'hello':
      let Password_book = state1.book.map(function (item) {
        return `${item.name}: ${item.Password}`;
      }).join("\n");
      return wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: `Hello, ${origin}!`,
          description: 'Password book:',
          textAreaContent: Password_book
        }]
      });
    case 'hellochat':
      
      
      
      return wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: `Hello, ${origin}!`,
          description: 'all text stored:',
          textAreaContent: state2
        }]
      });
    default:
      throw new Error('Method not found.');
  }
};

},{}]},{},[1])(1)
});