using System;

using api.Models;
using api.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace api {
    public class Startup {
        private static readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public static void ConfigureServices (IServiceCollection services) {

            services.AddDbContext<ApiContext> (options => options.UseSqlServer (Environment.GetEnvironmentVariable ("ASPNETCORE_CONNECTION_STRING")));

            services.AddControllers ();

            services.AddCors (options => {
                options.AddPolicy (name: MyAllowSpecificOrigins, builder => {
                    builder.WithOrigins (Environment.GetEnvironmentVariable ("ASPNETCORE_ORIGINS"));
                    builder.AllowAnyMethod ();
                    builder.AllowAnyHeader ();
                });
            });

            services.AddSwaggerGen (options => {
                options.SwaggerDoc ("v1", new OpenApiInfo { Title = "OpenArabic", Version = "v1" });
            });

            services.AddAuthentication (options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (options => {
                options.Authority = Environment.GetEnvironmentVariable ("ASPNETCORE_AUTHORITY");
                options.Audience = Environment.GetEnvironmentVariable ("ASPNETCORE_AUDIENCE");
            });

            services.AddAuthorization ();

            services.AddSingleton<IMessageService, MessageService> ();

            services.AddHealthChecks ();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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

            app.UseCors (MyAllowSpecificOrigins);

            app.UseAuthentication ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                endpoints.MapHealthChecks ("/health");
            });
        }
    }
}
