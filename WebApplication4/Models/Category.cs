using WebApplication4.Models.Common;

namespace WebApplication4.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }            
        public ICollection<Book> Books { get; set; }
    }
}
