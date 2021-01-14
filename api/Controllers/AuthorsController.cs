using System.Collections.Generic;

using api.Models;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase {

        private readonly IAuthorService _authorService;

        public AuthorsController (IAuthorService authorService) => _authorService = authorService;

        // GET: api/Authors
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Author>> GetAuthors () => _authorService.GetAuthors ();
    }
}
