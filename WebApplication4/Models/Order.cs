namespace WebApplication4.Models
{
    public class Order
    {
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal ShippingCost { get; set; } = 5.00m;
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }          
        public ICollection<OrderItem> Items { get; set; }
    }
}
