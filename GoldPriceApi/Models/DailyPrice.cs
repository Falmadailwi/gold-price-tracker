namespace GoldPriceApi.Models;

public class DailyPrice
{
    public DateTime Date { get; set; }
    public Dictionary<int, decimal> Prices { get; set; } = new();
}