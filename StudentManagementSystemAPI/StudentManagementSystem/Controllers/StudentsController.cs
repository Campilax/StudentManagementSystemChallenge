using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CampilaxModel.Enums;
using StudentManagementSystemModel.Models;
using StudentManagementSystemRepository.Repositories;
using StudentManagementSystemModel.ViewModels;
using StudentManagementSystemRepository.Interfaces;
using System.IO;
using StudentManagementSystemDMZone;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private StudentRepository studentRepository;

        private readonly ILogger<StudentsController> logger;
        private IConfiguration configuration;

        public StudentsController(
            IBaseRepository<Student> studentRepository,
            ILogger<StudentsController> logger,
            IConfiguration configuration
        )
        {
            this.studentRepository = (StudentRepository)studentRepository;
            this.logger = logger;
            this.configuration = configuration;
        }

        // POST: api/Students/getStudents
        [Authorize]
        [HttpPost]
        [Route("get-students")]
        public async Task<IActionResult> GetStudents(RequestDetails request)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                long total = await this.studentRepository.GetTotalCount();
                int totalPages = (int)Math.Ceiling(total / (double)request.RowsPerPage);

                var Students = await this.studentRepository.GetAll(new RequestDetails()
                {
                    PageNumber = request.PageNumber,
                    RowsPerPage = request.RowsPerPage,
                    QueryString = request.QueryString
                });
                responseDetails = new ResponseDetails<Student>()
                {
                    List = Students,
                    PageNumber = request.PageNumber,
                    RowsPerPage = request.RowsPerPage,
                    QueryString = request.QueryString,
                    TotalPages = totalPages,
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

        // GET api/students/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                var Student = await this.studentRepository.Get(new Student() { Id = id });
                responseDetails.Details = Student;
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

        // POST api/students
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post(Student student)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                await this.studentRepository.Save(student);
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

        // POST api/students/update
        [Authorize]
        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> Put(Student entity)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                await this.studentRepository.Update(entity);
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

        // GET api/students/delete/5
        [Authorize]
        [HttpGet("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                await this.studentRepository.Delete(id);
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

        // POST api/students/delete
        [Authorize]
        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult> Delete(string[] entity)
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                await this.studentRepository.Delete(entity);
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

        // GET api/students/download-csv-file
        [Authorize]
        [HttpGet]
        [Route("download-csv-file")]
        public async Task<IActionResult> GenerateCSV()
        {
            ResponseDetails<Student> responseDetails = new ResponseDetails<Student>();
            try
            {
                long total = await this.studentRepository.GetTotalCount();
                var students = await this.studentRepository.GetAll(new RequestDetails()
                {
                    PageNumber = 1,
                    RowsPerPage = total
                });
                var tempDirectoryPath = "Assets/Temp/";
                if (!Directory.Exists(Path.Combine(tempDirectoryPath)))
                {
                    Directory.CreateDirectory(Path.Combine(tempDirectoryPath));
                }
                using (Stream stream = new FileInfo(Path.Combine(tempDirectoryPath + "download.csv")).OpenWrite())
                {
                    stream.SetLength(0);
                    using (StreamWriter writer = new StreamWriter(stream))
                    {
                        foreach (var student in students)
                        {
                            string line = student.Id + ", " + student.UserName + ", " + student.FirstName + ", " + student.LastName + ", " + student.Age + ", " + student.Career;
                            writer.WriteLine(line);
                        }
                        writer.Flush();
                    }
                };
                responseDetails.ResponseCode = ResponseCodeEnum.Success;
                var csv = new FileInfo(Path.Combine(tempDirectoryPath + "download.csv")).OpenRead();
                return File(csv, "application/msword");
            }
            catch (Exception ex)
            {
                responseDetails.ResponseCode = ResponseCodeEnum.BadRequest;
                this.logger.LogError(ex.Message);
                return BadRequest(JsonSerializer.Serialize(responseDetails));
            }
        }
    }
}
