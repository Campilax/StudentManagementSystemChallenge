using System;
using System.Collections.Generic;
using System.Text;

namespace CampilaxService.Models
{
    public class BaseAccessTokenRequest
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public string ExpiresIn { get; set; }
    }
}
