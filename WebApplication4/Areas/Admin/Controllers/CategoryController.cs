using Microsoft.AspNetCore.Mvc;

namespace WebApplication4.Areas.Admin.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
