using System.Threading.Tasks;

namespace api.Facades
{
    public interface ITashkeelFacade
    {
        Task<string> TashkeelAsync(string textToTashkeel);
    }
}
