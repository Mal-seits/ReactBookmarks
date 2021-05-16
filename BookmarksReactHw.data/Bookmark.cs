using System;
using System.Collections.Generic;
using System.Text;

namespace BookmarksReactHw.data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }

     
    }
    public class TopURL
    {
        public int Count { get; set; }
        public string Url { get; set; }
    }
}
