using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit.Text;
using NairaCompareModel.Enums;
using NairaCompareModel.Helpers;
using NairaCompareModel.Models;
using NairaCompareModel.ViewModels;
using NairaCompareRepository.Interfaces;
using NairaCompareRepository.Repositories;
using NairaCompareService.Models;
using NairaCompareService.Services;

namespace NairaCompareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {

        private ProductTypeRepository productTypeRepository;

        private readonly ILogger<ProductTypesController> logger;
        private IConfiguration configuration;
        private readonly IOptions<AppSettings> appSettings;

        public ProductTypesController(
            IBaseRepository<ProductType> productTypeRepository,
            ILogger<ProductTypesController> logger,
            IConfiguration configuration,
            IOptions<AppSettings> appSettings
        )
        {
            this.productTypeRepository = (ProductTypeRepository)productTypeRepository;
            this.logger = logger;
            this.configuration = configuration;
            this.appSettings = appSettings;
        }

        public ActionResult Index()
        {
            return Ok("ProductType Endpoints");
        }

        // POST: api/producttypes/getproducttypes
        [HttpPost]
        [Route("getproducttypes")]
        public async Task<IActionResult> GetProductTypes([FromBody] ProductTypeRequestPagedDetails details)
        {
            ProductTypeViewResponseDetails responseDetails = new ProductTypeViewResponseDetails();
            try
            {
                int total = (await this.productTypeRepository.GetAll()).Count;
                int totalPages = (int)Math.Ceiling(total / (double)details.RowsPerPage);

                //ProductTypeRequestPagedDetails countryRequestPagedDetails = new ProductTypeRequestPagedDetails()
                //{
                //    PageNumber = details.PageNumber,
                //    RowsPerPage = details.RowsPerPage,
                //};
                //var producttypes = await this.productTypeRepository.GetAll(countryRequestPagedDetails);
                //responseDetails = new ProductTypeViewResponseDetails()
                //{
                //    List = producttypes,
                //    PageNumber = 1,
                //    RowsPerPage = countryRequestPagedDetails.RowsPerPage,
                //    TotalPages = totalPages,
                //    Total = total
                //};
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // GET: api/producttypes/getall
        [HttpGet]
        [Route("getall")]
        //[EnableCors("AllowAnyOriginPolicy")]
        public async Task<ActionResult> GetProductTypes()
        {
            ProductTypeViewResponseDetails responseDetails = new ProductTypeViewResponseDetails();
            try
            {
                //var producttypes = await this.productTypeRepository.GetAll();
                //responseDetails = new ProductTypeViewResponseDetails()
                //{
                //    List = producttypes,
                //    PageNumber = 1,
                //    RowsPerPage = 25,
                //    Total = producttypes.Count
                //};
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // GET: api/producttypes/getproducttypes
        [HttpGet]
        [Route("getproducttypemodules")]
        //[EnableCors("AllowAnyOriginPolicy")]
        public async Task<ActionResult> GetProductTypeDescriptions()
        {
            List<ProductTypeModuleModel> descriptions = new List<ProductTypeModuleModel>();
            var listOfEnumNames = Enum.GetNames(typeof(ProductTypeEnum));
            int nameIndex = 0;
            var listOfEnumValues = typeof(ProductTypeEnum).GetEnumValues();
            foreach (var name in listOfEnumNames)
            {
                var field = typeof(ProductTypeEnum).GetField(name);
                var fieldDescriptions = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute item in fieldDescriptions)
                {
                    descriptions.Add(new ProductTypeModuleModel() { Name = item.Description, Value = (Enum.GetValues(typeof(ProductTypeEnum)).Cast<ProductTypeEnum>().ToList()[nameIndex]) });
                }
                nameIndex += 1;
            }
            return Ok(JsonSerializer.Serialize(descriptions));
        }

        // GET api/producttypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            ProductTypeViewResponseDetails responseDetails = new ProductTypeViewResponseDetails();
            try
            {
                //var productType = this.productTypeRepository.Get(new ProductType() { ProductTypeId = id }).Result;
                //productType.ProductTypeDescription = WebUtility.HtmlDecode(productType.ProductTypeDescription);
                //responseDetails.Details = productType;
                responseDetails.SuccessMessage = "Saved successfully.";
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }

            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // POST api/producttypes
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProductTypeViewModel entity)
        {
            ResponseDetails<ProductType> responseDetails = new ResponseDetails<ProductType>();
            try
            {
                await this.productTypeRepository.Save(new ProductType()
                {
                    ProductTypeId = Guid.NewGuid().ToString(),
                    ProductTypeName = entity.ProductTypeName,
                    ProductTypeDescription = entity.ProductTypeDescription,
                    ProductTypeModule = entity.ProductTypeModule,
                    DateCreated = DateTime.Now,
                });
                responseDetails.SuccessMessage = "Saved successfully.";
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }

            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // PUT api/producttypes/5
        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> Put(ProductType entity)
        {
            ResponseDetails<ProductType> responseDetails = new ResponseDetails<ProductType>();
            try
            {
                var productType = await this.productTypeRepository.Get(entity);
                if (productType != null)
                {
                    productType.ProductTypeName = entity.ProductTypeName;
                    productType.ProductTypeDescription = WebUtility.HtmlEncode(entity.ProductTypeDescription);
                    await this.productTypeRepository.Update(new ProductType()
                    {
                        ProductTypeId = productType.ProductTypeId,
                        ProductTypeName = entity.ProductTypeName,
                        ProductTypeDescription = entity.ProductTypeDescription,
                        ProductTypeModule = entity.ProductTypeModule,
                        DateCreated = productType.DateCreated
                    });
                    responseDetails.SuccessMessage = "Successfully created";
                    responseDetails.ResponseCode = ResponseCodeEnum.Success;
                }
                else
                {

                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // DELETE api/customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            ResponseDetails<ProductType> responseDetails = new ResponseDetails<ProductType>();
            try
            {
                //await this.productTypeRepository.Delete(id);
                responseDetails.SuccessMessage = "Successfully created";
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // DELETE api/producttypes/5
        [HttpDelete]
        public async Task<ActionResult> Delete(List<ProductType> entity)
        {
            ResponseDetails<ProductType> responseDetails = new ResponseDetails<ProductType>();
            try
            {
                //await this.productTypeRepository.Delete(entity);
                responseDetails.SuccessMessage = "Successfully created";
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // POST api/producttypes/5
        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult> Delete(string[] entity)
        {
            ResponseDetails<ProductType> responseDetails = new ResponseDetails<ProductType>();
            try
            {
                //await this.productTypeRepository.Delete(entity);
                responseDetails.SuccessMessage = "Successfully created";
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = ex.Message;
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }
            return Ok(JsonSerializer.Serialize(responseDetails));
        }
    }
}
