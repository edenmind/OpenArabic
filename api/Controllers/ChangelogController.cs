using System.Collections.Generic;

using api.Dtos;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ChangelogController : ControllerBase {
        private readonly IChangelogService _changelogService;

        public ChangelogController (IChangelogService changelogService) {
            _changelogService = changelogService;
        }

        // GET: api/Authors
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<ChangelogDTO>> GetChangelog () {
            return Ok (_changelogService.GetChangelog ());
        }
    }
}
