












<figure>
	<img src='/img/components/piqueme/piqueme-1500x750.jpg' width='100%' />
	<figcaption>Aw . . . Let's peak inside guys!</figcaption>
</figure>

##### Premium DOM Component

# Piqueme

## Pique their interest


<address>
<img src='/img/48x48/rwtools.png' /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2021-02-17>Feb 17, 2021</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td><p>The <span class=product>Piqueme</span> DOM component is a just-in-time continuous feed of articles featuring collapsable/expandable UI cards.</p> </td></tr>
</table>

### Background

Visitors appreciate the compact beauty of UI cards. They provide so much more
than a simple hyperlink.

UI cards typically have some combination of these elements: image, headline
and/or lede paragraph. UI cards give visitors the gist of hyperlinked articles
without the effort — for visitors, there's no forward navigation to check out a
new page; and there's no back navigation to continue where they left off.

UI cards *keep visitors on the same page*, and keep them reading your content.

The <span>rwt-piqueme</span> goes two steps further than the classic UI
card: 1) it allows the visitor to read the entire article without ever leaving
the original document, and 2) it saves network bandwidth by fetching articles
only when needed.

The <span>rwt-piqueme</span> component has these features:

   * Articles are initially displayed in *UI card* format with splash image, caption,
      kicker, headline, subhead, byline, dateline and lede.
   * Visitors can choose to read the full article *in situ*, that is, without ever
      leaving the host page.
   * UI cards can be toggled between collapsed and expanded states, to show just the
      UI card, or the full article.
   * Articles are fetched just-in-time, when the visitor scrolls down to that part of
      the document.
   * A document that contains a large set of potential UI cards will only fetch
      what's needed, and only when it's needed.
   * Each component instance handles a single on-demand article.

#### In the wild

To see examples of this component in use, visit any of these sites, and be sure
to look under-the-hood at the source code to see how easy it is to use the
component.


<table>
	<tr><td><a href='https://javascriptfanboi.com'>javascriptfanboi.com</a></td><td>JAVASCRIPT FANBOI</td></tr>
	<tr><td><a href='https://2020stack.com'>2020stack.com</a></td><td>2020 STACK</td></tr>
	<tr><td><a href='https://grok.readwritetools.com'>grok.readwritetools.com</a></td><td>READ WRITE GROK</td></tr>
</table>

### Installation

#### Prerequisites

The <span>rwt-piqueme</span> DOM component works in any browser that
supports modern W3C standards. It has no other prerequisites. Distribution and
installation are done with either NPM or via Github.

#### Download


<details>
	<summary>Download using NPM</summary>
	<p><b>OPTION 1:</b> Familiar with Node.js and the <code>package.json</code> file?<br />Great. Install the component with this command:</p>
	<pre lang=bash>
npm install rwt-piqueme<br />	</pre>
	<p><b>OPTION 2:</b> No prior experience using NPM?<br />Just follow these general steps:</p>
	<ul>
		<li>Install <a href='https://nodejs.org'>Node.js/NPM</a> on your development computer.</li>
		<li>Create a <code>package.json</code> file in the root of your web project using the command:</li>
		<pre lang=bash>
npm init<br />		</pre>
		<li>Download and install the DOM component using the command:</li>
		<pre lang=bash>
npm install rwt-piqueme<br />		</pre>
	</ul>
	<p style='font-size:0.9em'>Important note: This DOM component uses Node.js and NPM and <code>package.json</code> as a convenient <i>distribution and installation</i> mechanism. The DOM component itself does not need them.</p>
</details>


<details>
	<summary>Download using Github</summary>
	<p>If you prefer using Github directly, simply follow these steps:</p>
	<ul>
		<li>Create a <code>node_modules</code> directory in the root of your web project.</li>
		<li>Clone the <span class=product>rwt-piqueme</span> DOM component into it using the command:</li>
		<pre lang=bash>
git clone https://github.com/readwritetools/rwt-piqueme.git<br />		</pre>
	</ul>
</details>

### Using the component

