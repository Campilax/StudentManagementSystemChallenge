using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CampilaxModel.Enums;
using StudentManagementSystemModel.Models;
using StudentManagementSystemRepository.Repositories;
using StudentManagementSystemRepository.Interfaces;
using StudentManagementSystemModel.ViewModels;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        StudentRepository studentRepository;
        UserRepository userRepository;

        private readonly ILogger<StudentsController> logger;
        public IConfiguration Configuration;

        public AuthController(
            IBaseRepository<Student> studentRepository,
            IBaseRepository<User> userRepository,
            ILogger<StudentsController> logger)
        {
            this.studentRepository = (StudentRepository)studentRepository;
            this.userRepository = (UserRepository)userRepository;
            this.logger = logger;

        }

        // POST api/auth
        [HttpPost]
        public async Task<ActionResult> Post(UserViewModel entity)
        {
            ResponseDetails<AuthorizedUserModel> responseDetails = new ResponseDetails<AuthorizedUserModel>();
            responseDetails.ResponseCode = ResponseCodeEnum.NotFound;
            try
            {
                AuthorizedUserModel authorizedUser = await this.userRepository.VerifyAccount(entity);
                if (null != authorizedUser)
                {
                    responseDetails.SuccessMessage = "Login successful";
                    responseDetails.ResponseCode = ResponseCodeEnum.Success;
                    responseDetails.Details = authorizedUser;
                }
                else
                {
                    responseDetails.ErrorMessage = "Oops, invalid user account.";
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                responseDetails.ErrorMessage = "Oops, something went wrong.";
                responseDetails.ResponseCode = ResponseCodeEnum.InternalServerError;
            }

            return Ok(JsonSerializer.Serialize(responseDetails));
        }

        // POST api/auth
        [HttpPost]
        [Route("authorize")]
        public async Task<ActionResult> Authorize(UserAuthorizationCredentialModel entity)
        {
            ResponseDetails<Object> responseDetails = new ResponseDetails<Object>();
            try
            {
                await Task.Delay(0);
                responseDetails.SuccessMessage = "Logout Successful";
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

        // POST api/auth
        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout(UserAuthorizationCredentialModel entity)
        {
            ResponseDetails<Object> responseDetails = new ResponseDetails<Object>();
            try
            {
                await Task.Delay(0);
                responseDetails.SuccessMessage = "Logout Successful";
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
