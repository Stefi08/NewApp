using API.App;
using API.DTOs;
using API.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Services;
using System.IdentityModel.Tokens.Jwt;
using BCrypt;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
  

    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public AccountController(IConfiguration configuration, DataContext dataContext, ITokenService tokenService)
        {
            _configuration = configuration;
            _dataContext = dataContext;
            _tokenService = tokenService;
        }


        [HttpPost("register")]
        
        public async Task<ActionResult<UserDto>> Register(RegisterDto request) 
        {
            
            if (await UserExists(request.UserName))
            {
                return BadRequest("Username already exists");
            }

           
            var user = await CreatePasswordHash(request);
            var token = _tokenService.CreateToken(user);
            // Create a UserDto with the username
            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = token
            };

            return Ok(userDto);
        }

        private async Task<bool> UserExists(string username)
        {
            // You should query your database here to check if the user exists
            var user = _dataContext.Users.FirstOrDefault(x => x.UserName == username);

            // Replace the following line with a database query
            if (user != null)
            {
                return true;
            }
            return false;
        }
        
        [HttpPost("login")]
       
        public async Task<ActionResult<UserDto>> Login(User request)
        {

            var user = _dataContext.Users.FirstOrDefault(x => x.UserName == request.Username);

            if (user != null)
            {
                if (user.UserName != request.Username)
                {

                    return BadRequest("User not found");
                }
            }

            // Check if the user exists (You should query your database here)
            if (user == null)
            {
                return Unauthorized();
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }
            //var userDto = new UserDto();
            //userDto.Username = user.UserName;
            //userDto.Token = CreateToken(user);
            var token = CreateToken(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = token
            };
            return Ok(userDto);
        }
            //string token = CreateToken(user);


        

        private string CreateToken(AppUser user)
        {


            return _tokenService.CreateToken(user);
        }

        private async Task<AppUser> CreatePasswordHash(RegisterDto registerUser)
        {
            using (var hmac = new HMACSHA512())
            {
                var user = new AppUser
                {
                    UserName = registerUser.UserName,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUser.Password)),
                    PasswordSalt = hmac.Key
                };


                _dataContext.Add(user);
                await _dataContext.SaveChangesAsync();

                return user;
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

        
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        }


    }
}

