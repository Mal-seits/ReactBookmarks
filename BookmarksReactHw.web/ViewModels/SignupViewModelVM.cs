using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookmarksReactHw.data;

namespace BookmarksReactHw.web.ViewModels
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
