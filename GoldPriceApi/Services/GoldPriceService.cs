using GoldPriceApi.Models;

namespace GoldPriceApi.Services;

public class GoldPriceService : IGoldPriceService
{
    private static readonly int[] Karats = { 18, 21, 22, 24 };
    private readonly List<DailyPrice> _history;
    private readonly List<GoldPrice> _prices;

    public GoldPriceService()
    {
        _history = GenerateHistory(30);
        var today = _history[^1];
        _prices = Karats
            .Select(k => new GoldPrice
            {
                Karat = k,
                PricePerGram = today.Prices[k],
                UpdatedAt = today.Date
            })
            .ToList();
    }

    public IEnumerable<GoldPrice> GetAll() => _prices;

    public GoldPrice? GetByKarat(int karat) =>
        _prices.FirstOrDefault(p => p.Karat == karat);

    public IEnumerable<DailyPrice> GetHistory() => _history;

    private static List<DailyPrice> GenerateHistory(int days)
    {
        var list = new List<DailyPrice>();
        for (int i = days - 1; i >= 0; i--)
        {
            double base24 = 45 + Math.Sin(i / 4.0) * 1.5 + (((i * 37) % 10) - 5) * 0.15;
            var prices = Karats.ToDictionary(
                k => k,
                k => Math.Round((decimal)(base24 * k / 24), 3));

            list.Add(new DailyPrice { Date = DateTime.Today.AddDays(-i), Prices = prices });
        }
        return list;
    }
}