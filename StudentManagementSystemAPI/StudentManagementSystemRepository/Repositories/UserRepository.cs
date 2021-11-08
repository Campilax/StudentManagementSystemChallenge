using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StudentManagementSystemModel.Models;
using StudentManagementSystemModel.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace StudentManagementSystemRepository.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        private AppSettings appSettings;
        public UserRepository(StudentManagementSystemContext db, ILogger<UserRepository> logger, IOptions<AppSettings> appSettings) : base(db, logger)
        {
            this.appSettings = appSettings.Value;
        }

        public async Task<List<User>> GetAll(RequestDetails details = null)
        {
            try
            {
                var Users = await this.db.Users.Skip((int)((details.PageNumber - 1) * details.RowsPerPage)).Take((int)details.RowsPerPage).ToListAsync();
                return Users;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<long> GetTotalCount()
        {
            try
            {
                return await this.db.Users.CountAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return 0;
            }
        }

        public new async Task<User> Get(User entity)
        {
            try
            {
                if (entity.UserId >= 1)
                {
                    return await this.db.Users.Where(x => x.UserId == entity.UserId).FirstOrDefaultAsync();
                } 
                else if (entity.UserName != null)
                {
                    return await this.db.Users.Where(x => x.UserName == entity.UserName).FirstOrDefaultAsync();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task Save(UserViewModel entity)
        {
            try
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(entity.Password, out passwordHash, out passwordSalt);
                await this.db.Users.AddAsync(new User()
                {
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    UserName = entity.UserName,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    Oauth = entity.Oauth
                });
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Update(User entity)
        {
            try
            {
                this.db.Update<User>(entity);
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Delete(int identifier)
        {
            try
            {
                this.db.Users.RemoveRange(this.db.Users.Where(user => user.UserId == identifier));
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public new async Task Delete(string[] identifiers)
        {
            try
            {
                List<User> users = new List<User>();
                foreach (var identifier in identifiers)
                {
                    users.Add(new User()
                    {
                        UserId = int.Parse(identifier)
                    });
                }
                this.db.Users.RemoveRange(users);
                await this.db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public async Task<bool> ChangePassword(UserViewModel entity)
        {
            try
            {
                User user = await this.db.Users.Where(x => x.UserName == entity.UserName).FirstOrDefaultAsync();
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(entity.Password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                //user.PasswordSalt = passwordSalt;
                this.db.Update(user);
                this.db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<bool> IsExist(User entity)
        {
            bool state = false;
            try
            {
                User user = await this.db.Users.Where(x => x.UserName == entity.UserName).FirstOrDefaultAsync();
                state = null != user ? true : false;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
            return state;
        }

        public async Task<AuthorizedUserModel> VerifyAccount(UserViewModel entity)
        {
            try
            {
                User user = await this.db.Users.Where(x => x.UserName == entity.UserName).FirstOrDefaultAsync();
                if(null != user)
                {
                    if(VerifyPasswordHash(entity.Password, user.PasswordHash, user.PasswordSalt))
                    {
                        return new AuthorizedUserModel()
                        {
                            UserName = user.UserName,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Token = this.GenerateJwtToken(user)
                        };
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("Password cannot be null.");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password cannot be empty.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("Password cannot be null.");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password cannot be empty.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> IsAccountPasswordValid(string password, User user)
        {
            user = await this.db.Users.Where(x => x.UserId == user.UserId).FirstOrDefaultAsync();
            return VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
        }

        public string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("Credential", (user.UserName)) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
