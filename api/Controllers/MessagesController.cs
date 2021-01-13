using System.Threading.Tasks;

using api.Models;
using api.Services;

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
        public async Task<ActionResult<string>> PostMessage (Mail message) {
            await _messageService.SendMessage (message.Sender, message.Body);

            //TODO: Error handling
            return "Success";
        }
    }
}
