using GoldPriceApi.Models;

namespace GoldPriceApi.Services;

public interface IGoldPriceService
{
    IEnumerable<GoldPrice> GetAll();
    GoldPrice? GetByKarat(int karat);
    IEnumerable<DailyPrice> GetHistory();
}