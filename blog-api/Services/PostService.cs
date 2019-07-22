using blog_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace blog_api.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _posts;

        //Initialize service with settings settings specified in appsettings.json
        public PostService(IBlogDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _posts = database.GetCollection<Post>(settings.PostsCollectionName);
        }

        //Get all posts
        public List<Post> Get() =>
            _posts.Find(post => true).ToList();

        //Get a specific Post
        public Post Get(string id) =>
            _posts.Find<Post>(post => post.Id == id).FirstOrDefault();
        
        //Create a new Post
        public Post Create(Post post)
        {
            _posts.InsertOne(post);
            return post;
        }
        
        //Update a existing Post
        public void Update(string id, Post postIn) =>
            _posts.ReplaceOne(post => post.Id == id, postIn);
        
        //Delete a Post using id
        public void Remove(string id) => 
            _posts.DeleteOne(post => post.Id == id);
    }
}