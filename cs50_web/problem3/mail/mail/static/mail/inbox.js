document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send an email
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_email(id, mailbox) {

  // Display the single_email view
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'block';

  // Load the selected email.
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    // Print email
    console.log(email);

    // Display the email on the page.
    document.querySelector('#single-email-view').innerHTML = `
      <p><strong>To: </strong>${email.recipients}</p>
      <p><strong>From: </strong>${email.sender}</p>
      <p><strong>Subject: </strong>${email.subject}</p>
      <p><strong>Date: </strong>${email.timestamp}</p>
      <button class="btn btn-outline-primary" id="reply">Reply</button>
      <hr></hr>
      <span>${email.body}</span>
      <br><br>
      `;

    // Mark the email as read.
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })

    // Enable Archiving
    if (mailbox !== 'sent' ) {
      const archivebtn = document.createElement('button');
      archivebtn.className = "btn btn-outline-primary";
      archivebtn.innerHTML = !email.archived ? "Archive" : "Unarchive";
      archivebtn.addEventListener('click', function() {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: !email.archived
          })
        })
        load_mailbox('archive');
      })
      document.querySelector('#single-email-view').append(archivebtn);
    }

    // Reply to email
    document.querySelector('#reply').addEventListener('click', function() {
      compose_email();
      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
      document.querySelector('#compose-body').value = `\nOn ${email.timestamp} ${email.sender} wrote:\n${email.body}`;
    })

  });

}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Load the emails to the mailbox.
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Print emails
    console.log(emails);

    // Display the emails.
    emails.forEach((email) => {

      const newEmail = document.createElement('div');
      if (mailbox === 'sent') {
      newEmail.innerHTML = `
        <div class="row">
        <span class="col-3">To: ${email.recipients}</span>
        <span class="col-6">Subject: ${email.subject}</span>
        <span class="col-3 text-right text-secondary">${email.timestamp}</span>
        </div>`;
      } else {
        newEmail.innerHTML = `
        <div class="row">
        <span class="col-3">From: ${email.sender}</span>
        <span class="col-6">Subject: ${email.subject}</span>
        <span class="col-3 text-right text-secondary">${email.timestamp}</span>
        </div>`;
      }
      newEmail.className = email.read ? 'read container list-group-item' : 'unread container list-group-item';
      document.querySelector('#emails-view').append(newEmail);

      // Make email clickable to view it.
      newEmail.addEventListener('click', () => load_email(email.id, mailbox));

    })

});

}

function send_email() {

  // Select the required fields.
  const recipients = document.querySelector('#compose-recipients').value
  const subject = document.querySelector('#compose-subject').value
  const body = document.querySelector('#compose-body').value

  // Post the data
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  });

  // Load sent mailbox
  load_mailbox('sent');

}
