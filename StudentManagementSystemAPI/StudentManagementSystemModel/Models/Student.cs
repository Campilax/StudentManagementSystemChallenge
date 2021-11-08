using System;
using System.Collections.Generic;

#nullable disable

namespace StudentManagementSystemModel.Models
{
    public partial class Student
    {
        public Student()
        {
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public string Career { get; set; }

    }
}
