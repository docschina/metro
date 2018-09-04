/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CompLibrary = require('../../core/CompLibrary.js');
const React = require('react');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require('../../server/translate.js').translate;

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content: (
          `在我们的详细文档中可以找到你想要的内容指南。\n\n- 了解如何[开始使用](/metro/docs/en/getting-started.html) Metro。\n- 解决 Metro 相关[疑难问题](/metro/docs/en/troubleshooting.html)。\n- 学习如何[配置 Metro](/metro/docs/en/configuration.html)。\n- 查看完整的 [API 文档](/metro/docs/en/api.html)。`
          
        ),
        title: '浏览文档',
      },
      {
        content: (
          `提出你的问题，并尝试从其他 Metro 用户那里寻找到岸。\n\n- 加入 [Reactiflux](http://www.reactiflux.com/) 的 [#metro](https://discordapp.com/channels/102860784329052160/103622435865104384) channel on [Reactiflux](http://www.reactiflux.com/) 频道，这是一个 Discord 社区。\n- 社区的大部分成员都使用 Stack Overflow。使用 **metrojs** 标记搜索[现有问题](https://stackoverflow.com/questions/tagged/metrojs)，或者[提出你的问题](https://stackoverflow.com/questions/ask)!`
        ),
        title: '加入社区',
      },
      {
        content: (
          `关注 Metro 的最新资讯。\n\n- 关注 [Metro](https://twitter.com/MetroBundler) 的 Twitter。\n- 订阅 [Metro 的博客](/metro/blog/)。`
        ),
        title: `保持最新`,
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>
                获取帮助?
              </h2>
            </header>
            <p>
              Metro 构建工具由 Facebook 的 JavaScript Foundation 团队全职维护。团队成员会帮你解决任何问题。
            </p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

Help.defaultProps = {
  language: 'en',
};

module.exports = Help;
