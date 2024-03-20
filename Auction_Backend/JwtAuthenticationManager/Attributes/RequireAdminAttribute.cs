using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Attributes;

public class RequireAdminAttribute : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var role = context.HttpContext.Request.Headers["User-Role"];

        if ("ADMIN" != role)
        {
            context.Result = new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.Unauthorized
            };
            return;
        }

        await next();
    }
}
