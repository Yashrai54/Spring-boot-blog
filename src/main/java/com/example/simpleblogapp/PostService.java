package com.example.simpleblogapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(String title, String content, String author) {
        Post post = new Post(title, content, author);
        return postRepository.save(post);
    }
    public Post getPost(Long id) {
        return postRepository.findById(id).orElse(null);
    }
    public Post updatePost(Long id, String title, String content, String author) {
        Post post = postRepository.findById(id).orElse(null);
        if (post != null) {
            post.setTitle(title);
            post.setContent(content);
            post.setAuthor(author);
            return postRepository.save(post);
        }
        return null;
    }
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