After installation, you should add two things to your HTML page to make use of
it:

   1. Add a `script` tag to load the component's `rwt-piqueme.js` file:
```html
<script src='/node_modules/rwt-piqueme/rwt-piqueme.js' type=module></script>             
```

   2. Add articles to the page one by one, identifying their location with the
      component's `sourceref` attribute:
```html
<rwt-piqueme sourceref='/2021/Jan/article01.html'></rwt-piqueme>

<rwt-piqueme sourceref='/2021/Feb/article02.html'></rwt-piqueme>

<rwt-piqueme sourceref='/2021/Mar/article03.html'></rwt-piqueme>

<rwt-piqueme sourceref='/2021/Apr/article04.html'></rwt-piqueme>
```


### Article meta data

The UI card properties that the visitor sees are extracted in real-time from
each article. They are pulled from `<meta>` tags placed in each article's `<head>`.
You should configure your web server to add the following meta tags:


<dl>
	<dt><code>picueme:photo</code></dt>
	<dd>The URL to a picture to splash across the top of the UI card.</dd>
	<dt><code>piqueme:caption</code></dt>
	<dd>A one line description of the splash picture.</dd>
	<dt><code>piqueme:kicker</code></dt>
	<dd>A word or short phrase placed above the headline.</dd>
	<dt><code>piqueme:headline</code></dt>
	<dd>The article's title.</dd>
	<dt><code>piqueme:subhead</code></dt>
	<dd>The article's subtitle.</dd>
	<dt><code>piqueme:byline</code></dt>
	<dd>The author of the article.</dd>
	<dt><code>piqueme:dateline</code></dt>
	<dd>The date the article was published.</dd>
	<dt><code>piqueme:lede</code></dt>
	<dd>The first paragraph of the article.</dd>
	<dt><code>piqueme:textblock</code></dt>
	<dd>An HTML DOM selector referencing the <code>&lt;div&gt;</code> that contains the text of the article.</dd>
</dl>

All `<meta>` tags are optional. Configure only the ones that you want displayed in
the UI card.

Note that all URL's are subject to the browser's same-origin security policy. If
articles or images are coming from a different server, you must ask that
server's administrator to configure CORS permissions for your origin server.

### UI card layout and styling

The HTML layout for the UI card is configured in the component's `rwt-piqueme.blue`
file. Only advanced applications will need to change this.

The default CSS styling uses a dark mode theme. It is configured in the `rwt-piqueme.css`
file. You can replace the contents of this file with CSS that matches your
website's typeface and color theme.

### Life-cycle events

The component issues life-cycle events. These can be used in advanced
applications to trigger other actions.


<dl>
	<dt><code>component-loaded</code></dt>
	<dd>Sent when the component is fully loaded and ready to be used.</dd>
	<dt><code>fetch-complete</code></dt>
	<dd>Sent when an article has been fetched over the network. The event's <code>detail</code> property will contain two values: <code>remoteURL</code> and <code>fetchStatus</code>.</dd>
</dl>

---

### Reference


<table>
	<tr><td><img src='/img/48x48/read-write-hub.png' alt='DOM components logo' width=48 /></td>	<td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/components/piqueme.blue'>READ WRITE HUB</a></td></tr>
	<tr><td><img src='/img/48x48/git.png' alt='git logo' width=48 /></td>	<td>Source code</td> 			<td><a href='https://github.com/readwritetools/rwt-piqueme'>github</a></td></tr>
	<tr><td><img src='/img/48x48/dom-components.png' alt='DOM components logo' width=48 /></td>	<td>Component catalog</td> 	<td><a href='https://domcomponents.com/components/piqueme.blue'>DOM COMPONENTS</a></td></tr>
	<tr><td><img src='/img/48x48/npm.png' alt='npm logo' width=48 /></td>	<td>Package installation</td> <td><a href='https://www.npmjs.com/package/rwt-piqueme'>npm</a></td></tr>
	<tr><td><img src='/img/48x48/read-write-stack.png' alt='Read Write Stack logo' width=48 /></td>	<td>Publication venue</td>	<td><a href='https://readwritestack.com/components/piqueme.blue'>READ WRITE STACK</a></td></tr>
