import { readFileSync } from "fs";
// import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
// const twemoji = require("twemoji");
// const twOptions = { folder: "svg", ext: ".svg" };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Roboto-Regular.ttf`).toString(
  "base64"
);
const medium = readFileSync(
  `${__dirname}/../_fonts/Roboto-Medium.ttf`
).toString("base64");
const nunitoRegular = readFileSync(
  `${__dirname}/../_fonts/Nunito-Regular.ttf`
).toString("base64");

function getCss(theme: string) {
  let foreground = "white";
  // let radial = 'lightgray';

  if (theme === "dark") {
    foreground = "white";
    // radial = 'dimgray';
  }
  return `
    
    @font-face {
        font-family: 'Roboto';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('ttf');
    }

    @font-face {
        font-family: 'Roboto';
        font-style:  normal;
        font-weight: 500;
        src: url(data:font/woff2;charset=utf-8;base64,${medium}) format('ttf');
    }

    @font-face {
        font-family: 'Nunito';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${nunitoRegular})  format("ttf");
      }

    body {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: flex-end;
        justify-content: center;
        position: relative;
        margin: 0;
        padding: 0;
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .bg > div{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .bg > div img {
        object-fit:cover;
    }
    .bg_overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
     
    }
    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .content {
        z-index:2;
        line-height: 1.1;
        background-image: linear-gradient(to bottom, #5669c3, #283673);
        border-radius: 16px;
        padding: 20px;
        max-width: 600px;
        margin-bottom:60px;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;  
        z-index:3;
        height: 60px;
        position:absolute;
        left: 0;
        top: 0;
        padding: 5px;
    }
    .secondary-logo-wrapper{
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;  
        z-index:3;
        height: 60px;
        position:absolute;
        right: 0;
        top: 0;
        padding: 5px;
    }

    .logo {
        display: inline-block;
        width: auto;
        height: 100%;
        z-index:3;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 40px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Roboto';
        font-size: 48px;
        font-weight: 500;
        font-style: normal;
        color: ${foreground};
        line-height: 1.4;
    }
    .description{
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.4;
        max-width: 600px;
        margin-top: 20px;
    }
    .heading p{margin: 0;}
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { title, theme, description, logo, secondaryLogo, backgroundImage } =
    parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div class="bg">
            <div>
                ${getBgImage(backgroundImage)}
                <div class="bg_overlay"></div>
            </div>
        </div>
        <div class="logo-wrapper">
            ${getImage(logo, "200", "60")}
        </div>
        <div class="secondary-logo-wrapper">
            ${getImage(secondaryLogo, "200", "60")}
        </div>
        <div class="content">
         <div class="heading">${title}</div>
         <div class="description">
         ${description}
         </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width = "auto", height = "225") {
  return src
    ? `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
    : ``;
}

function getBgImage(src: string, width = "100%", height = "100%") {
  return `<img
        class="bg-image"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}
