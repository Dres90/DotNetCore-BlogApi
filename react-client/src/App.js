import React, { Component } from 'react';
import Post from './components/Post'

const host = 'https://localhost:5001/api/post';
const errorMessage = 'Failed! Please look at developer console'

class App extends Component {

  state = {
    posts: [],
    message: ''
  }
  
  //Get all posts on load
  componentDidMount() {
    fetch(host)
      .then(res => res.json())
      .then((data) => {
        this.setState({ posts: data,
        message: 'Get Posts Success!' })
      })
      .catch((err) =>{
        console.log(err);
        this.updateMessage(errorMessage);
      });
  }
  
  //Add new post to state array, not published to API yet
  addPost = () => {
    const data = {
      Id: 'new',
      Headline: '',
      Content: ''
    }
    this.setState({ posts: [...this.state.posts, data] })
    this.updateMessage('');
  }

  //Helper used to update status text displayed
  updateMessage = (message) =>{
    this.setState({
      message: message
    })
  }
  
  //Send new Post to API
  createPost = (index, post) => {
    this.updateMessage('');
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
        this.setState({
          posts,
          message: 'Create Post Success!'
        })
      })
      .catch((err) =>{
        console.log(err);
        this.updateMessage(errorMessage);
      });
  }

  //Update a Post
  savePost = (index, post) => {
    this.updateMessage('');
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
        this.setState({
          posts,
          message: 'Update Post Success!'
        })
      })
      .catch((err) =>{
        console.log(err);
        this.updateMessage(errorMessage);
      });
  }

  //Delete post from API
  deletePost = (index) => {
    this.updateMessage('');
    let post = this.state.posts[index];
    fetch(`${host}/${post.Id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.removePost(index)
        this.setState({message: 'Delete Post Success!'})
      })
      .catch((err) =>{
        console.log(err);
        this.updateMessage(errorMessage);
      });
  }

  //Remove post from react state only
  removePost = (index) => {
    let posts = this.state.posts;
    posts.splice(index, 1);
    this.setState({ posts })
  }

  render() {
    const { posts, message } = this.state;
    return (
      <div>
        <button className="btn btn-default" onClick={() => this.addPost()}>Create Post</button>
        <span className="mark">{message}</span>
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