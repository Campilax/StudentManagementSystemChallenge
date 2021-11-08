using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using CampilaxModel.ViewModels;
using CampilaxService.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using SendGrid;
using StrongGrid;
using System.Net;
using CampilaxService.Models;

namespace CampilaxService.Services
{
    public class EmailService : BaseService<MailMessage>
    {

        private readonly IOptions<AppSettings> appSettings;

        public EmailService()
        {

        }
        public EmailService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings;
        }

        public void Authorize(string args)
        {
            throw new NotImplementedException();
        }

        public string Fetch(string code, string node)
        {
            throw new NotImplementedException();
        }

        public async Task SendMail(MailMessage mailMessage)
        {
            try
            {
                var recipients = new List<StrongGrid.Models.MailAddress>();
                var from = new StrongGrid.Models.MailAddress(mailMessage.From, "nairaCompare Team");
                foreach (var recipient in mailMessage.Recipients)
                {
                    recipients.Add(new StrongGrid.Models.MailAddress(recipient, ""));
                }

                var client = new Client(this.appSettings.Value.ClientApiKey);
                var messageId = await client.Mail.SendToMultipleRecipientsAsync(recipients, from, mailMessage.Subject, mailMessage.MessageBody, "").ConfigureAwait(false);

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
