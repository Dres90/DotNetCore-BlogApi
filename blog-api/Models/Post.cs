using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace blog_api.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Content {get; set;}
        public string Headline {get; set;}
    }
}