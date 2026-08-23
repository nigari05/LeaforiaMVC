using Microsoft.AspNetCore.Mvc.ViewEngines;
using WebApplication4.Models.Common;

namespace WebApplication4.Models
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Author { get; set; }     
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int ViewCount { get; set; }         
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
