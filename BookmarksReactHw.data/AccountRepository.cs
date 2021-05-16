using BookmarksReactHw.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookmarksReactHw.data
{
    public class AccountRepository
    {
        private readonly string _connectionString;
        public AccountRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            string passwordHashed = BCrypt.Net.BCrypt.HashPassword(password);
            using var context = new URLDbContext(_connectionString);
            user.PasswordHash = passwordHashed;
            context.Users.Add(user);
            context.SaveChanges();
        }
        public User GetByEmail(string email)
        {
            using var context = new URLDbContext(_connectionString);
            return context.Users.Include(u => u.Bookmarks).FirstOrDefault(u => u.Email == email); 
        }
        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }
            bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isCorrectPassword)
            {
                return null;
            }
            return user;
        }
    }
}
