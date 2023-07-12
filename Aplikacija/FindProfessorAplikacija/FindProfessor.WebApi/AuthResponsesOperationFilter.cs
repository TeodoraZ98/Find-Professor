using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace FindProfessor.WebApi
{
    public class AuthResponsesOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (context != default && context.MethodInfo != default && context.MethodInfo.DeclaringType != default)
            {
                IEnumerable<AuthorizeAttribute> authAttributes = context.MethodInfo.DeclaringType.GetCustomAttributes(true)
                    .Union(context.MethodInfo.GetCustomAttributes(true))
                    .OfType<AuthorizeAttribute>();

                if (authAttributes.Any() && !operation.Responses.Any(r => r.Key == "401"))
                    operation.Responses.Add("401", new OpenApiResponse { Description = "User not authenticated." });
            }
        }
    }
}
