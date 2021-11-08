using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using CampilaxService.Interfaces;
using CampilaxModel.ViewModels;
using CampilaxModel.Models;

namespace CampilaxService.Services
{
    public class CreditRegistryService : BaseService<CreditRegistryViewModel>
    {
        private HttpClient client;
        private string url;

        private readonly IOptions<CreditRegistryCredentials> creditRegistryCredentials;
        private CreditRegistryLoginResponse loginResponse;

        public CreditRegistryService(HttpClient client, IOptions<CreditRegistryCredentials> creditRegistryCredentials)
        {
            this.creditRegistryCredentials = creditRegistryCredentials;
            this.client = client;
            //
            this.loginResponse = new Func<CreditRegistryLoginResponse>(() => this.Initialize().Result)();
        }

        public async Task<CreditRegistryLoginResponse> Initialize()
        {
            try
            {
                this.client.BaseAddress = new Uri(this.creditRegistryCredentials.Value.EndPointBaseUrl);
                //this.client.DefaultRequestHeaders.Add("Accept", "*");
                var response = await this.client.PostAsJsonAsync(this.creditRegistryCredentials.Value.EndPointBaseUrl + "/api/Agents/Login", new CreditRegistryCredentials()
                {
                    EmailAddress = this.creditRegistryCredentials.Value.EmailAddress,
                    Password = this.creditRegistryCredentials.Value.Password,
                    SubscriberID = this.creditRegistryCredentials.Value.SubscriberID
                });
                response.Content.Headers.Remove("Content-Type");
                response.Content.Headers.Add("Content-Type", "application/json");

                var responseResult = await response.Content.ReadAsAsync<CreditRegistryLoginResponse>();
                response.Dispose();

                return responseResult;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<CreditRegistryLoginResponse> ChangePassword()
        {
            try
            {
                var response = await this.client.PostAsJsonAsync(this.creditRegistryCredentials.Value.EndPointBaseUrl + "/api/Agents/Login", new CreditRegistryCredentials()
                {
                    EmailAddress = this.creditRegistryCredentials.Value.EmailAddress,
                    SubscriberID = this.creditRegistryCredentials.Value.SubscriberID,
                    ResetPassword = this.creditRegistryCredentials.Value.ResetPassword,
                    NewPassword = this.creditRegistryCredentials.Value.NewPassword
                });
                response.Content.Headers.Remove("Content-Type");
                response.Content.Headers.Add("Content-Type", "application/json");

                var requestResult = await response.Content.ReadAsAsync<CreditRegistryLoginResponse>();
                return requestResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CreditRegistryCustomer> SearchByBVN(CreditRegistryBVNSearchRequestDetails entity)
        {
            try
            {
                if (null != this.loginResponse)
                {
                    entity.SessionCode = this.loginResponse.SessionCode;
                    var response = await this.client.PostAsJsonAsync(this.creditRegistryCredentials.Value.EndPointBaseUrl + "/api/Customers/FindByBVN", entity);
                    response.Content.Headers.Remove("Content-Type");
                    response.Content.Headers.Add("Content-Type", "application/json");

                    var requestResult = await response.Content.ReadAsAsync<CreditRegistryCustomerResponseDetails>();
                    return (requestResult.SearchResult.Count > 0) ? requestResult.SearchResult[0] : null;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CreditRegistryLoginResponse> GetCreditScore(CreditRegistryReportRequest entity)
        {
            try
            {
                if (null != this.loginResponse)
                {
                    var response = await this.client.PostAsJsonAsync(this.creditRegistryCredentials.Value.EndPointBaseUrl + "/api/Reports/GetData2", new CreditRegistryReportRequestDetails()
                    {
                        SessionCode = this.loginResponse.SessionCode,
                        ReportDataRequest = entity
                    });
                    response.Content.Headers.Remove("Content-Type");
                    response.Content.Headers.Add("Content-Type", "application/json");
                    var requestResult = await response.Content.ReadAsAsync<CreditRegistryLoginResponse>();
                    return requestResult;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CreditRegistryCreditReportResponse> GetCreditScoreReportData(CreditRegistryReportRequest entity)
        {
            try
            {
                if (null != this.loginResponse)
                {
                    entity.AccountOwnerIDs = this.loginResponse.SubscriberID;
                    var requestEntity = new CreditRegistryReportRequestDetails()
                    {
                        SessionCode = this.loginResponse.SessionCode,
                        ReportDataRequest = entity
                    };
                    var response = await this.client.PostAsJsonAsync(this.creditRegistryCredentials.Value.EndPointBaseUrl + "/api/Reports/GetData2", requestEntity);
                    response.Content.Headers.Remove("Content-Type");
                    response.Content.Headers.Add("Content-Type", "application/json");
                    var requestResult = await response.Content.ReadAsAsync<CreditRegistryCreditReportResponse>();
                    return requestResult;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
