
import cron from 'node-cron';
// import the artist model from the database model
import { User } from "../models/databaseModel";
import { sendNewsletter } from "../utils/sendNwesLetter";

const listEmails = async (): Promise<string[]> => {
  try {
    const users = await User.find({ isAdmin: false, isSubscribed: true }).select('userEmail');
    return users.map(user => user.userEmail);
  } catch (error) {
    console.error('Error fetching user emails:', error);
    return [];
  }
};

export const setupCronJob = () => {
    cron.schedule('*/1 * * * *', async () => { // Runs every minute
        try {
            const emails = await listEmails();
            if (emails.length > 0) {
                await sendNewsletter(emails);
                console.log('Newsletter sent to subscribed users');
            }
        } catch (error) {
            console.error('Error sending newsletter:', error);
        }
  });
};
