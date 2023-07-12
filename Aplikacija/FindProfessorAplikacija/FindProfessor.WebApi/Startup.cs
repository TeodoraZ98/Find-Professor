
using FindProfessor.DataLayer.Repository.Interfaces;
using FindProfessor.DataLayer.Repository;
using FindProfessor.DataLayer.Services;
using FindProfessor.DataLayer.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using FindProfessor.DataLayer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.Swagger;
using FindProfessor.WebApi;

public class Startup
{

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.AddDbContext<fpDbContext>(conf =>
        {
            conf.UseSqlServer(Configuration.GetConnectionString("Konekcija"));
        });

        services.AddCors(options =>
        {
            options.AddPolicy("CORS", builder =>
            {
                builder.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed((host) => true).AllowCredentials();
            });
        });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "FindProfessor.WebApi", Version = "v1" });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme {
                            Reference = new OpenApiReference {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                            }
                    },
                        new string[] {}
                    }
                });
            c.OperationFilter<AuthResponsesOperationFilter>();
        });
        SetupJWTServices(services);
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<AdminService>();
        services.AddScoped<RecenzijaService>();
        services.AddScoped<ProfesorService>();
        services.AddScoped<UslugaService>();
        services.AddScoped<UcenikService>();
        services.AddScoped<AuthService>();
        services.AddScoped<ImageService>();
        services.AddScoped<IAdminRepository, AdminRepository>();
        services.AddScoped<IRecenzijaRepository, RecenzijaRepository>();
        services.AddScoped<IProfesorRepository, ProfesorRepository>();
        services.AddScoped<IUslugaRepository, UslugaRepository>();
        services.AddScoped<IUcenikRepository, UcenikRepository>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            SwaggerOptions options = new SwaggerOptions();
            app.UseSwagger(options);
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FindProfessor.WebApi v1"));
        }

        app.UseFileServer(new FileServerOptions
        {
            FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles")),
            RequestPath = "/StaticFiles",
            EnableDefaultFiles = true
        });

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors("CORS");

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

   
    private void SetupJWTServices(IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            };
            options.Events = new JwtBearerEvents
            {
                OnTokenValidated = async context =>
                {
                    var authService = context.HttpContext.RequestServices.GetRequiredService<AuthService>();
                    var email = context.Principal.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault().Value;
                    var user = authService.VratiKorisnikaPoEmailu(email);
                    if (user == null)
                    {
                        context.Fail("Unauthorized");
                    }
                    else
                    {
                 
                        context.Success();
                    }
                }
            };
        });
    }

}

