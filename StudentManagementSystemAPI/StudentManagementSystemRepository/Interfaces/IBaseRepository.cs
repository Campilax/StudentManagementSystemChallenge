using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagementSystemRepository.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        public Task<List<TEntity>> GetAll(TEntity entity);
        public Task<TEntity> Get(TEntity entity);
        public Task Save(TEntity entity);
        public Task Update(TEntity entity);
        public Task Delete(int identifier);
        public Task Delete(string[] identifiers);
    }
}
