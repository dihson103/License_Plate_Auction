using BiddingService.Exceptions;

namespace BiddingService.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (MyException excepion)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = excepion.Status;
            var error = new
            {
                Status = excepion.Status,
                Message = excepion.Message
            };

            await context.Response.WriteAsJsonAsync(error);
        }
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            var error = new
            {
                Status = StatusCodes.Status500InternalServerError,
                Message = "Internal Server Error"
            };

            await context.Response.WriteAsJsonAsync(error);
        }
    }
}