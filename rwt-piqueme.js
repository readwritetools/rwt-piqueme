/* Copyright (c) 2021 Read Write Tools. Legal use subject to the Piqueme DOM Component Software License Agreement. */
const Static = {
    componentName: 'rwt-piqueme',
    elementInstance: 1,
    htmlURL: '/node_modules/rwt-piqueme/rwt-piqueme.html',
    cssURL: '/node_modules/rwt-piqueme/rwt-piqueme.css',
    htmlText: null,
    cssText: null
};

Object.seal(Static);

export default class RwtPiqueme extends HTMLElement {
    constructor() {
        super(), this.instance = Static.elementInstance++, this.isComponentLoaded = !1, 
        this.placeholderArea = null, this.article = null, this.closebar = null, this.aboveTheFold = null, 
        this.splash = null, this.caption = null, this.kicker = null, this.headline = null, 
        this.subhead = null, this.dateline = null, this.byline = null, this.lede = null, 
        this.pullbar = null, this.belowTheFold = null, this.textblock = null, this.canonicalUrl = null, 
        this.remoteUrl = null, this.intersectionObserver = null, this.fetchStatus = 'awaiting', 
        this.documentFragment = null, Object.seal(this);
    }
    async connectedCallback() {
        if (this.isConnected) try {
            var e = await this.getHtmlFragment(), t = await this.getCssStyleElement();
            this.attachShadow({
                mode: 'open'
            }), this.shadowRoot.appendChild(e), this.shadowRoot.appendChild(t), this.captureSourceref(), 
            this.identifyChildren(), this.registerEventListeners(), this.registerIntersectionObserver(), 
            this.sendComponentLoaded(), this.validate();
        } catch (e) {
            console.log(e.message);
        }
    }
    getHtmlFragment() {
        return new Promise((async (e, t) => {
            var n = `${Static.componentName}-html-template-ready`;
            if (document.addEventListener(n, (() => {
                var t = document.createElement('template');
                t.innerHTML = Static.htmlText, e(t.content);
            })), 1 == this.instance) {
                var i = await fetch(Static.htmlURL, {
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer'
                });
                if (200 != i.status && 304 != i.status) return void t(new Error(`Request for ${Static.htmlURL} returned with ${i.status}`));
                Static.htmlText = await i.text(), document.dispatchEvent(new Event(n));
            } else null != Static.htmlText && document.dispatchEvent(new Event(n));
        }));
    }
    getCssStyleElement() {
        return new Promise((async (e, t) => {
            var n = `${Static.componentName}-css-text-ready`;
            if (document.addEventListener(n, (() => {
                var t = document.createElement('style');
                t.innerHTML = Static.cssText, e(t);
            })), 1 == this.instance) {
                var i = await fetch(Static.cssURL, {
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer'
                });
                if (200 != i.status && 304 != i.status) return void t(new Error(`Request for ${Static.cssURL} returned with ${i.status}`));
                Static.cssText = await i.text(), document.dispatchEvent(new Event(n));
            } else null != Static.cssText && document.dispatchEvent(new Event(n));
        }));
    }
    captureSourceref() {
        0 == this.hasAttribute('sourceref') ? console.error('The rwt-piqueme component must specify a \'sourceref\' attribute with a URL referencing an article') : this.remoteUrl = this.getAttribute('sourceref');
    }
    identifyChildren() {
        this.placeholderArea = this.shadowRoot.getElementById('placeholder-area'), this.article = this.shadowRoot.getElementById('article'), 
        this.closebar = this.shadowRoot.getElementById('closebar'), this.aboveTheFold = this.shadowRoot.getElementById('above-the-fold'), 
        this.splash = this.shadowRoot.getElementById('splash'), this.caption = this.shadowRoot.getElementById('caption'), 
        this.kicker = this.shadowRoot.getElementById('kicker'), this.headline = this.shadowRoot.getElementById('headline'), 
        this.subhead = this.shadowRoot.getElementById('subhead'), this.dateline = this.shadowRoot.getElementById('dateline'), 
        this.byline = this.shadowRoot.getElementById('byline'), this.lede = this.shadowRoot.getElementById('lede'), 
        this.pullbar = this.shadowRoot.getElementById('pullbar'), this.belowTheFold = this.shadowRoot.getElementById('below-the-fold'), 
        this.textblock = this.shadowRoot.getElementById('textblock'), this.canonicalUrl = this.shadowRoot.getElementById('canonical-url');
    }
    registerEventListeners() {
        this.pullbar.addEventListener('click', this.onClickPullbar.bind(this)), this.closebar.addEventListener('click', this.onClickPullbar.bind(this));
    }
    registerIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((e => {
            1 == e[0].isIntersecting && 'awaiting' == this.fetchStatus && this.fetchAndProcess();
        }), {
            threshold: 0
        }), this.intersectionObserver.observe(this.placeholderArea);
    }
    sendComponentLoaded() {
        this.isComponentLoaded = !0, this.dispatchEvent(new Event('component-loaded', {
            bubbles: !0
        }));
    }
    waitOnLoading() {
        return new Promise((e => {
            1 == this.isComponentLoaded ? e() : this.addEventListener('component-loaded', e);
        }));
    }
    onClickPullbar(e) {
        'block' == this.belowTheFold.style.display ? (this.pullbar.innerText = '▼ ▼ ▼', 
        this.pullbar.title = 'Read the full article', this.belowTheFold.style.display = 'none', 
        this.closebar.style.display = 'none') : (this.pullbar.innerText = '▲ ▲ ▲', this.pullbar.title = 'Close the full article', 
        this.belowTheFold.style.display = 'block', this.closebar.style.display = 'block');
    }
    async fetchAndProcess() {
        this.fetchStatus = 'in progress', this.style.cursor = 'wait', this.documentFragment = await this.fetchRemoteUrl(), 
        null == this.documentFragment ? (this.placeholderArea.style.display = 'none', this.article.style.display = 'none', 
        this.fetchStatus = 'failed') : (this.copyFragmentText(), this.fetchStatus = 'complete');
        var e = new CustomEvent('fetch-complete', {
            detail: {
                remoteUrl: this.remoteUrl,
                fetchStatus: this.fetchStatus
            }
        });
        this.dispatchEvent(e), this.style.cursor = 'default';
    }
    async fetchRemoteUrl() {
        if (!this.remoteUrl) return null;
        var e = await fetch(this.remoteUrl, {
            cache: 'no-cache',
            referrerPolicy: 'no-referrer'
        });
        if (200 != e.status && 304 != e.status) return null;
        var t = await e.text(), n = document.createElement('template');
        return n.innerHTML = t, n.content;
    }
    copyFragmentText() {
        this.copyImgSrcFromMeta('piqueme:photo', 'og:image', 'twitter:image', this.splash), 
        this.copyValueFromMetaElement('piqueme:caption', 'og:image:alt', 'twitter:image:alt', this.caption), 
        this.copyValueFromMetaElement('piqueme:kicker', null, null, this.kicker), this.copyValueFromMetaElement('piqueme:headline', 'og:title', 'twitter:title', this.headline), 
        this.copyValueFromMetaElement('piqueme:subhead', null, null, this.subhead), this.copyValueFromMetaElement('piqueme:lede', 'og:description', 'twitter:desciption', this.lede), 
        this.copyValueFromMetaElement('piqueme:dateline', null, null, this.dateline), this.copyValueFromMetaElement('piqueme:byline', null, null, this.byline), 
        this.copyHTMLFromSelector('piqueme:textblock', this.textblock), this.finalFallbacks(), 
        this.canonicalUrl.innerText = this.headline.innerText, this.canonicalUrl.href = this.remoteUrl;
    }
    copyImgSrcFromMeta(e, t, n, i) {
        var s = this.documentFragment.querySelector(`meta[name="${e}"]`);
        null == s && null != t && (s = this.documentFragment.querySelector(`meta[property="${t}"]`)), 
        null == s && null != n && (s = this.documentFragment.querySelector(`meta[name="${n}"]`)), 
        null != s && i.setAttribute('src', s.getAttribute('content'));
    }
    copyValueFromMetaElement(e, t, n, i) {
        var s = this.documentFragment.querySelector(`meta[name="${e}"]`);
        null == s && null != t && (s = this.documentFragment.querySelector(`meta[property="${t}"]`)), 
        null == s && null != n && (s = this.documentFragment.querySelector(`meta[name="${n}"]`)), 
        null != s && (i.innerText = s.getAttribute('content'));
    }
    finalFallbacks() {
        var e;
        '' == this.headline && (null != (e = this.documentFragment.querySelector('title')) && (this.headline = e.innerText));
        '' == this.lede && (null != (e = this.documentFragment.querySelector('meta[name="description"]')) && (this.lede = e.getAttribute('content')));
    }
    copyHTMLFromSelector(e, t) {
        var n = this.documentFragment.querySelector(`meta[name="${e}"]`);
        if (null != n) {
            var i = n.getAttribute('content');
            if (null != i) {
                var s = this.documentFragment.querySelector(i);
                if (null != s) return void (t.innerHTML = s.innerHTML);
            }
        }
        var a = [];
        for (let e = 0; e < this.documentFragment.children.length; e++) switch (this.documentFragment.children[e].tagName) {
          case 'TITLE':
          case 'META':
          case 'LINK':
          case 'STYLE':
          case 'SCRIPT':
            break;

          default:
            a.push(this.documentFragment.children[e].innerHTML);
        }
        t.innerHTML = a.join('\n');
    }
    async validate() {
        if (1 == this.instance) {
            var e = (s = window.location.hostname).split('.'), t = 25;
            if (e.length >= 2) {
                var n = e[e.length - 2].charAt(0);
                (n < 'a' || n > 'z') && (n = 'q'), t = n.charCodeAt(n) - 97, t = Math.max(t, 0), 
                t = Math.min(t, 25);
            }
            var i = new Date;
            i.setUTCMonth(0, 1), (Math.floor((Date.now() - i) / 864e5) + 1) % 26 == t && window.setTimeout(this.authenticate.bind(this), 5e3);
            var s = window.location.hostname, a = `Unregistered ${Static.componentName} component.`;
            try {
                var o = (await import('../../rwt-registration-keys.js')).default;
                for (let e = 0; e < o.length; e++) {
                    var l = o[e];
                    if (l.hasOwnProperty('product-key') && l['product-key'] == Static.componentName) return void (s != l.registration && console.warn(`${a} Register at https://readwritetools.com/registration.blue`));
                }
                console.warn(`${a} rwt-registration-key.js file missing "product-key": "${Static.componentName}"`);
            } catch (e) {
                console.warn(`${a} Be sure to copy rwt-registration-key.js to your website's root directory.`);
            }
        }
    }
    async authenticate() {
        var e = encodeURIComponent(window.location.hostname), t = encodeURIComponent(window.location.href), n = encodeURIComponent(Registration.registration), i = encodeURIComponent(Registration['customer-number']), s = encodeURIComponent(Registration['access-key']), a = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            cache: 'no-cache',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `product-name=${Static.componentName}&hostname=${e}&href=${t}&registration=${n}&customer-number=${i}&access-key=${s}`
        };
        try {
            var o = await fetch('https://validation.readwritetools.com/v1/genuine/component', a);
            if (200 == o.status) await o.json();
        } catch (e) {
            console.info(e.message);
        }
    }
}

window.customElements.define(Static.componentName, RwtPiqueme);