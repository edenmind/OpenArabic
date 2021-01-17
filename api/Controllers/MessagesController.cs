using System.Threading.Tasks;

using api.Models;
using api.Services;
using api.Validators;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [ApiController]
    public class MessagesController : ControllerBase {
        private readonly IMessageService _messageService;
        public MessagesController (IMessageService messageService) {
            _messageService = messageService;
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [AllowAnonymous]
        [HttpPost]
        [Route ("api/messages")]
        public async Task<ActionResult<string>> PostMessage (Mail mail) {

            if (!Request.Host.Equals ("openarabic.io")) {
                return BadRequest ("Request from not allowed.");
            }

            MailValidator validator = new ();

            var validationResult = validator.Validate (mail);

            if (!validationResult.IsValid) {
                return BadRequest (validationResult);
            }

            await _messageService.SendMessage (mail.Sender, mail.Body);

            //TODO: Error handling
            return Ok ();
        }
    }
}
