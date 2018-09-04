// Copyright 2004-present Facebook. All Rights Reserved.

'use strict';

const React = require('react');

const githubButton = (
  <a
    className="github-button"
    href="https://github.com/facebook/metro"
    data-icon="octicon-star"
    data-count-href="/facebook/metro/stargazers"
    data-count-api="/repos/facebook/metro#stargazers_count"
    data-count-aria-label="# stargazers on GitHub"
    aria-label="Star this project on GitHub"
  >
    Star
  </a>
);

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            <img
              src={this.props.config.baseUrl + this.props.config.footerIcon}
              alt={this.props.config.title}
              width="66"
              height="58"
            />
          </a>
          <div>
            <h5>文档</h5>
            <a
              href={
                this.props.config.baseUrl +
                'docs/' +
                this.props.language +
                '/getting-started.html'
              }
            >
              快速开始
            </a>
            <a
              href={
                this.props.config.baseUrl +
                'docs/' +
                this.props.language +
                '/api.html'
              }
            >
              API 文档
            </a>
          </div>
          <div>
            <h5>社区</h5>
            <a
              href="https://stackoverflow.com/questions/tagged/metrojs"
              target="_blank"
            >
              Stack Overflow
            </a>
            <a href="https://twitter.com/MetroBundler" target="_blank">
              Twitter
            </a>
          </div>
          <div>
            <h5>更多</h5>
            <a href={this.props.config.baseUrl + 'blog'}>博客</a>
            <a href="https://github.com/facebook/metro">GitHub</a>
            {githubButton}
          </div>
        </section>

        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          className="fbOpenSource"
        >
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Facebook Inc.
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
