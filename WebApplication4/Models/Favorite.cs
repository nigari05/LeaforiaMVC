using WebApplication4.Models.Common;

namespace WebApplication4.Models
{
    public class Favorite : BaseEntity
    {
        public string UserId { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
