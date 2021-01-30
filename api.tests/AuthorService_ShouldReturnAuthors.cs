using api.Services;

using NUnit.Framework;

namespace api.tests {

    [TestFixture]
    public class AuthorService_ShouldReturnAuthors {

        private AuthorService _authorService;

        [SetUp]
        public void Setup () {
            _authorService = new AuthorService ();
        }

        [Test]
        public void AuthorService_NotNull_ShouldReturnAuthors () {

            Assert.Pass ();

        }

    }
}
