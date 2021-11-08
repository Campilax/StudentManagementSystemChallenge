using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystemModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StudentManagementSystemModel.ViewModels;
using StudentManagementSystemRepository.Repositories;

namespace StudentManagementSystemRepository.Repositories
{
    public class StudentRepository : BaseRepository<Student>
    {
        public StudentRepository(StudentManagementSystemContext db, ILogger<StudentRepository> logger) : base(db, logger) { }

        public async Task<List<Student>> GetAll(RequestDetails details)
        {
            try
            {
                if(details.QueryString != null)
                {
                    return await this.db.Students.Where(x => x.Id == int.Parse(details.QueryString))
                    .OrderByDescending(x => x.Id)
                    .Skip((int)((details.PageNumber - 1) * details.RowsPerPage))
                    .Take((int)details.RowsPerPage)
                    .ToListAsync();
                } else
                {
                    return await this.db.Students
                    .OrderByDescending(x => x.Id)
                    .Skip((int)((details.PageNumber - 1) * details.RowsPerPage))
                    .Take((int)details.RowsPerPage)
                    .ToListAsync();
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<long> GetTotalCount()
        {
            try
            {
                return await this.db.Students.CountAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return 0;
            }
        }

        public new async Task<Student> Get(Student student)
        {
            try
            {
                if (student.Id != 0)
                {
                    student = (await this.db.Students.Where(x => x.Id == student.Id).ToListAsync()).FirstOrDefault();
                }
                else if (student.FirstName != null || student.LastName != null)
                {
                    student = (await this.db.Students.Where(x => x.FirstName == student.FirstName || x.LastName == student.LastName).ToListAsync()).FirstOrDefault();
                }
                return student;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public new async Task Save(Student entity)
        {
            try
            {
                await this.db.Students.AddAsync(entity);
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Update(Student entity)
        {
            try
            {
                var student = await this.Get(entity);
                student.FirstName = entity.FirstName;
                student.LastName = entity.LastName;
                student.Age = entity.Age;
                student.Career = entity.Career;
                this.db.Entry<Student>(student).State = EntityState.Modified;
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Delete(int identifier)
        {
            try
            {
                this.db.Students.RemoveRange(this.db.Students.Where(Student => Student.Id == identifier));
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Delete(string[] identifiers)
        {
            try
            {
                List<Student> Students = new List<Student>();
                foreach (var identifier in identifiers)
                {
                    Students.Add(new Student()
                    {
                        Id = int.Parse(identifier)
                    });
                }
                this.db.Students.RemoveRange(Students);
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }
    }
}
