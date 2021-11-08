using MailKit.Net.Smtp;
using MimeKit;
using CampilaxService.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CampilaxService.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity>
    {
        public BaseService()
        {

        }

        public async Task<TEntity> Initialize(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public async Task<TEntity> Fetch(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
