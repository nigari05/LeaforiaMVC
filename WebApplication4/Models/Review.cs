using WebApplication4.Models.Common;

namespace WebApplication4.Models
{
    public class Review : BaseEntity
    {
        public int BookId { get; set; }
        public Book Book { get; set; }
        public string ReviewerName { get; set; }    
        public int Rating { get; set; }          
        public string Text { get; set; }
    }
}
