using System;
using System.Collections.Generic;
using System.Text;

namespace CampilaxService.Models
{
    public class MailMessage
    {
        public string Recipient { get; set; }
        public string[] Recipients { get; set; }
        public string CarbonCopyRecipient { get; set; }
        public string[] CarbonCopyRecipients { get; set; }
        public string From { get; set; }
        public string[] Attachments { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
    }
}
