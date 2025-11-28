import { Manifest } from "@stremio-addon/sdk";
import { Config } from "./types.js";

const STYLESHEET = `
* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

html {
  background: #000;
}

body {
  padding: 2vh;
  font-size: 14px;
  display: flex;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #c8c8c8;
  min-height: 100vh;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

h1 .accent {
  color: #3c943c;
}

h2 {
  font-size: 14px;
  font-weight: normal;
  opacity: 0.7;
  margin-top: 4px;
}

h3 {
  font-size: 14px;
  color: #3c943c;
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

h1,
h2,
h3,
p {
  margin: 0;
}

p {
  font-size: 13px;
}

ul {
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  padding-left: 20px;
  color: #888;
}

ul li {
  padding: 4px 0;
}

a {
  color: #3c943c;
  text-decoration: none;
}

a:hover {
  color: #4db84d;
  text-decoration: underline;
}

.install-link {
  display: block;
  text-decoration: none;
  border: 1px solid #3c943c;
  outline: 0;
  color: #fff;
  background: #3c943c;
  padding: 10px 30px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.15s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.install-link:hover {
  background: #4db84d;
  border-color: #4db84d;
  text-decoration: none;
  color: #fff;
}

.install-link:active {
  background: #2d7a2d;
  border-color: #2d7a2d;
}

#addon {
  width: 420px;
  max-width: 95%;
  margin: auto;
  background: #111;
  padding: 30px;
  border-radius: 4px;
  border: 1px solid #222;
}

.logo {
  margin: 0 auto 20px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 150px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.name {
  margin: 0;
}

.version {
  font-size: 11px;
  color: #666;
  text-align: center;
  margin-top: 20px;
  font-weight: 400;
}

.description {
  font-style: normal;
  color: #888;
  margin-top: 8px;
}

.contact {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #222;
  text-align: center;
}

.contact p {
  color: #666;
  margin-bottom: 4px;
}

.separator {
  margin-bottom: 20px;
}

.form-element {
  margin-bottom: 16px;
}

.label-to-top {
  margin-bottom: 6px;
  color: #888;
  font-size: 13px;
}

.label-to-right {
  margin-left: 8px !important;
  color: #c8c8c8;
}

.full-width {
  width: 100%;
}

input[type="text"],
input[type="number"],
input[type="password"],
select {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #c8c8c8;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 3px;
  font-family: inherit;
  transition: border-color 0.15s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
select:focus {
  outline: none;
  border-color: #3c943c;
}

input[type="checkbox"] {
  accent-color: #3c943c;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
}

.features-list {
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 3px;
  padding: 12px 16px;
  margin-top: 8px;
}

.features-list ul {
  margin: 0;
  padding-left: 16px;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 40px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}

.password-toggle:hover {
  color: #3c943c;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.info-note {
  background: rgba(60, 148, 60, 0.1);
  border: 1px solid rgba(60, 148, 60, 0.3);
  border-radius: 3px;
  padding: 12px 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #aaa;
  line-height: 1.8;
}

.info-note a {
  display: block;
  margin-top: 6px;
}

.info-note strong {
  color: #3c943c;
}

.info-note a {
  color: #3c943c;
}

.info-note a.github {
  color: #fff;
}

.info-note a.github:hover {
  color: #ccc;
}

.info-note a:hover {
  color: #4db84d;
}

.github {
  display: block;
  text-align: center;
  margin-top: 20px;
}

.add-array-row {
  background: none;
  border: none;
  color: #3c943c;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.remove-array-row {
  background: none;
  border: none;
  color: #c93c3c;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}
`;
export function landingTemplate(manifest: Manifest, config: Config): string {
    const logo = manifest.logo || "https://dl.strem.io/addon-logo.png";
    const contactHTML = manifest.contactEmail
        ? `<div class="contact">
      <p>Contact ${manifest.name} creator:</p>
      <a href="mailto:${manifest.contactEmail}">${manifest.contactEmail}</a>
    </div>`
        : "";
    const stylizedTypes = manifest.types.map((t) => t[0].toUpperCase() + t.slice(1) + (t !== "series" ? "s" : ""));
    
    let formHTML = "";
    let script = "";
    if (config && (config.fields || []).length) {
        let options = "";
        config.fields.forEach((elem) => {
            const key = elem.key;
            if (["text", "number"].includes(elem.type)) {
                const isRequired = elem.required ? " required" : "";
                const defaultHTML = elem.default ? ` value="${elem.default}"` : "";
                const inputType = elem.type;
                options += `
        <div class="form-element">
          <div class="label-to-top">${elem.title}${elem.required ? ' <span style="color: red;">*</span>' : ''}</div>
          <input type="${inputType}" id="${key}" name="${key}" class="full-width"${defaultHTML}${isRequired} placeholder="${elem.placeholder || elem.title}"/>
        </div>
        `;
            }
            else if (elem.type === "password") {
                const isRequired = elem.required ? " required" : "";
                const defaultHTML = elem.default ? ` value="${elem.default}"` : "";
                options += `
        <div class="form-element">
          <div class="label-to-top">${elem.title}${elem.required ? ' <span style="color: red;">*</span>' : ''}</div>
          <div class="password-wrapper">
            <input type="password" id="${key}" name="${key}" class="full-width"${defaultHTML}${isRequired} placeholder="${elem.placeholder || elem.title}"/>
            <button type="button" class="password-toggle" data-target="${key}" aria-label="Toggle password visibility">
              <svg class="eye-icon" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              <svg class="eye-off-icon" style="display:none" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
            </button>
          </div>
        </div>
        `;
            }
            else if (elem.type === "array") {
                const templateId = `${elem.key}-row-template`;
                const containerId = `${elem.key}-container`;
                let rowFields = "";
                (elem.arrayOptions || []).forEach((sub: any) => {
                    const subRequired = sub.required ? " required" : "";
                    if (sub.type === 'password') {
                        rowFields += `
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;width:100%;">
              <div class="password-wrapper" style="width:100%;position:relative;">
                <input type="password" data-sub-key="${sub.key}" class="full-width" placeholder="${sub.placeholder || sub.title}"${subRequired} />
                <button type="button" class="password-toggle" aria-label="Toggle password visibility">
                  <svg class="eye-icon" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  <svg class="eye-off-icon" style="display:none" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                </button>
              </div>
            </div>`;
                    } else {
                        const inputType = sub.type === 'number' ? 'number' : 'text';
                        rowFields += `
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
              <input type="${inputType}" data-sub-key="${sub.key}" class="full-width" placeholder="${sub.placeholder || sub.title}"${subRequired} />
            </div>`;
                    }
                });

                options += `
        <div class="form-element">
          <div class="label-to-top">${elem.title}${elem.required ? ' <span style="color: red;">*</span>' : ''}</div>
          <template id="${templateId}">
            <div class="array-row">
              ${rowFields}
              <div style="text-align:right;margin-top:6px;">
                <button type="button" class="remove-array-row">Remove</button>
              </div>
            </div>
          </template>

          <div id="${containerId}"></div>
          <div style="margin-top:8px; margin-bottom:8px">
            <button type="button" class="add-array-row" data-target="${elem.key}">+ Add ${elem.title}</button>
          </div>
        </div>
        `;
            }
        });
        if (options.length) {
            formHTML = `
      <form id="mainForm">
        <h3>Configuration</h3>
        ${options}
      </form>

      <div class="separator"></div>
      `;
            script += `
      installLink.onclick = () => { return mainForm.reportValidity() }

      const buildConfig = () => {
        const fd = new FormData(mainForm);
        const cfg = {};
        // non-array fields
        ${JSON.stringify(((config && config.fields) || []).filter((f) => f.type !== 'array').map((f) => f.key))}.forEach(k => {
          const v = fd.get(k);
          if (v !== null) cfg[k] = v;
        });

        // array fields
        (${JSON.stringify(((config && config.fields) || []).filter((f) => f.type === 'array').map((f) => f.key))}).forEach(k => {
          const rows = [];
          document.querySelectorAll('#' + k + '-container .array-row').forEach(row => {
            const obj = {};
            row.querySelectorAll('[data-sub-key]').forEach(inp => {
              obj[inp.dataset.subKey] = inp.value;
            });
            // only push if at least one subfield has a value
            if (Object.values(obj).some(v => v !== null && v !== undefined && String(v).length > 0)) rows.push(obj);
          });
          cfg[k] = rows;
        });
        return cfg;
      }

      const updateLink = () => {
        const configObj = buildConfig();
        installLink.href = 'stremio://' + window.location.host + window.location.pathname.replace('/configure', '') + '/' + encodeURIComponent(JSON.stringify(configObj)) + '/manifest.json';
      }

      // global toggles for top-level password fields and a fallback helper for array rows
      document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          // try dataset.target first (top-level fields), otherwise find local input inside wrapper (array rows)
          let input = null;
          if (btn.dataset && btn.dataset.target) {
            input = document.getElementById(btn.dataset.target);
          }
          if (!input) {
            const wrapper = btn.closest('.password-wrapper');
            if (wrapper) input = wrapper.querySelector('input');
          }
          if (!input) return;
          const eyeIcon = btn.querySelector('.eye-icon');
          const eyeOffIcon = btn.querySelector('.eye-off-icon');
          if (input.type === 'password') {
            input.type = 'text';
            if (eyeIcon) eyeIcon.style.display = 'none';
            if (eyeOffIcon) eyeOffIcon.style.display = 'block';
          } else {
            input.type = 'password';
            if (eyeIcon) eyeIcon.style.display = 'block';
            if (eyeOffIcon) eyeOffIcon.style.display = 'none';
          }
        });
      });

      // array add/remove behavior
      function addRowForKey(key, values) {
        const tpl = document.getElementById(key + '-row-template');
        const container = document.getElementById(key + '-container');
        if (!tpl || !container) return;
        const clone = tpl.content.firstElementChild.cloneNode(true);
        clone.classList.add('array-row');
        // fill values if provided
        if (values) {
          clone.querySelectorAll('[data-sub-key]').forEach(inp => {
            const name = inp.dataset.subKey;
            if (values[name] !== undefined) inp.value = values[name];
          });
        }
        // attach remove handler and manage visibility
        const rem = clone.querySelector('.remove-array-row');
        const existing = container.querySelectorAll('.array-row');
        if (rem) {
          rem.addEventListener('click', () => {
            clone.remove();
            updateLink();
            // if only one row remains, hide its remove button
            const rows = container.querySelectorAll('.array-row');
            if (rows.length === 1) {
              const onlyRem = rows[0].querySelector('.remove-array-row');
              if (onlyRem) onlyRem.style.display = 'none';
            }
          });

          // if this will be the first row, hide its remove button
          if (existing.length === 0) {
            rem.style.display = 'none';
          } else {
            // there is at least one existing row: ensure both have remove visible
            rem.style.display = '';
            if (existing.length === 1) {
              const prevRem = existing[0].querySelector('.remove-array-row');
              if (prevRem) prevRem.style.display = '';
            }
          }
        }

        // attach password toggle handlers for any password inputs inside the cloned row
        clone.querySelectorAll('.password-toggle').forEach(btn => {
          btn.addEventListener('click', () => {
            const wrapper = btn.closest('.password-wrapper');
            if (!wrapper) return;
            const input = wrapper.querySelector('input');
            if (!input) return;
            const eyeIcon = btn.querySelector('.eye-icon');
            const eyeOffIcon = btn.querySelector('.eye-off-icon');
            if (input.type === 'password') {
              input.type = 'text';
              if (eyeIcon) eyeIcon.style.display = 'none';
              if (eyeOffIcon) eyeOffIcon.style.display = 'block';
            } else {
              input.type = 'password';
              if (eyeIcon) eyeIcon.style.display = 'block';
              if (eyeOffIcon) eyeOffIcon.style.display = 'none';
            }
            updateLink();
          });
        });

        container.appendChild(clone);
        updateLink();
      }

      document.querySelectorAll('.add-array-row').forEach(btn => {
        btn.addEventListener('click', () => {
          addRowForKey(btn.dataset.target, null);
        });
      });

      // initialize one empty row for each array field
      (${JSON.stringify(((config && config.fields) || []).filter((f) => f.type === 'array').map((f) => f.key))}).forEach(k => addRowForKey(k, null));

      mainForm.onchange = updateLink
      mainForm.oninput = updateLink
      `;
        }
    }
    return `
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${manifest.name} - Stremio Addon</title>
    <style>${STYLESHEET}</style>
    <link rel="shortcut icon" href="${logo}" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  </head>

  <body>
    <div id="addon">
      <div class="header">
        <div class="logo">
          <img src="${logo}" alt="${manifest.name}">
        </div>
        <h2 class="description">${manifest.description || ""}</h2>
      </div>

      <div class="info-note">
        <strong>⚠️ Experimental:</strong> usenet streaming is experimental.
        <a href="https://blog.stremio.com/stremio-new-stream-sources-usenet-rar-zip-ftp-and-more/" target="_blank" rel="noopener">Learn more about Usenet support in Stremio →</a>
      </div>

      <h3>Features</h3>
      <div class="features-list">
        <ul>
        ${stylizedTypes.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>

      <div class="separator"></div>

      ${formHTML}

      <a id="installLink" class="install-link" href="#">Install Addon</a>
      <div class="version">v${manifest.version || "0.0.0"}</div>
      ${contactHTML}

      <a class="github" href="https://github.com/sleeyax/stremio-nzb-addon" target="_blank" rel="noopener">GitHub →</a>
    </div>
    <script>
      ${script}

      if (typeof updateLink === 'function')
        updateLink()
      else
        installLink.href = 'stremio://' + window.location.host + window.location.pathname.replace('/configure', '') + '/manifest.json'
    </script>
  </body>

  </html>`;
}
