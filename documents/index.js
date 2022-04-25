module.exports = (meeting) => {
  const participants = meeting.participants.teachers.map((teacher) => {
    return teacher.teacher;
  });

  const participantsParents = meeting.participants.parents.map((parent) => {
    return parent.parent;
  });

  return `
       <!doctype html>
       <html>
          <head>
             <meta charset="utf-8">
             <title>Susitikimo ataskaita</title>
             <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             font-size: 16px;
             line-height: 24px;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
          </style>
          </head>
          <body>
             <div class="invoice-box" >
             <h1 class="justify-center">${meeting.title}</h1>
             <h2 class="justify-center">susitikimo ataskaita</h2>
             <br>
             <h4> Susitikimo tikslas: ${meeting.subject}</h4>
             <h5> Susitikimo vieta: ${meeting.location}</h5>
             <h5> Susitikimo data ir laikas: ${meeting.date} ${
    meeting.time
  }</h5>
                <table cellpadding="0" cellspacing="0">
                   <tr class="heading">
                      <td>Susitikimo dalyviai</td>
                   </tr>
                   ${participants
                     .map(
                       (participant) =>
                         `<tr class="info"><td>${participant.name} ${participant.surname}</td></tr>`
                     )
                     .join('')}
                   ${participantsParents
                     .map(
                       (participantParent) =>
                         `<tr class="info"><td>${participantParent.name} ${participantParent.surname}</td></tr>`
                     )
                     .join('')}
                </table>
             </div>
          </body>
       </html>
       `;
};
