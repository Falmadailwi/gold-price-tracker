using GoldPriceApi.Models;
using GoldPriceApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GoldPriceApi.Controllers;

[ApiController]
[Route("api/gold-prices")]
public class GoldPricesController : ControllerBase
{
    private readonly IGoldPriceService _service;

    public GoldPricesController(IGoldPriceService service)
    {
        _service = service;
    }

    // GET api/gold-prices            -> all karats
    // GET api/gold-prices?karat=21   -> one karat (query parameter)
    [HttpGet]
    public ActionResult<IEnumerable<GoldPrice>> GetAll([FromQuery] int? karat)
    {
        if (karat is null)
            return Ok(_service.GetAll());

        var price = _service.GetByKarat(karat.Value);
        if (price is null)
            return NotFound(new { message = $"Karat {karat} not found" });

        return Ok(new[] { price });
    }

    // GET api/gold-prices/21         -> one karat (custom endpoint)
    [HttpGet("{karat:int}")]
    public ActionResult<GoldPrice> GetByKarat(int karat)
    {
        var price = _service.GetByKarat(karat);
        if (price is null)
            return NotFound(new { message = $"Karat {karat} not found" });

        return Ok(price);
    }

    // GET api/gold-prices/history    -> last 30 days
    [HttpGet("history")]
    public ActionResult<IEnumerable<DailyPrice>> GetHistory()
    {
        return Ok(_service.GetHistory());
    }
}