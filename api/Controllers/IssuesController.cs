using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Octokit;

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
        public async Task<ActionResult<IEnumerable<IssueDTO>>> GetIssues () {

            var issues = await _issueService.GetIssuesAsync ();
            return Ok (issues);
        }
    }
}
