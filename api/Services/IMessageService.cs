using System.Threading.Tasks;

namespace api.Services
{
    public interface IMessageService
    {
        Task SendMessage(string sender, string message);
    }
}