using System;

using api.MicroServiceFacades;
using api.Models;
using api.Services;

using FluentValidation.AspNetCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using static System.AppDomain;
using static System.Environment;

namespace api {
    public class Startup {
        private const string AllowSpecificOrigins = "allowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public static void ConfigureServices (IServiceCollection services) {
            services.AddScoped<ITextService, TextService> ();
            services.AddScoped<ICategoriesService, CategoriesService> ();
            services.AddScoped<IIssueService, IssueService> ();
            services.AddScoped<IAuthorService, AuthorService> ();
            services.AddScoped<IMessageService, MessageService> ();
            services.AddScoped<ITashkeelFacade, TashkeelFacade> ();
            services.AddScoped<IChangelogService, ChangelogService> ();
            services.AddScoped<IWordOfTheDayService, WordOfTheDayService> ();

            services.AddDbContext<ApiContext> (options =>
                options.UseSqlServer (GetEnvironmentVariable ("ASPNETCORE_CONNECTION_STRING") ??
                    throw new InvalidOperationException ()));

            services.AddAutoMapper (CurrentDomain.GetAssemblies ());

            services.AddHttpClient ();

            services.AddControllers (options => { options.ReturnHttpNotAcceptable = true; })
                .AddFluentValidation (ConfigurationExpression);

            services.AddCors (options => {
                options.AddPolicy (AllowSpecificOrigins, builder => {
                    builder.WithOrigins (GetEnvironmentVariable ("ASPNETCORE_ORIGINS"));
                    builder.AllowAnyMethod ();
                    builder.AllowAnyHeader ();
                });
            });

            services.AddSwaggerGen (options => {
                options.SwaggerDoc ("v1", new OpenApiInfo { Title = "OpenArabic", Version = "0.1.0" });
            });

            services.AddAuthentication (options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (options => {
                options.Authority = GetEnvironmentVariable ("ASPNETCORE_AUTHORITY");
                options.Audience = GetEnvironmentVariable ("ASPNETCORE_AUDIENCE");
            });

            services.AddAuthorization ();

            services.AddHealthChecks ();
        }

        private static void ConfigurationExpression (FluentValidationMvcConfiguration s) {
            s.RegisterValidatorsFromAssemblyContaining<Startup> ();
            s.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
        }

        public static void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
                app.UseSwagger ();
                app.UseSwaggerUI (options => {
                    options.SwaggerEndpoint ("/swagger/v1/swagger.json", "OpenArabic");
                    options.RoutePrefix = "";
                });
            }

            app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseCors (AllowSpecificOrigins);

            app.UseAuthentication ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                endpoints.MapHealthChecks ("/health");
            });
        }
    }
}
