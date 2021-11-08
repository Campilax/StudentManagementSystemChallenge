using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystemModel.ViewModels
{
    public class RequestDetails
    {
        public string QueryString { get; set; } = "";
        public long RowsPerPage { get; set; }
        public long PageNumber { get; set; } = 1;
        public long? Total { get; set; }
        public long? TotalPages { get; set; }
        public int SortBy { get; set; }
        public int OrderIn { get; set; }
    }
}
