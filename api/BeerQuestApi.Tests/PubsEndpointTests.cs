using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace BeerQuestApi.Tests
{
    public class PubsEndpointTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _appFactory;

        public PubsEndpointTests(WebApplicationFactory<Program> appFactory) => _appFactory = appFactory;

        [Fact]
        public async Task Returns_JSON_content()
        {
            using var client = _appFactory.CreateClient();

            var response = await client.GetAsync("/pubs");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
        }

        [Fact]
        public async Task Returns_242_pubs()
        {
            using var client = _appFactory.CreateClient();

            var response = await client.GetAsync("/pubs");
            var pubs = await response.Content.ReadFromJsonAsync<Pub[]>();

            Assert.Equal(242, pubs?.Length);
        }

        [Fact]
        public async Task Returns_pub_properties()
        {
            using var client = _appFactory.CreateClient();

            var response = await client.GetAsync("/pubs");
            var pubs = await response.Content.ReadFromJsonAsync<Pub[]>();
            var golfPub = pubs![1];

            Assert.Equal("\"Golf\" Cafe Bar", golfPub.Name);
            Assert.Equal("Bar reviews", golfPub.Category);
            Assert.Equal("http://leedsbeer.info/?p=1382", golfPub.Url);
            Assert.Equal(new DateTime(2013, 04, 27, 14, 44, 22, DateTimeKind.Unspecified).ToLocalTime(), golfPub.Date);
            Assert.Equal("FORE! You can play \"golf\" here and enjoy a nice bottled ale. ", golfPub.Excerpt);
            Assert.Equal("http://leedsbeer.info/wp-content/uploads/2013/04/20130422_204442.jpg", golfPub.Thumbnail);
            Assert.Equal(53.7934952, golfPub.Lat);
            Assert.Equal(-1.5478653, golfPub.Lng);
            Assert.Equal("1 Little Neville Street, Granary Wharf, Leeds LS1 4ED", golfPub.Address);
            Assert.Equal("0113 244 4428", golfPub.Phone);
            Assert.Equal("GolfCafeBar", golfPub.Twitter);
            Assert.Equal(2.5m, golfPub.StarsBeer);
            Assert.Equal(2.5m, golfPub.StarsAtmosphere);
            Assert.Equal(3.5m, golfPub.StarsAmenities);
            Assert.Equal(2.5m, golfPub.StarsValue);
            Assert.Equal("beer garden,coffee,food,free wifi,sports", golfPub.Tags);
        }
    }
}
