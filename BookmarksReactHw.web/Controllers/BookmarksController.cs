using BookmarksReactHw.data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace BookmarksReactHw.web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connectionString;
   
        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
           
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetTopFiveBookmarks")]
        public List<TopURL> GetTopFiveBookmarks()
        {
            var bookmarksRepo = new BookmarksRepository(_connectionString);
            var bookmarks = bookmarksRepo.GetTopFiveBookmarks();
            return bookmarks;
        }

        [HttpGet]
        [Route("GetUsersBookmarks")]
        public List<Bookmark> GetUsersBookmarks()
        {
            string userId = User.FindFirst("user")?.Value;
            var accountRepo = new AccountRepository(_connectionString);
            var user = accountRepo.GetByEmail(userId);
            var bookmarksRepo = new BookmarksRepository(_connectionString);
            var bookmarks = bookmarksRepo.GetBookmarks(user.Id);
            return bookmarks;
        }

        [HttpPost]
        [Route("AddBookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            string userId = User.FindFirst("user")?.Value;
            var accountRepo = new AccountRepository(_connectionString);
            var user = accountRepo.GetByEmail(userId);
            bookmark.UserId = user.Id;
            var repo = new BookmarksRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }
        [HttpPost]
        [Route("UpdateBookmark")]
        public void UpdateBookmark(Bookmark bookmark)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.UpdateBookmark(bookmark);
        }
        [HttpPost]
        [Route("DeleteBookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.DeleteBookmark(bookmark.Id);
        }
    }
}
