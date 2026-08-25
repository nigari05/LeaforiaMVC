using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;

namespace WebApplication4.Areas.Admin.Controllers
{
    public class CategoryController : Controller
    {

        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _context.Categories
                .Include(c => c.Books)
                .OrderBy(c => c.Name)
                .ToListAsync();

            return View(categories);
        }

        public IActionResult Create()
        {
            return View();
        }
    }
}
