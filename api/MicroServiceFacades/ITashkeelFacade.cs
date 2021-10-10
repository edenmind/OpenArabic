using System.Threading.Tasks;

namespace api.MicroServiceFacades {
    public interface ITashkeelFacade {
        Task<string> GetTashkeelAsync (string textToTashkeel);
    }
}
