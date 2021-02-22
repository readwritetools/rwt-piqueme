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
            this.sendComponentLoaded();
        } catch (e) {
            console.log(e.message);
        }
    }
    getHtmlFragment() {
        return new Promise((async (e, t) => {
            var i = `${Static.componentName}-html-template-ready`;
            if (document.addEventListener(i, (() => {
                var t = document.createElement('template');
                t.innerHTML = Static.htmlText, e(t.content);
            })), 1 == this.instance) {
                var n = await fetch(Static.htmlURL, {
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer'
                });
                if (200 != n.status && 304 != n.status) return void t(new Error(`Request for ${Static.htmlURL} returned with ${n.status}`));
                Static.htmlText = await n.text(), document.dispatchEvent(new Event(i));
            } else null != Static.htmlText && document.dispatchEvent(new Event(i));
        }));
    }
    getCssStyleElement() {
        return new Promise((async (e, t) => {
            var i = `${Static.componentName}-css-text-ready`;
            if (document.addEventListener(i, (() => {
                var t = document.createElement('style');
                t.innerHTML = Static.cssText, e(t);
            })), 1 == this.instance) {
                var n = await fetch(Static.cssURL, {
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer'
                });
                if (200 != n.status && 304 != n.status) return void t(new Error(`Request for ${Static.cssURL} returned with ${n.status}`));
                Static.cssText = await n.text(), document.dispatchEvent(new Event(i)), this.validate();
            } else null != Static.cssText && document.dispatchEvent(new Event(i));
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
        var t = await e.text(), i = document.createElement('template');
        return i.innerHTML = t, i.content;
    }
    copyFragmentText() {
        this.copyImgSrcFromMeta('piqueme:photo', this.splash), this.copyValueFromMetaElement('piqueme:caption', this.caption), 
        this.copyValueFromMetaElement('piqueme:kicker', this.kicker), this.copyValueFromMetaElement('piqueme:headline', this.headline), 
        this.copyValueFromMetaElement('piqueme:subhead', this.subhead), this.copyValueFromMetaElement('piqueme:lede', this.lede), 
        this.copyValueFromMetaElement('piqueme:dateline', this.dateline), this.copyValueFromMetaElement('piqueme:byline', this.byline), 
        this.copyHTMLFromSelector('piqueme:textblock', this.textblock), this.copyValueFromMetaElement('piqueme:headline', this.canonicalUrl), 
        this.canonicalUrl.href = this.remoteUrl;
    }
    copyValueFromMetaElement(e, t) {
        var i = this.documentFragment.querySelector(`meta[name="${e}"]`);
        null != i && (t.innerText = i.getAttribute('content'));
    }
    copyImgSrcFromMeta(e, t) {
        var i = this.documentFragment.querySelector(`meta[name="${e}"]`);
        null != i && t.setAttribute('src', i.getAttribute('content'));
    }
    copyHTMLFromSelector(e, t) {
        var i = this.documentFragment.querySelector(`meta[name="${e}"]`);
        if (null != i) {
            var n = i.getAttribute('content');
            if (null != n) {
                var s = this.documentFragment.querySelector(n);
                null != s && (t.innerHTML = s.innerHTML);
            }
        }
    }
    async validate() {
        var e = (s = window.location.hostname).split('.'), t = 25;
        if (e.length >= 2) {
            var i = e[e.length - 2].charAt(0);
            (i < 'a' || i > 'z') && (i = 'q'), t = i.charCodeAt(i) - 97, t = Math.max(t, 0), 
            t = Math.min(t, 25);
        }
        var n = new Date;
        n.setUTCMonth(0, 1), (Math.floor((Date.now() - n) / 864e5) + 1) % 26 == t && window.setTimeout(this.authenticate.bind(this), 5e3);
        var s = window.location.hostname, o = `Unregistered ${Static.componentName} component.`;
        try {
            var a = (await import('../../rwt-registration-keys.js')).default;
            for (let e = 0; e < a.length; e++) {
                var r = a[e];
                if (r.hasOwnProperty('product-key') && r['product-key'] == Static.componentName) {
                    var l = r.registration;
                    return void (s == l ? console.info(`${Static.componentName} registered to ${l}`) : console.warn(`${o} Register at https://readwritetools.com/registration.blue`));
                }
            }
            console.warn(`${o} rwt-registration-key.js file missing "product-key": "${Static.componentName}"`);
        } catch (e) {
            console.error(`${o} Be sure to copy rwt-registration-key.js to your website's root directory.`);
        }
    }
    async authenticate() {
        var e = encodeURIComponent(window.location.hostname), t = encodeURIComponent(window.location.href), i = encodeURIComponent(Registration.registration), n = encodeURIComponent(Registration['customer-number']), s = encodeURIComponent(Registration['access-key']), o = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            cache: 'no-cache',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `product-name=${Static.componentName}&hostname=${e}&href=${t}&registration=${i}&customer-number=${n}&access-key=${s}`
        };
        try {
            var a = await fetch('https://validation.readwritetools.com/v1/genuine/component', o);
            if (200 == a.status) await a.json();
        } catch (e) {
            console.log(e.message);
        }
    }
}

window.customElements.define(Static.componentName, RwtPiqueme);