using System;
using System.Collections.Generic;

#nullable disable

namespace StudentManagementSystemModel.Models
{
    public partial class User
    {
        public User()
        {
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string SecurityStamp { get; set; }
        public string Oauth { get; set; }

    }
}
