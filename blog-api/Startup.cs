using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using blog_api.Models;
using blog_api.Services;

namespace blog_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<BlogDatabaseSettings>(
        Configuration.GetSection(nameof(BlogDatabaseSettings)));

            services.AddSingleton<IBlogDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<BlogDatabaseSettings>>().Value);

            services.AddSingleton<PostService>();

            services.AddCors();

            services.AddMvc().AddJsonOptions(options => options.UseMemberCasing())
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors(builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
