using System.Collections.Generic;

using api.Dtos;

namespace api.Services {

    public class ChangelogService : IChangelogService {

        public IEnumerable<ChangelogDTO> GetChangelog () {

            List<ChangelogDTO> changelog = new ();

            changelog.Add (new ChangelogDTO {
                ChangelogId = 1,
                    CreatedAt = "2020-02-14",
                    Description = "When reading a text, the reader will get information about estimated reading time. (Feature)",
                    Title = "Text View"
            });

            changelog.Add (new ChangelogDTO {
                ChangelogId = 2,
                    CreatedAt = "2020-02-13",
                    Description = "The development being made on OpenArabic is now more transparent and you can follow it either on Github or directly at the website clicking on the lightbuld in the upper right corner. (Feature)",
                    Title = "OpenDevelopment"
            });

            changelog.Add (new ChangelogDTO {
                ChangelogId = 3,
                    CreatedAt = "2020-02-13",
                    Description = "The vocalisation service adding fatha, kesra and damma caused the frontend API to get stuck at 100% CPU load if the serivece was uavailable. This is now fixed. (Fix)",
                    Title = "Vocalisation Service"
            });

            return changelog;

        }
    }
}
