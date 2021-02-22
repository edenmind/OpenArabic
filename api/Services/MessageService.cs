using System;
using System.Threading.Tasks;

using SendGrid;
using SendGrid.Helpers.Mail;

namespace api.Services {
    public class MessageService : IMessageService {
        public async Task SendMessage (string sender, string body) {
            var apiKey = Environment.GetEnvironmentVariable ("ASPNETCORE_SENDGRID_KEY");
            var client = new SendGridClient (apiKey);
            var from = new EmailAddress ("yunus@edenmind.com", "OpenArabic Form Message");
            string subject = "Message from: " + sender;
            var to = new EmailAddress ("yunus@edenmind.com", "Support");
            var message = MailHelper.CreateSingleEmail (from, to, subject, body, "");
            var response = await client.SendEmailAsync (message);
            var x = "";
        }
    }
}
