import { Manifest } from "@stremio-addon/sdk";

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
`;
export function landingTemplate(manifest: Manifest): string {
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
    if (manifest.config && (manifest.config || []).length) {
        let options = "";
        manifest.config.forEach((elem) => {
            const key = elem.key;
            if (["text", "number"].includes(elem.type)) {
                const isRequired = elem.required ? " required" : "";
                const defaultHTML = elem.default ? ` value="${elem.default}"` : "";
                const inputType = elem.type;
                options += `
        <div class="form-element">
          <div class="label-to-top">${elem.title}</div>
          <input type="${inputType}" id="${key}" name="${key}" class="full-width"${defaultHTML}${isRequired} placeholder="${elem.title}"/>
        </div>
        `;
            }
            else if (elem.type === "password") {
                const isRequired = elem.required ? " required" : "";
                const defaultHTML = elem.default ? ` value="${elem.default}"` : "";
                options += `
        <div class="form-element">
          <div class="label-to-top">${elem.title}</div>
          <div class="password-wrapper">
            <input type="password" id="${key}" name="${key}" class="full-width"${defaultHTML}${isRequired} placeholder="${elem.title}"/>
            <button type="button" class="password-toggle" data-target="${key}" aria-label="Toggle password visibility">
              <svg class="eye-icon" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              <svg class="eye-off-icon" style="display:none" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
            </button>
          </div>
        </div>
        `;
            }
            else if (elem.type === "checkbox") {
                const isChecked = elem.default === "checked" ? " checked" : "";
                options += `
        <div class="form-element">
          <label for="${key}" style="display: flex; align-items: center; cursor: pointer;">
            <input type="checkbox" id="${key}" name="${key}"${isChecked}> <span class="label-to-right">${elem.title}</span>
          </label>
        </div>
        `;
            }
            else if (elem.type === "select") {
                const defaultValue = elem.default || (elem.options || [])[0];
                options += `<div class="form-element">
        <div class="label-to-top">${elem.title}</div>
        <select id="${key}" name="${key}" class="full-width">
        `;
                const selections = elem.options || [];
                selections.forEach((el) => {
                    const isSelected = el === defaultValue ? " selected" : "";
                    options += `<option value="${el}"${isSelected}>${el}</option>`;
                });
                options += `</select>
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
      installLink.onclick = () => {
        return mainForm.reportValidity()
      }
      const updateLink = () => {
        const config = Object.fromEntries(new FormData(mainForm))
        installLink.href = 'stremio://' + window.location.host + '/' + encodeURIComponent(JSON.stringify(config)) + '/manifest.json'
      }
      mainForm.onchange = updateLink

      document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = document.getElementById(btn.dataset.target);
          const eyeIcon = btn.querySelector('.eye-icon');
          const eyeOffIcon = btn.querySelector('.eye-off-icon');
          if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
          } else {
            input.type = 'password';
            eyeIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
          }
        });
      });
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
        installLink.href = 'stremio://' + window.location.host + '/manifest.json'
    </script>
  </body>

  </html>`;
}
