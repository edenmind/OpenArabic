using System.Threading.Tasks;

using Flurl;
using Flurl.Http;
using static System.Environment;

namespace api.MicroServiceFacades {
    public class TashkeelFacade : ITashkeelFacade {
        public async Task<string> GetTashkeelAsync (string textToTashkeel) {
            var tashkeelServiceUrl = GetEnvironmentVariable ("ASPNETCORE_TASHKEEL_SERVICE_URL");

            const string pathPrefix = "tashkeel";

            var voweled = await tashkeelServiceUrl
                .AppendPathSegment (pathPrefix)
                .SetQueryParams (new { unvoweled = textToTashkeel })
                .WithTimeout (10)
                .GetStringAsync ().ConfigureAwait (false);

            voweled = CleanTashkeel (voweled);

            return voweled;
        }

        private static string CleanTashkeel (string tashkeel) {
            tashkeel = tashkeel.Trim ();
            tashkeel = tashkeel.Replace ("\u0001", "");
            return tashkeel;
        }
    }
}
