using System;
using System.Threading.Tasks;

using Flurl;
using Flurl.Http;

namespace api.MicroServiceFacades {

    public class TashkeelFacade : ITashkeelFacade {
        public TashkeelFacade () { }

        public async Task<string> TashkeelAsync (string textToTashkeel) {

            var tashkeelServiceUrl = Environment.GetEnvironmentVariable ("ASPNETCORE_TASHKEEL_SERVICE_URL");

            const string pathPrefix = "tashkeel";

            var tashkeel = await tashkeelServiceUrl
                .AppendPathSegment (pathPrefix)
                .SetQueryParams (new { unvoweled = textToTashkeel })
                .GetStringAsync ();

            // clean up
            tashkeel = tashkeel.Trim ();
            tashkeel = tashkeel.Replace ("", "");

            return tashkeel;
        }

    }
}
