using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pivotal.Discovery.Client;
using Steeltoe.Common.Discovery;

namespace netcore_product.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly DiscoveryHttpClientHandler _handler;
        private const string OrderUrl = "http://NETCORE-ORDER/api/values";
        private const string JavaUserUrl = "http://spring-cloud-producer/java-user";
        private const string NodeJsUserUrl = "http://nodejs-service/books";
        public ValuesController(IDiscoveryClient client)
        {
            _handler = new DiscoveryHttpClientHandler(client);
        }

        [HttpGet("order")]
        public async Task<string> GetOrder()
        {
            var client = new HttpClient(_handler);
            return await client.GetStringAsync(OrderUrl);
        }

        [HttpGet("javauser")]
        public async Task<string> GetJavaUser()
        {
            var client = new HttpClient(_handler);
            return await client.GetStringAsync(JavaUserUrl);
        }

        [HttpGet("nodejsbooks")]
        public async Task<string> GetNodeJsUser()
        {
            var client = new HttpClient(_handler);
            return await client.GetStringAsync(NodeJsUserUrl);
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
