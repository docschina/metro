/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint sort-keys: 0 */

'use strict';

const siteConfig = {
  title: 'Metro',
  tagline: '\uD832\uDE87 React Native 的 JavaScript 构建工具',
  url: 'https://facebook.github.io',
  baseUrl: '/metro/',
  projectName: 'metro',
  repo: 'facebook/metro',
  editUrl: 'https://github.com/facebook/metro/edit/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: '文档'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: '帮助'},
    {blog: true, label: '博客'},
    {languages: true},
    {search: true},
    {href: 'https://github.com/facebook/metro', label: 'GitHub'},
  ],
  headerIcon: 'img/metro.svg',
  footerIcon: 'img/metro.svg',
  favicon: 'img/favicon/favicon.ico',
  ogImage: 'img/opengraph.png',
  recruitingLink: 'https://crowdin.com/project/metro',
  algolia: {
    apiKey: process.env.ALGOLIA_METRO_API_KEY,
    indexName: 'metro',
  },
  gaTrackingId: 'UA-44373548-17',
  colors: {
    primaryColor: '#ef4242',
    secondaryColor: '#f96e6e',
    prismColor: 'rgba(153, 66, 79, 0.03)',
  },
  cleanUrl: true,
  scripts: [
    'https://buttons.github.io/buttons.js',
  ],
};

module.exports = siteConfig;
