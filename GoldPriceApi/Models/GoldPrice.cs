namespace GoldPriceApi.Models;

public class GoldPrice
{
    public int Karat { get; set; }
    public decimal PricePerGram { get; set; }
    public string Currency { get; set; } = "OMR";
    public string Unit { get; set; } = "gram";
    public DateTime UpdatedAt { get; set; }
}