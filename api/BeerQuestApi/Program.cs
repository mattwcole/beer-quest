using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BeerQuestApi
{
    public class Program
    {
        private static readonly Lazy<IReadOnlyList<Pub>> ListPubs = new(() =>
        {
            using var streamReader = File.OpenText("leedsbeerquest.csv");
            using var csvReader = new CsvReader(streamReader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower().Replace("_", "")
            });
            return csvReader.GetRecords<Pub>().ToList();
        });

        public static void Main(string[] args) => CreateHostBuilder(args).Build().Run();

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => webBuilder
                    .ConfigureServices(services => services.AddCors())
                    .Configure(app => app
                        .UseRouting()
                        .UseCors(policy => policy.AllowAnyOrigin())
                        .UseEndpoints(endpoints => endpoints
                            .MapGet("/pubs", async context =>
                            {
                                await context.Response.WriteAsJsonAsync(ListPubs.Value);
                            }))));
    }
    
    public record Pub(
        string Name,
        string Category,
        string Url,
        DateTime Date,
        string Excerpt,
        string Thumbnail,
        double Lat,
        double Lng,
        string Address,
        string Phone,
        string Twitter,
        decimal StarsBeer,
        decimal StarsAtmosphere,
        decimal StarsAmenities,
        decimal StarsValue,
        string Tags);
}