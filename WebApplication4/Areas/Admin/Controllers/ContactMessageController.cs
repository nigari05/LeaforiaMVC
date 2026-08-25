using Microsoft.AspNetCore.Mvc;

namespace WebApplication4.Areas.Admin.Controllers
{
    public class ContactMessageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
