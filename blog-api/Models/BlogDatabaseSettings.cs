using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace blog_api.Models
{
    public class BlogDatabaseSettings : IBlogDatabaseSettings
    {
        public string PostsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBlogDatabaseSettings
    {
        string PostsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}