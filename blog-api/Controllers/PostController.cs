using blog_api.Models;
using blog_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace blog_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }


        //Get All Posts
        [HttpGet]
        public ActionResult<List<Post>> Get() =>
            _postService.Get();

        //Get a post using a specific ID
        [HttpGet("{id:length(24)}", Name = "GetPost")]
        public ActionResult<Post> Get(string id)
        {
            var post = _postService.Get(id);
            if (post == null)
            {
                return NotFound();
            }

            return post;
        }


        //Create a new Post
        [HttpPost]
        public ActionResult<Post> Create(Post post)
        {
            _postService.Create(post);

            return CreatedAtRoute("GetPost", new { id = post.Id.ToString() }, post);
        }

        //Update a post using a specific Id
        [HttpPut("{id:length(24)}")]
        public ActionResult<Post> Update(string id, Post postIn)
        {
            var post = _postService.Get(id);

            if (post == null)
            {
                return NotFound();
            }

            _postService.Update(id, postIn);

            return postIn;
        }

        //Delete a post using a specific Id
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var post = _postService.Get(id);

            if (post == null)
            {
                return NotFound();
            }

            _postService.Remove(post.Id);

            return NoContent();
        }
    }
}