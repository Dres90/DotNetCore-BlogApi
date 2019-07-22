import React, { Component } from 'react';
import './App.css';
import Post from './components/Post'

const host = 'https://localhost:5001/api/post';

class App extends Component {

  state = {
    posts: []
  }


  componentDidMount() {
    fetch(host)
      .then(res => res.json())
      .then((data) => {
        this.setState({ posts: data })
      })
      .catch(console.log)
  }

  addPost = () => {
    const data = {
      Id: 'new',
      Headline: '',
      Content: ''
    }
    this.setState({ posts: [...this.state.posts, data]})
  }

  createPost = (index, post) => {
    fetch(host, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: post.content,
        Headline: post.headline
      })
    })
    .then((data) => {
      let posts = this.state.posts;
      posts[index] = data;
      this.setState({ posts })
    })
  }

  savePost = (index, post) => {
    fetch(`${host}/${post.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: post.content,
        Headline: post.headline,
        Id: post.id
      })
    })
    .then((data) => {
      let posts = this.state.posts;
      posts[index] = data;
      this.setState({ posts })
    })
  }
  
  deletePost = (index) => {
    console.log('deletePost', this.state.posts, index)
    let post = this.state.posts[index];
    fetch(`${host}/${post.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      this.removePost(index)
    })
  }

  removePost = (index) => {
    console.log('removePost')
    let posts = this.state.posts;
    posts.splice(index, 1);
    this.setState({ posts })
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <button className="btn btn-default" onClick={() => this.addPost()}>Create Post</button>
        {
          posts.map((post, index) => {
            return <Post post={post} key={index} 
            createPost={this.createPost}
            savePost={this.savePost}
            removePost={this.removePost}
            deletePost={this.deletePost}
            index={index}
            />
          })

        }

      </div>
    );
  }
}

export default App;