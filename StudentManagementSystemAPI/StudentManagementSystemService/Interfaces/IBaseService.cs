using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CampilaxService.Interfaces
{
    public interface IBaseService<TEntity>
    {
        public static string API_Key { get; set; }
        public static string API_Secret { get; set; }

        public Task<TEntity> Initialize(TEntity args);
        public Task<TEntity> Fetch(TEntity args);
    }
}
