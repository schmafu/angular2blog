/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
import { NgFor } from "angular2/common";


class BlogPost {
    category:string;
    title: string;
    content: string;
    constructor(title:string, content:string, category?:string) {
        this.category = category || "news";
        this.title = title;
        this.content = content;
    }
    
}


@Component({
    selector: 'blog-post',
    inputs: ['blogPost'],
    host:{
        class: 'row'
    },
    template: `
        
            <div class="four wide column">
                {{blogPost.category}}
            </div>
            <div class="twelve wide column">
                {{blogPost.title}}
            </div>
        
        
            <div class="sixteen wide column">
                {{blogPost.content}}
            </div>
        
    `
})

class BlogPostComponent {
    blogPost: BlogPost;
    constructor() {
        this.blogPost = new BlogPost('mytitle', 'mycontent');
    }
} 

@Component({
    selector: 'blog-input',
    directives: [BlogPostComponent],
    template: `
    <form class="ui large form segment">
        <h3 class="ui header">Create new Post</h3>
        <div class="field">
            <label for="title">Title: </label>
            <input name="title" #newtitle>
        </div>
        <div class="field">
            <label for="content">Content:</label>
            <input name="content" #newcontent>
        </div>
         <div class="field">
            <label for="category">Category:</label>
            <input name="category" #newcategory>
        </div>
        
        <button (click)="submitPost(newtitle, newcontent, newcategory)"
            class="ui positive right floated button">Save</button>
     </form>
     <div class="ui grid posts">
        <blog-post *ngFor="#blog of blogPosts" [blogPost] = "blog">
        </blog-post>
    </div>
     `
})


class BlogApp {
    blogPosts: BlogPost[];
    
    constructor() {
        this.blogPosts = [
            new BlogPost('very interesting title', 'lorem ipsum'),
            new BlogPost('title2', 'content und so', 'random'),
            new BlogPost('last', 'teststuff und so')           
        ];
        
    }
    
    public submitPost(title:HTMLInputElement, content:HTMLInputElement, category: HTMLInputElement) {
        console.log(`store on server: ${title.value}:${content.value}`);
        this.blogPosts.push(new BlogPost(title.value,content.value, category != null? category.value:null));
    }
}


bootstrap(BlogApp);
