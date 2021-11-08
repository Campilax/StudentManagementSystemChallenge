using StudentManagementSystemModel.Models;
using System;
using System.Collections.Generic;

namespace StudentManagementSystemModel.ViewModels
{
    public partial class UserViewModel : User
    {
        public string Password { get; set; }
    }
    public partial class AuthorizedUserModel
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
    }
    public partial class UserAuthorizationCredentialModel : User
    {
        public string Token { get; set; }
        public string PublicKey { get; set; }
    }

    public class UserResponseDetails : ResponseDetails<User>{}

}
