using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.App;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using API.Controllers;


namespace API.App
{
    [Authorize(Policy = "ПубличенПристап")]
    [ApiController]
     
    public class UsersController : BaseApiController
    {
        private DataContext _dataContext;
        
        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
       // [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _dataContext.Users.ToListAsync();
            return Ok(users);
        }
        //[AllowAnonymous]
        [HttpGet("{id}")]
        
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var users = await _dataContext.Users.FindAsync(id);
            
            return Ok(users);
        }
    }
}
