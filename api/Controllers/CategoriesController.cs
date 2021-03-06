using System.Collections.Generic;

using api.Models;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase {
        private readonly ICategoriesService _categoryService;

        public CategoriesController (ICategoriesService categoryService) {
            _categoryService = categoryService;
        }

        // GET: api/Authors
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetCategories () {
            return Ok (_categoryService.GetCategories ());
        }
    }
}
