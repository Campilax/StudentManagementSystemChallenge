using CampilaxModel.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CampilaxModel.Interfaces
{
    interface IResponseDetails<TEntity>
    {
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public ResponseCodeEnum ResponseCode { get; set; }
        public long Total { get; set; }
        public long TotalPages { get; set; }
        public long RowsPerPage { get; set; }
        public long PageNumber { get; set; }
        public string QueryString { get; set; }
        public List<TEntity> List { get; set; }
        public TEntity Details { get; set; }
    }
}
