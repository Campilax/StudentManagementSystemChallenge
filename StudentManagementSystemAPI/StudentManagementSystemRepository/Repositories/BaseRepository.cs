using StudentManagementSystemModel.Models;
using Microsoft.Extensions.Logging;
using Nest;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using StudentManagementSystemRepository.Interfaces;

namespace StudentManagementSystemRepository.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>
    {
        public StudentManagementSystemContext db;
        public ILogger<BaseRepository<TEntity>> logger;

        public BaseRepository(StudentManagementSystemContext db, ILogger<BaseRepository<TEntity>> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<List<TEntity>> GetAll(TEntity entity)
        {
            try
            {
                await Task.Delay(0);
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<TEntity> Get(TEntity entity)
        {
            try
            {
                await Task.Delay(0);
                return default(TEntity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task Save(TEntity entity)
        {
            try
            {
                await Task.Delay(0);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task Update(TEntity entity)
        {
            try
            {
                await Task.Delay(0);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task Delete(int identifier)
        {
            try
            {
                await Task.Delay(0);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task Delete(string[] identifiers)
        {
            try
            {
                await Task.Delay(0);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
