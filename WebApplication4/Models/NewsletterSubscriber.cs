using WebApplication4.Models.Common;

namespace WebApplication4.Models
{
    public class NewsletterSubscriber : BaseEntity
    {
        public string Email { get; set; }
        public DateTime SubscribedAt { get; set; }
    }
}
