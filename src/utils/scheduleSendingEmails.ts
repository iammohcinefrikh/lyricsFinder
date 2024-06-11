import cron from 'node-cron';

const setupCronJob = (listEmails:Function, sendNewsletter:Function) => {
    cron.schedule('0 0 * * *', async () => {
      try {
        const Emails = await listEmails();
        if (Emails.length > 0) {
          await sendNewsletter(Emails);
          console.log('Newsletter sent to admins');
        }
      } catch (error) {
        console.error('Error sending newsletter:', error);
      }
    });
  };
  
  module.exports = { setupCronJob };