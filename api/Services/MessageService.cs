using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace api.Services
{

    public class MessageService : IMessageService
    {
        public async Task SendMessage(string sender, string message)
        {
            var apiKey = Environment.GetEnvironmentVariable("ASPNETCORE_SENDGRID_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(sender, "OpenArabic Form Message");
            var subject = "Message from OpenArabic";
            var to = new EmailAddress("salam@edenmind.com", "Support");
            var plainTextContent = message;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, "");
            var response = await client.SendEmailAsync(msg);
        }
    }
}