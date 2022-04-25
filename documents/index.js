module.exports = ({ title }) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Susitikimo</title>
       </head>
       <body>
          <div class="invoice-box">
           <p> ${title} </p>
          </div>
       </body>
    </html>
    `;
};
