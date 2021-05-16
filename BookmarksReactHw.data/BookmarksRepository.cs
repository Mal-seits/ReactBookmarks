using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BookmarksReactHw.Data;
using Microsoft.EntityFrameworkCore;

namespace BookmarksReactHw.data
{
    public class BookmarksRepository
    {
        private readonly string _connectionString;
        public BookmarksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Bookmark> GetBookmarks(int userId)
        {
            using var context = new URLDbContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new URLDbContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }
        public void UpdateBookmark(Bookmark bookmark)
        {
            using var context = new URLDbContext(_connectionString);
            context.Bookmarks.Attach(bookmark);
            context.Entry(bookmark).State = EntityState.Modified;
            context.SaveChanges();
        }
        public void DeleteBookmark(int bookmarkId)
        {
            using var context = new URLDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {bookmarkId}");
        }
        public List<TopURL> GetTopFiveBookmarks()
        {
            using var context = new URLDbContext(_connectionString);
            return context.Bookmarks.GroupBy(b => b.URL).OrderByDescending(b => b.Count()).Take(5).Select(g => new TopURL { Url = g.Key, Count = g.Count() }).ToList();

        }
             
    }

}
