using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.Models;

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

        // POST: Admin/Category/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Category category)
        {
            if (string.IsNullOrWhiteSpace(category.Name))
            {
                ModelState.AddModelError(nameof(Category.Name), "Kateqoriya adı boş ola bilməz.");
            }

            if (!ModelState.IsValid)
            {
                return View(category);
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Kateqoriya uğurla əlavə olundu.";
            return RedirectToAction(nameof(Index));
        }

        // GET: Admin/Category/Edit/{id}
        public async Task<IActionResult> Edit(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: Admin/Category/Edit/{id}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, Category category)
        {
            if (id != category.Id)
            {
                return NotFound();
            }

            if (string.IsNullOrWhiteSpace(category.Name))
            {
                ModelState.AddModelError(nameof(Category.Name), "Kateqoriya adı boş ola bilməz.");
            }

            if (!ModelState.IsValid)
            {
                return View(category);
            }

            var existing = await _context.Categories.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Name = category.Name;

            await _context.SaveChangesAsync();

            TempData["Success"] = "Kateqoriya uğurla yeniləndi.";
            return RedirectToAction(nameof(Index));
        }

        // GET: Admin/Category/Delete/{id}
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await _context.Categories
                .Include(c => c.Books)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: Admin/Category/Delete/{id}
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var category = await _context.Categories
                .Include(c => c.Books)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.Books != null && category.Books.Count > 0)
            {
                TempData["Error"] = "Bu kateqoriyada kitablar mövcuddur, əvvəlcə onları silin və ya başqa kateqoriyaya köçürün.";
                return RedirectToAction(nameof(Index));
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Kateqoriya uğurla silindi.";
            return RedirectToAction(nameof(Index));
        }
    }
}
