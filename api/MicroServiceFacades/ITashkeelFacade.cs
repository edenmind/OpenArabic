using System.Threading.Tasks;

namespace api.MicroServiceFacades {
    public interface ITashkeelFacade {
        Task<string> TashkeelAsync (string textToTashkeel);
    }
}
