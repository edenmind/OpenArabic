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
            MailValidator validator = new ();

            var validationResult = await validator.ValidateAsync (mail);

            if (!validationResult.IsValid) return BadRequest (validationResult);

            await _messageService.SendMessage (mail.Sender, mail.Body);

            return Ok ();
        }
    }
}
