using System;
using System.Threading.Tasks;

using SendGrid;
using SendGrid.Helpers.Mail;

namespace api.Services {

    public class MessageService : IMessageService {
        public async Task SendMessage (string sender, string body) {
            var apiKey = Environment.GetEnvironmentVariable ("ASPNETCORE_SENDGRID_KEY");
            var client = new SendGridClient (apiKey);
            var from = new EmailAddress (sender, "OpenArabic Form Message");
            var subject = "Message from OpenArabic";
            var to = new EmailAddress ("salam@edenmind.com", "Support");
            var message = MailHelper.CreateSingleEmail (from, to, subject, body, "");
            var response = await client.SendEmailAsync (message);
        }
    }
}