</table>

### License

The <span>rwt-piqueme</span> DOM component is not freeware. After
evaluating it and before using it in a public-facing website, eBook, mobile app,
or desktop application, you must obtain a license from <a href='https://readwritetools.com/licensing.blue'>Read Write Tools</a>
.

<img src='/img/blue-seal-premium-software.png' width=80 align=right />

<details>
	<summary>Piqueme Software License Agreement</summary>
	<ol>
		<li>This Software License Agreement ("Agreement") is a legal contract between you and Read Write Tools ("RWT"). The "Materials" subject to this Agreement include the "Piqueme" software and associated documentation.</li>
		<li>By using these Materials, you agree to abide by the terms and conditions of this Agreement.</li>
		<li>The Materials are protected by United States copyright law, and international treaties on intellectual property rights. The Materials are licensed, not sold to you, and can only be used in accordance with the terms of this Agreement. RWT is and remains the owner of all titles, rights and interests in the Materials, and RWT reserves all rights not specifically granted under this Agreement.</li>
		<li>Subject to the terms of this Agreement, RWT hereby grants to you a limited, non-exclusive license to use the Materials subject to the following conditions:</li>
		<ul>
			<li>You may not distribute, publish, sub-license, sell, rent, or lease the Materials.</li>
			<li>You may not decompile or reverse engineer any source code included in the software.</li>
			<li>You may not modify or extend any source code included in the software.</li>
			<li>Your license to use the software is limited to the purpose for which it was originally intended, and does not include permission to extract, link to, or use parts on a separate basis.</li>
		</ul>
		<li>Each paid license allows use of the Materials under one "Fair Use Setting". Separate usage requires the purchase of a separate license. Fair Use Settings include, but are not limited to: eBooks, mobile apps, desktop applications and websites. The determination of a Fair Use Setting is made at the sole discretion of RWT. For example, and not by way of limitation, a Fair Use Setting may be one of these:</li>
		<ul>
			<li>An eBook published under a single title and author.</li>
			<li>A mobile app for distribution under a single app name.</li>
			<li>A desktop application published under a single application name.</li>
			<li>A website published under a single domain name. For this purpose, and by way of example, the domain names "alpha.example.com" and "beta.example.com" are considered to be separate websites.</li>
			<li>A load-balanced collection of web servers, used to provide access to a single website under a single domain name.</li>
		</ul>
		<li>THE MATERIALS ARE PROVIDED BY READ WRITE TOOLS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL READ WRITE TOOLS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</li>
		<li>This license is effective for a one year period from the date of purchase or until terminated by you or Read Write Tools. Continued use, publication, or distribution of the Materials after the one year period, under any of this Agreement's Fair Use Settings, is subject to the renewal of this license.</li>
		<li>Products or services that you sell to third parties, during the valid license period of this Agreement and in compliance with the Fair Use Settings provision, may continue to be used by third parties after the effective period of your license.</li>
		<li>If you decide not to renew this license, you must remove the software from any eBook, mobile app, desktop application, web page or other product or service where it is being used.</li>
		<li>Without prejudice to any other rights, RWT may terminate your right to use the Materials if you fail to comply with the terms of this Agreement. In such event, you shall uninstall and delete all copies of the Materials.</li>
		<li>This Agreement is governed by and interpreted in accordance with the laws of the State of California. If for any reason a court of competent jurisdiction finds any provision of the Agreement to be unenforceable, that provision will be enforced to the maximum extent possible to effectuate the intent of the parties and the remainder of the Agreement shall continue in full force and effect.</li>
	</ol>
</details>

#### Activation

To activate your license, copy the `rwt-registration-keys.js` file to the *root
directory of your website*, providing the `customer-number` and `access-key` sent to
your email address, and replacing `example.com` with your website's hostname.
Follow this example:

<pre>
export default [{
    "product-key": "rwt-piqueme",
    "registration": "example.com",
    "customer-number": "CN-xxx-yyyyy",
    "access-key": "AK-xxx-yyyyy"
}]
</pre>

