﻿using API.App;
using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  
        public static class ApplicationServiceExtensions
        {
            public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
              
            }
        }
    