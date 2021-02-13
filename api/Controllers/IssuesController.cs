using System.Collections.Generic;

using api.Models;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase {
        private readonly IIssueService _issueService;

        public IssuesController (IIssueService issueService) {
            _issueService = issueService;
        }

        // GET: api/Authors
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetIssues () {
            return _issueService.GetIssues ();
        }
    }
}
