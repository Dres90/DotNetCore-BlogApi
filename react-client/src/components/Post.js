import React, { Component } from 'react';

class Post extends Component {

    state = {
        headline: '',
        content: '',
        id: '',
        isNew: true
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    savePost = event =>  {
        event.preventDefault();
        if(this.state.isNew){
            this.props.createPost(this.props.index, this.state);
        }
        else
            this.props.savePost(this.props.index, this.state);
    }

    deletePost = () => {
        event.preventDefault();
        if(this.state.isNew){
            this.props.removePost(this.props.index);
        }
        else
            this.props.deletePost(this.props.index);
    }

    componentDidMount = () => {
        let post = this.props.post;
        if (post) {
            this.setState({
                headline: post.Headline,
                content: post.Content,
                id: post.Id,
                isNew: post.Id === 'new'
            })
        }
    }

    render() {
        const { headline, content } = this.state;
        return (
            <div className="card">
                <form>

                    <div className="form-group">
                        <label htmlFor="headline">Headline:</label>
                        <input
                            name="headline"
                            type="text"
                            value={headline}
                            onChange={this.onChange}
                            id="headline"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <input
                            name="content"
                            type="text"
                            value={content}
                            onChange={this.onChange}
                            id="content"
                        />
                    </div>
                    <div>
                        <button className="btn btn-default" onClick={this.savePost}>Save Post</button>
                        <button className="btn btn-default" onClick={this.deletePost}>Delete Post</button>
                    </div>
                </form>
            </div>
        );
    }
}



export default Post;