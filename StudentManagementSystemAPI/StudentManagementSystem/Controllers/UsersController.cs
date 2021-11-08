using System;
using System.Text.Json;
using System.Threading.Tasks;
using CampilaxModel.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudentManagementSystemModel.Models;
using StudentManagementSystemModel.ViewModels;
using StudentManagementSystemRepository.Interfaces;
using StudentManagementSystemRepository.Repositories;
using StudentManagementSystemDMZone;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        UserRepository userRepository;

        private readonly ILogger<UsersController> logger;

        public UsersController(IBaseRepository<User> userRepository, ILogger<UsersController> logger)
        {
            this.userRepository = (UserRepository)userRepository;
            this.logger = logger;
        }

        // POST: api/users/getusers
        [Authorize]
        [HttpPost]
        [Route("get-users")]
        public async Task<IActionResult> GetUsers(RequestDetails request)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                long total = await this.userRepository.GetTotalCount();
                var users = await this.userRepository.GetAll(new RequestDetails()
                {
                    PageNumber = request.PageNumber,
                    RowsPerPage = request.RowsPerPage,
                });
                responseDetails = new ResponseDetails<User>()
                {
                    List = users,
                    PageNumber = request.PageNumber,
                    RowsPerPage = request.RowsPerPage,
                    TotalPages = ((int)Math.Ceiling(Convert.ToDouble(total / request.RowsPerPage))),
                    Total = total
                };
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

        // GET api/users/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                var User = await this.userRepository.Get(new User() { UserId = id });
                responseDetails.Details = User;
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

        // POST api/users
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(UserViewModel user)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                await this.userRepository.Save(user);
                responseDetails.SuccessMessage = "Successfully Created";
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

        // PUT api/users/5
        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> Put(UserViewModel user)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                await this.userRepository.Update(user);
                responseDetails.SuccessMessage = "Successfully Updated";
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

        // DELETE api/users/5
        [Authorize]
        [HttpGet("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                await this.userRepository.Delete(id);
                responseDetails.SuccessMessage = "Successfully Deleted";
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

        // POST api/users/5
        [Authorize]
        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult> Delete(string[] entity)
        {
            ResponseDetails<User> responseDetails = new ResponseDetails<User>();
            try
            {
                await this.userRepository.Delete(entity);
                responseDetails.SuccessMessage = "Successfully Deleted";
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
