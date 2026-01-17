// =========== LOCAL STORAGE BACKEND SYSTEM ===========
class CommunityBackend {
    constructor() {
        this.USERS_KEY = 'petcare_community_users_v2';
        this.POSTS_KEY = 'petcare_community_posts_v2';
        this.LIKES_KEY = 'petcare_community_likes_v2';
        this.COMMENTS_KEY = 'petcare_community_comments_v2';
        this.FOLLOWS_KEY = 'petcare_community_follows_v2';
        this.CURRENT_USER_KEY = 'petcare_current_user_v2';
        this.SESSIONS_KEY = 'petcare_sessions_v2';
        this.MEDIA_KEY = 'petcare_community_media_v2';
        this.initStorage();
    }
    
    initStorage() {
        // Initialize users if not exists
        if (!localStorage.getItem(this.USERS_KEY)) {
            const initialUsers = [
                {
                    id: this.generateId(),
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    petName: 'Buddy',
                    petType: 'Dog',
                    avatar: 'JD',
                    bio: 'Dog lover and proud owner of Buddy!',
                    isOnline: true,
                    joinedAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    postCount: 5,
                    likeCount: 12,
                    followers: 3,
                    following: 2
                },
                {
                    id: this.generateId(),
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    password: 'password123',
                    petName: 'Whiskers',
                    petType: 'Cat',
                    avatar: 'JS',
                    bio: 'Cat enthusiast and pet photographer',
                    isOnline: true,
                    joinedAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    postCount: 8,
                    likeCount: 15,
                    followers: 5,
                    following: 3
                },
                {
                    id: this.generateId(),
                    name: 'Mike Wilson',
                    email: 'mike@example.com',
                    password: 'password123',
                    petName: 'Max',
                    petType: 'Dog',
                    avatar: 'MW',
                    bio: 'Professional dog trainer',
                    isOnline: true,
                    joinedAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    postCount: 12,
                    likeCount: 25,
                    followers: 8,
                    following: 4
                },
                {
                    id: this.generateId(),
                    name: 'Sarah Johnson',
                    email: 'sarah@example.com',
                    password: 'password123',
                    petName: 'Coco',
                    petType: 'Bird',
                    avatar: 'SJ',
                    bio: 'Bird expert and conservationist',
                    isOnline: false,
                    joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    postCount: 3,
                    likeCount: 8,
                    followers: 2,
                    following: 1
                },
                {
                    id: this.generateId(),
                    name: 'Alex Chen',
                    email: 'alex@example.com',
                    password: 'password123',
                    petName: 'Luna',
                    petType: 'Rabbit',
                    avatar: 'AC',
                    bio: 'Small animal specialist',
                    isOnline: true,
                    joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                    lastLogin: new Date().toISOString(),
                    postCount: 6,
                    likeCount: 18,
                    followers: 4,
                    following: 3
                }
            ];
            localStorage.setItem(this.USERS_KEY, JSON.stringify(initialUsers));
        }
        
        // Initialize posts if not exists
        if (!localStorage.getItem(this.POSTS_KEY)) {
            const users = JSON.parse(localStorage.getItem(this.USERS_KEY));
            const initialPosts = [
                {
                    id: this.generateId(),
                    userId: users[0].id,
                    content: 'Just took Buddy to the park! He made so many new friends today. 🐾 #HappyPet #DogLife',
                    media: {
                        type: 'image',
                        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+U2FtcGxlIERvZyBQaG90bzwvdGV4dD48L3N2Zz4=',
                        thumbnail: ''
                    },
                    likes: 12,
                    comments: 3,
                    shares: 2,
                    tags: ['#HappyPet', '#DogLife'],
                    location: 'Central Park',
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                    isPinned: false
                },
                {
                    id: this.generateId(),
                    userId: users[1].id,
                    content: 'New video of Whiskers learning tricks! Watch till the end for the cute surprise! 😺 #CatTraining #PetVideo',
                    media: {
                        type: 'video',
                        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNzY0YmEyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+U2FtcGxlIFZpZGVvPC90ZXh0Pjwvc3ZnPg==',
                        thumbnail: '',
                        duration: '1:45'
                    },
                    likes: 15,
                    comments: 5,
                    shares: 3,
                    tags: ['#CatTraining', '#PetVideo'],
                    location: 'Home',
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                    isPinned: false
                },
                {
                    id: this.generateId(),
                    userId: users[2].id,
                    content: 'Training tips for a hyperactive puppy? Max just won\'t sit still! Any advice is appreciated. 🐶 #TrainingTips #Help',
                    media: null,
                    likes: 8,
                    comments: 7,
                    shares: 1,
                    tags: ['#TrainingTips', '#Help'],
                    location: '',
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                    isPinned: false
                },
                {
                    id: this.generateId(),
                    userId: users[3].id,
                    content: 'Beautiful day at the aviary! Coco made a new feathered friend today. 🐦 #BirdLife #Nature',
                    media: {
                        type: 'image',
                        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDBjMDU3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+U2FtcGxlIEJpcmQgUGhvdG88L3RleHQ+PC9zdmc+',
                        thumbnail: ''
                    },
                    likes: 10,
                    comments: 4,
                    shares: 2,
                    tags: ['#BirdLife', '#Nature'],
                    location: 'City Aviary',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                    isPinned: false
                },
                {
                    id: this.generateId(),
                    userId: users[4].id,
                    content: 'Luna\'s new bunny setup! What do you think? 🐰 #Rabbit #PetSetup',
                    media: {
                        type: 'image',
                        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZjYTU3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+U2FtcGxlIEJ1bm55IEhvbWU8L3RleHQ+PC9zdmc+',
                        thumbnail: ''
                    },
                    likes: 14,
                    comments: 6,
                    shares: 3,
                    tags: ['#Rabbit', '#PetSetup'],
                    location: '',
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString(),
                    isPinned: false
                }
            ];
            localStorage.setItem(this.POSTS_KEY, JSON.stringify(initialPosts));
        }
        
        // Initialize other storages
        if (!localStorage.getItem(this.LIKES_KEY)) {
            localStorage.setItem(this.LIKES_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.COMMENTS_KEY)) {
            localStorage.setItem(this.COMMENTS_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.FOLLOWS_KEY)) {
            localStorage.setItem(this.FOLLOWS_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.SESSIONS_KEY)) {
            localStorage.setItem(this.SESSIONS_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.MEDIA_KEY)) {
            localStorage.setItem(this.MEDIA_KEY, JSON.stringify({}));
        }
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // =========== USER MANAGEMENT ===========
    async authenticateUser(email, password, rememberMe = false) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        // Update user status
        user.isOnline = true;
        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);
        
        // Create session
        const sessionId = this.generateId();
        const sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY));
        sessions[sessionId] = {
            userId: user.id,
            email: user.email,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
        
        // Store current user (without password)
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        
        if (rememberMe) {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        } else {
            sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        }
        
        return { 
            success: true, 
            message: 'Login successful',
            user: userWithoutPassword,
            token: sessionId
        };
    }
    
    async registerUser(userData) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        
        if (users.some(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        const newUser = {
            id: this.generateId(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            petName: userData.petName || '',
            petType: userData.petType || '',
            avatar: this.getInitials(userData.name),
            bio: `Hello! I'm ${userData.petName ? userData.petName + "'s" : 'a'} pet parent`,
            isOnline: true,
            joinedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            postCount: 0,
            likeCount: 0,
            followers: 0,
            following: 0
        };
        
        users.push(newUser);
        this.saveUsers(users);
        
        // Store current user
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        
        return { 
            success: true, 
            message: 'Registration successful',
            user: userWithoutPassword
        };
    }
    
    getCurrentUser() {
        let userStr = localStorage.getItem(this.CURRENT_USER_KEY) || 
                     sessionStorage.getItem(this.CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }
    
    logout() {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            // Update user as offline
            const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex > -1) {
                users[userIndex].isOnline = false;
                this.saveUsers(users);
            }
        }
        
        localStorage.removeItem(this.CURRENT_USER_KEY);
        sessionStorage.removeItem(this.CURRENT_USER_KEY);
        return { success: true, message: 'Logged out successfully' };
    }
    
    updateUserProfile(userId, updateData) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }
        
        users[userIndex] = { ...users[userIndex], ...updateData };
        this.saveUsers(users);
        
        // Update current user if it's the same user
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            const updatedUser = { ...currentUser, ...updateData };
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
        }
        
        return { success: true, message: 'Profile updated' };
    }
    
    // =========== POST MANAGEMENT ===========
    async createPost(userId, content, media = null, tags = [], location = '') {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        
        const newPost = {
            id: this.generateId(),
            userId,
            content,
            media,
            likes: 0,
            comments: 0,
            shares: 0,
            tags,
            location,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isPinned: false
        };
        
        posts.unshift(newPost);
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
        
        // Update user's post count
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            users[userIndex].postCount = (users[userIndex].postCount || 0) + 1;
            this.saveUsers(users);
        }
        
        return { 
            success: true, 
            message: 'Post created successfully',
            post: newPost
        };
    }
    
    getPosts(filter = 'all', userId = null, limit = 10, offset = 0) {
        let posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        
        // Apply filters
        switch (filter) {
            case 'popular':
                posts.sort((a, b) => (b.likes + b.comments * 2) - (a.likes + a.comments * 2));
                break;
            case 'recent':
                posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'following':
                if (userId) {
                    const follows = JSON.parse(localStorage.getItem(this.FOLLOWS_KEY) || '{}');
                    const following = follows[`user_${userId}`] || [];
                    posts = posts.filter(post => following.includes(post.userId));
                }
                break;
            case 'media':
                posts = posts.filter(post => post.media !== null);
                break;
            default:
                // 'all' - already sorted by recency
                posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        return posts.slice(offset, offset + limit);
    }
    
    getTotalPosts() {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        return posts.length;
    }
    
    getPostsByUser(userId) {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        return posts.filter(post => post.userId === userId);
    }
    
    // =========== LIKE SYSTEM ===========
    async likePost(postId, userId) {
        const likes = JSON.parse(localStorage.getItem(this.LIKES_KEY) || '{}');
        const postKey = `post_${postId}`;
        
        if (!likes[postKey]) {
            likes[postKey] = [];
        }
        
        const userIndex = likes[postKey].indexOf(userId);
        let liked = false;
        
        if (userIndex === -1) {
            // Add like
            likes[postKey].push(userId);
            liked = true;
        } else {
            // Remove like
            likes[postKey].splice(userIndex, 1);
            liked = false;
        }
        
        localStorage.setItem(this.LIKES_KEY, JSON.stringify(likes));
        
        // Update post likes count
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex > -1) {
            posts[postIndex].likes = likes[postKey].length;
            localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
            
            // Update user's like count
            const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
            const userIndex = users.findIndex(u => u.id === posts[postIndex].userId);
            if (userIndex > -1) {
                users[userIndex].likeCount = (users[userIndex].likeCount || 0) + (liked ? 1 : -1);
                this.saveUsers(users);
            }
        }
        
        return { 
            success: true, 
            liked,
            likes: likes[postKey].length
        };
    }
    
    hasUserLiked(postId, userId) {
        if (!userId) return false;
        const likes = JSON.parse(localStorage.getItem(this.LIKES_KEY) || '{}');
        const postKey = `post_${postId}`;
        return likes[postKey] && likes[postKey].includes(userId);
    }
    
    // =========== COMMENT SYSTEM ===========
    async addComment(postId, userId, content) {
        const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '{}');
        const postKey = `post_${postId}`;
        
        if (!comments[postKey]) {
            comments[postKey] = [];
        }
        
        const newComment = {
            id: this.generateId(),
            userId,
            content,
            likes: 0,
            createdAt: new Date().toISOString(),
            replies: []
        };
        
        comments[postKey].unshift(newComment);
        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));
        
        // Update post comments count
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex > -1) {
            posts[postIndex].comments = comments[postKey].length;
            localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
        }
        
        return { 
            success: true, 
            message: 'Comment added',
            comment: newComment
        };
    }
    
    async addReply(commentId, postId, userId, content) {
        const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '{}');
        const postKey = `post_${postId}`;
        
        if (!comments[postKey]) {
            return { success: false, message: 'Post not found' };
        }
        
        const commentIndex = comments[postKey].findIndex(c => c.id === commentId);
        if (commentIndex === -1) {
            return { success: false, message: 'Comment not found' };
        }
        
        const reply = {
            id: this.generateId(),
            userId,
            content,
            createdAt: new Date().toISOString()
        };
        
        if (!comments[postKey][commentIndex].replies) {
            comments[postKey][commentIndex].replies = [];
        }
        
        comments[postKey][commentIndex].replies.push(reply);
        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));
        
        return { 
            success: true, 
            message: 'Reply added',
            reply
        };
    }
    
    getComments(postId) {
        const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '{}');
        const postKey = `post_${postId}`;
        return comments[postKey] || [];
    }
    
    // =========== FOLLOW SYSTEM ===========
    async followUser(followerId, followingId) {
        if (followerId === followingId) {
            return { success: false, message: 'Cannot follow yourself' };
        }
        
        const follows = JSON.parse(localStorage.getItem(this.FOLLOWS_KEY) || '{}');
        const followerKey = `user_${followerId}`;
        const followingKey = `user_${followingId}`;
        
        if (!follows[followerKey]) {
            follows[followerKey] = [];
        }
        
        if (!follows[followingKey]) {
            follows[followingKey] = [];
        }
        
        const isFollowing = follows[followerKey].includes(followingId);
        let followed = false;
        
        if (!isFollowing) {
            follows[followerKey].push(followingId);
            followed = true;
        } else {
            const index = follows[followerKey].indexOf(followingId);
            follows[followerKey].splice(index, 1);
            followed = false;
        }
        
        localStorage.setItem(this.FOLLOWS_KEY, JSON.stringify(follows));
        
        // Update user follower/following counts
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        
        const followerIndex = users.findIndex(u => u.id === followerId);
        if (followerIndex > -1) {
            users[followerIndex].following = follows[followerKey].length;
        }
        
        const followingIndex = users.findIndex(u => u.id === followingId);
        if (followingIndex > -1) {
            if (!follows[followingKey]) follows[followingKey] = [];
            // Count how many users are following this user
            const followerCount = Object.keys(follows).reduce((count, key) => {
                if (key !== followingKey && follows[key].includes(followingId)) {
                    return count + 1;
                }
                return count;
            }, 0);
            users[followingIndex].followers = followerCount;
        }
        
        this.saveUsers(users);
        
        return { 
            success: true, 
            followed,
            message: followed ? 'User followed' : 'User unfollowed'
        };
    }
    
    isFollowing(followerId, followingId) {
        if (!followerId || !followingId) return false;
        const follows = JSON.parse(localStorage.getItem(this.FOLLOWS_KEY) || '{}');
        const followerKey = `user_${followerId}`;
        return follows[followerKey] && follows[followerKey].includes(followingId);
    }
    
    // =========== MEDIA HANDLING ===========
    async uploadMedia(file, type) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const mediaId = this.generateId();
                const mediaData = {
                    id: mediaId,
                    type,
                    data: e.target.result,
                    name: file.name,
                    size: file.size,
                    uploadedAt: new Date().toISOString()
                };
                
                // Store in localStorage (limited to 5MB per item)
                if (file.size > 5 * 1024 * 1024) {
                    reject(new Error('File size must be less than 5MB'));
                    return;
                }
                
                // For demo, we'll use a simple data URL
                // In production, you'd upload to a server
                resolve({
                    success: true,
                    mediaId,
                    url: e.target.result,
                    thumbnail: type === 'video' ? this.generateVideoThumbnail(file) : null
                });
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            if (type === 'image') {
                reader.readAsDataURL(file);
            } else if (type === 'video') {
                reader.readAsDataURL(file);
            }
        });
    }
    
    generateVideoThumbnail(file) {
        // For demo, return a placeholder
        // In a real app, you'd generate a thumbnail from the video
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+VmlkZW8gVGh1bWJuYWlsPC90ZXh0Pjwvc3ZnPg==';
    }
    
    // =========== COMMUNITY DATA ===========
    getOnlineUsers() {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        return users
            .filter(user => user.isOnline)
            .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
            .slice(0, 8);
    }
    
    getTotalUsers() {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        return users.length;
    }
    
    getTodayPosts() {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return posts.filter(post => new Date(post.createdAt) >= today).length;
    }
    
    getTrendingTopics() {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const tagCounts = {};
        
        posts.forEach(post => {
            post.tags?.forEach(tag => {
                const cleanTag = tag.toLowerCase().replace('#', '');
                tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
            });
        });
        
        return Object.entries(tagCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .map(([tag]) => `#${tag}`);
    }
    
    getTopContributors() {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        return users
            .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
            .slice(0, 5);
    }
    
    getUserById(userId) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        const user = users.find(u => u.id === userId);
        if (user) {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }
        return null;
    }
    
    // =========== HELPER METHODS ===========
    getInitials(name) {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }
    
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
}

// Initialize backend
const backend = new CommunityBackend();

// =========== APPLICATION STATE ===========
let currentUser = null;
let posts = [];
let currentFilter = 'all';
let currentPage = 0;
const postsPerPage = 5;
let isLoading = false;
let selectedMedia = {
    image: null,
    video: null
};

// =========== DOM ELEMENTS ===========
const dom = {
    // Navigation
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Sidebar
    onlineUsers: document.getElementById('onlineUsers'),
    totalPosts: document.getElementById('totalPosts'),
    totalUsers: document.getElementById('totalUsers'),
    onlineCount: document.getElementById('onlineCount'),
    todayPosts: document.getElementById('todayPosts'),
    trendingTopics: document.getElementById('trendingTopics'),
    topContributors: document.getElementById('topContributors'),
    
    // Create Post
    currentUserAvatar: document.getElementById('currentUserAvatar'),
    currentUserName: document.getElementById('currentUserName'),
    postContent: document.getElementById('postContent'),
    mediaPreview: document.getElementById('mediaPreview'),
    imagePreview: document.getElementById('imagePreview'),
    videoPreview: document.getElementById('videoPreview'),
    previewImage: document.getElementById('previewImage'),
    previewVideo: document.getElementById('previewVideo'),
    charCount: document.getElementById('charCount'),
    
    // Posts Feed
    postsFeed: document.getElementById('postsFeed'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    registerModal: document.getElementById('registerModal'),
    emojiModal: document.getElementById('emojiModal'),
    profileModal: document.getElementById('profileModal'),
    
    // Loading
    loadingOverlay: document.getElementById('loadingOverlay'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// =========== INITIALIZATION ===========
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Auto-check for updates every 30 seconds
    setInterval(updateCommunityData, 30000);
});

async function initializeApp() {
    showLoading();
    
    // Check authentication
    await checkAuthStatus();
    
    // Load initial data
    await loadCommunityData();
    await loadPosts();
    
    // Set up event listeners
    setupEventListeners();
    
    hideLoading();
}

// =========== AUTHENTICATION FUNCTIONS ===========
async function checkAuthStatus() {
    currentUser = backend.getCurrentUser();
    
    if (currentUser) {
        // User is logged in
        dom.loginBtn.style.display = 'none';
        dom.logoutBtn.style.display = 'flex';
        document.querySelector('.create-post').style.display = 'block';
        
        // Update user info in create post
        dom.currentUserAvatar.textContent = currentUser.avatar;
        dom.currentUserName.textContent = `What's on your mind, ${currentUser.name.split(' ')[0]}?`;
        
        // Update current user as online
        backend.updateUserProfile(currentUser.id, { isOnline: true });
    } else {
        // User is not logged in
        dom.loginBtn.style.display = 'flex';
        dom.logoutBtn.style.display = 'none';
        document.querySelector('.create-post').style.display = 'none';
    }
}

function showModal(modalId) {
    dom[modalId].style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    dom[modalId].style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showLogin() {
    closeModal('registerModal');
    showModal('loginModal');
}

function showRegister() {
    closeModal('loginModal');
    showModal('registerModal');
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showToast('Please enter email and password', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const result = await backend.authenticateUser(email, password, rememberMe);
        
        if (result.success) {
            showToast('Welcome back!', 'success');
            closeModal('loginModal');
            await checkAuthStatus();
            await loadCommunityData();
            await loadPosts();
            
            // Clear form
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Login failed. Please try again.', 'error');
        console.error('Login error:', error);
    } finally {
        hideLoading();
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const petName = document.getElementById('registerPetName').value;
    const petType = document.getElementById('registerPetType').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const result = await backend.registerUser({
            name,
            email,
            password,
            petName,
            petType
        });
        
        if (result.success) {
            showToast('Account created successfully!', 'success');
            closeModal('registerModal');
            await checkAuthStatus();
            await loadCommunityData();
            await loadPosts();
            
            // Clear form
            document.getElementById('registerName').value = '';
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('registerConfirmPassword').value = '';
            document.getElementById('registerPetName').value = '';
            document.getElementById('registerPetType').value = '';
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Registration failed. Please try again.', 'error');
        console.error('Registration error:', error);
    } finally {
        hideLoading();
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        backend.logout();
        showToast('Logged out successfully', 'success');
        checkAuthStatus();
        loadCommunityData();
        loadPosts();
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.toggle-password');
    const icon = toggleBtn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// =========== COMMUNITY FUNCTIONS ===========
async function loadCommunityData() {
    try {
        // Load online users
        const onlineUsers = backend.getOnlineUsers();
        renderOnlineUsers(onlineUsers);
        
        // Update stats
        dom.totalPosts.textContent = backend.getTotalPosts();
        dom.totalUsers.textContent = backend.getTotalUsers();
        dom.onlineCount.textContent = onlineUsers.length;
        dom.todayPosts.textContent = backend.getTodayPosts();
        
        // Load trending topics
        const trendingTopics = backend.getTrendingTopics();
        renderTrendingTopics(trendingTopics);
        
        // Load top contributors
        const topContributors = backend.getTopContributors();
        renderTopContributors(topContributors);
    } catch (error) {
        console.error('Error loading community data:', error);
    }
}

function renderOnlineUsers(users) {
    dom.onlineUsers.innerHTML = '';
    
    if (users.length === 0) {
        dom.onlineUsers.innerHTML = '<p style="text-align: center; opacity: 0.8; padding: 20px;">No users online</p>';
        return;
    }
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user-item';
        userElement.onclick = () => showUserProfile(user.id);
        userElement.innerHTML = `
            <div class="user-avatar-small">${user.avatar}</div>
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${user.petName ? 'Pet: ' + user.petName : 'Pet lover'}</p>
            </div>
            <div class="status-online"></div>
        `;
        dom.onlineUsers.appendChild(userElement);
    });
}

function renderTrendingTopics(topics) {
    dom.trendingTopics.innerHTML = '';
    
    if (topics.length === 0) {
        dom.trendingTopics.innerHTML = '<p style="opacity: 0.7; text-align: center;">No trending topics</p>';
        return;
    }
    
    topics.forEach(topic => {
        const topicElement = document.createElement('div');
        topicElement.className = 'topic-tag';
        topicElement.textContent = topic;
        topicElement.onclick = () => searchByTag(topic);
        dom.trendingTopics.appendChild(topicElement);
    });
}

function renderTopContributors(contributors) {
    dom.topContributors.innerHTML = '';
    
    contributors.forEach((user, index) => {
        const contributorElement = document.createElement('div');
        contributorElement.className = 'contributor-item';
        contributorElement.onclick = () => showUserProfile(user.id);
        contributorElement.innerHTML = `
            <div class="contributor-rank">${index + 1}</div>
            <div class="user-avatar-small">${user.avatar}</div>
            <div style="flex: 1;">
                <div style="font-weight: bold;">${user.name}</div>
                <div style="font-size: 12px; opacity: 0.8;">${user.postCount} posts</div>
            </div>
        `;
        dom.topContributors.appendChild(contributorElement);
    });
}

// =========== POST MANAGEMENT ===========
async function loadPosts(reset = true) {
    if (isLoading) return;
    
    if (reset) {
        currentPage = 0;
        dom.postsFeed.innerHTML = '';
    }
    
    showLoading();
    isLoading = true;
    
    try {
        const newPosts = backend.getPosts(
            currentFilter, 
            currentUser?.id, 
            postsPerPage, 
            currentPage * postsPerPage
        );
        
        if (newPosts.length > 0) {
            renderPosts(newPosts, !reset);
            currentPage++;
        }
        
        // Show/hide load more button
        const allPosts = backend.getPosts(currentFilter, currentUser?.id, 1000, 0);
        dom.loadMoreBtn.style.display = 
            (currentPage * postsPerPage) < allPosts.length ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading posts:', error);
        showToast('Failed to load posts', 'error');
    } finally {
        hideLoading();
        isLoading = false;
    }
}

async function loadMorePosts() {
    await loadPosts(false);
}

function filterPosts(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reload posts
    loadPosts(true);
}

function renderPosts(postsList, append = false) {
    if (!append) {
        dom.postsFeed.innerHTML = '';
    }
    
    if (postsList.length === 0 && !append) {
        dom.postsFeed.innerHTML = `
            <div class="post-card" style="text-align: center; padding: 40px 20px;">
                <h3>No posts yet</h3>
                <p style="margin: 15px 0; opacity: 0.8;">Be the first to share something with the community!</p>
                ${!currentUser ? `
                    <button class="post-btn" onclick="showLogin()" style="margin: 20px auto;">
                        <i class="fas fa-sign-in-alt"></i> Sign in to post
                    </button>
                ` : ''}
            </div>
        `;
        return;
    }
    
    postsList.forEach(post => {
        const user = backend.getUserById(post.userId);
        if (!user) return;
        
        const postElement = createPostElement(post, user);
        if (append) {
            dom.postsFeed.appendChild(postElement);
        } else {
            dom.postsFeed.insertBefore(postElement, dom.postsFeed.firstChild);
        }
    });
}

function createPostElement(post, user) {
    const postElement = document.createElement('div');
    postElement.className = 'post-card fade-in';
    postElement.setAttribute('data-post-id', post.id);
    
    const timeAgo = getTimeAgo(new Date(post.createdAt));
    const hasLiked = backend.hasUserLiked(post.id, currentUser?.id);
    
    // Media HTML
    let mediaHtml = '';
    if (post.media) {
        if (post.media.type === 'image') {
            mediaHtml = `
                <div class="post-media">
                    <img src="${post.media.url}" alt="Post image" onclick="openMediaViewer('${post.media.url}', 'image')">
                </div>
            `;
        } else if (post.media.type === 'video') {
            mediaHtml = `
                <div class="post-media">
                    <video controls poster="${post.media.thumbnail || ''}">
                        <source src="${post.media.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        }
    }
    
    // Tags HTML
    let tagsHtml = '';
    if (post.tags && post.tags.length > 0) {
        tagsHtml = `
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="post-tag" onclick="searchByTag('${tag}')">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    // Location HTML
    let locationHtml = '';
    if (post.location) {
        locationHtml = `
            <div style="margin: 10px 0; font-size: 14px; opacity: 0.8;">
                <i class="fas fa-map-marker-alt"></i> ${post.location}
            </div>
        `;
    }
    
    postElement.innerHTML = `
        <div class="post-header" onclick="showUserProfile('${user.id}')">
            <div class="user-avatar-small">${user.avatar}</div>
            <div class="post-user-info">
                <h3>${user.name}</h3>
                <div class="post-time">
                    <i class="far fa-clock"></i> ${timeAgo}
                    ${post.isPinned ? '<i class="fas fa-thumbtack" style="color: #feca57; margin-left: 10px;"></i>' : ''}
                </div>
            </div>
            ${currentUser && currentUser.id !== user.id ? `
                <button class="follow-btn" onclick="toggleFollow(event, '${user.id}')">
                    ${backend.isFollowing(currentUser.id, user.id) ? 'Following' : 'Follow'}
                </button>
            ` : ''}
        </div>
        
        <div class="post-content">${formatPostContent(post.content)}</div>
        
        ${locationHtml}
        ${mediaHtml}
        ${tagsHtml}
        
        <div class="post-stats">
            <div class="stat ${hasLiked ? 'liked' : ''}" onclick="likePost('${post.id}', this)">
                <i class="fas fa-heart"></i>
                <span class="like-count">${post.likes}</span> likes
            </div>
            <div class="stat" onclick="showComments('${post.id}', this)">
                <i class="fas fa-comment"></i>
                <span class="comment-count">${post.comments}</span> comments
            </div>
            <div class="stat" onclick="sharePost('${post.id}')">
                <i class="fas fa-share"></i>
                <span>${post.shares || 0}</span> shares
            </div>
        </div>
        
        <div class="post-actions-buttons">
            <button class="action-btn ${hasLiked ? 'liked' : ''}" onclick="likePost('${post.id}', this.parentElement.parentElement.querySelector('.stat'))">
                <i class="fas fa-heart"></i> ${hasLiked ? 'Liked' : 'Like'}
            </button>
            <button class="action-btn" onclick="focusComment('${post.id}')">
                <i class="fas fa-comment"></i> Comment
            </button>
            <button class="action-btn" onclick="sharePost('${post.id}')">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
        
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            <div class="comment-input">
                <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." 
                       onkeypress="if(event.key === 'Enter') postComment('${post.id}')">
                <button class="action-btn" onclick="postComment('${post.id}')">Post</button>
            </div>
            <div class="comments-list" id="comments-list-${post.id}">
                <!-- Comments will be loaded here -->
            </div>
        </div>
    `;
    
    return postElement;
}

// =========== POST CREATION ===========
async function createPost() {
    if (!currentUser) {
        showToast('Please sign in to create a post', 'error');
        showLogin();
        return;
    }
    
    const content = dom.postContent.value.trim();
    if (!content && !selectedMedia.image && !selectedMedia.video) {
        showToast('Please write something or add media to post', 'error');
        return;
    }
    
    if (content.length > 500) {
        showToast('Post is too long (max 500 characters)', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Extract tags from content
        const tags = extractTags(content);
        
        // Prepare media object
        let media = null;
        if (selectedMedia.image) {
            media = {
                type: 'image',
                url: selectedMedia.image,
                thumbnail: ''
            };
        } else if (selectedMedia.video) {
            media = {
                type: 'video',
                url: selectedMedia.video,
                thumbnail: ''
            };
        }
        
        const result = await backend.createPost(
            currentUser.id,
            content,
            media,
            tags,
            '' // location would come from addLocation() function
        );
        
        if (result.success) {
            showToast('Post created successfully!', 'success');
            
            // Reset form
            dom.postContent.value = '';
            dom.charCount.textContent = '0';
            removeMedia('image');
            removeMedia('video');
            
            // Reload posts
            await loadPosts(true);
            await loadCommunityData();
        } else {
            showToast('Failed to create post', 'error');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        showToast('Failed to create post', 'error');
    } finally {
        hideLoading();
    }
}

function extractTags(content) {
    const tagRegex = /#(\w+)/g;
    const matches = content.match(tagRegex);
    return matches ? [...new Set(matches)] : [];
}

// =========== MEDIA HANDLING ===========
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('Image must be less than 5MB', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const result = await backend.uploadMedia(file, 'image');
        
        if (result.success) {
            selectedMedia.image = result.url;
            dom.previewImage.src = result.url;
            dom.imagePreview.style.display = 'block';
            showToast('Image added successfully', 'success');
        }
    } catch (error) {
        showToast('Failed to upload image', 'error');
        console.error('Image upload error:', error);
    } finally {
        hideLoading();
        event.target.value = '';
    }
}

async function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
        showToast('Please select a video file', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit for demo
        showToast('Video must be less than 10MB', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const result = await backend.uploadMedia(file, 'video');
        
        if (result.success) {
            selectedMedia.video = result.url;
            dom.previewVideo.src = result.url;
            dom.videoPreview.style.display = 'block';
            showToast('Video added successfully', 'success');
        }
    } catch (error) {
        showToast('Failed to upload video', 'error');
        console.error('Video upload error:', error);
    } finally {
        hideLoading();
        event.target.value = '';
    }
}

function removeMedia(type) {
    if (type === 'image') {
        selectedMedia.image = null;
        dom.imagePreview.style.display = 'none';
        dom.previewImage.src = '';
    } else if (type === 'video') {
        selectedMedia.video = null;
        dom.videoPreview.style.display = 'none';
        dom.previewVideo.src = '';
    }
    
    // Reset file inputs
    document.getElementById('imageUploadInput').value = '';
    document.getElementById('videoUploadInput').value = '';
}

// =========== LIKE SYSTEM ===========
async function likePost(postId, statElement) {
    if (!currentUser) {
        showToast('Please sign in to like posts', 'error');
        showLogin();
        return;
    }
    
    try {
        const result = await backend.likePost(postId, currentUser.id);
        
        if (result.success) {
            // Update like count
            const likeCountElement = statElement.querySelector('.like-count');
            likeCountElement.textContent = result.likes;
            
            // Update heart icon
            const heartIcon = statElement.querySelector('i');
            const likeBtn = statElement.closest('.post-card').querySelector('.action-btn');
            
            if (result.liked) {
                statElement.classList.add('liked');
                heartIcon.style.animation = 'heartBeat 0.5s ease';
                likeBtn.classList.add('liked');
                likeBtn.innerHTML = '<i class="fas fa-heart"></i> Liked';
                
                setTimeout(() => {
                    heartIcon.style.animation = '';
                }, 500);
            } else {
                statElement.classList.remove('liked');
                likeBtn.classList.remove('liked');
                likeBtn.innerHTML = '<i class="fas fa-heart"></i> Like';
            }
        }
    } catch (error) {
        console.error('Error liking post:', error);
        showToast('Failed to like post', 'error');
    }
}

// =========== COMMENT SYSTEM ===========
async function showComments(postId, statElement) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const isVisible = commentsSection.style.display === 'block';
    
    // Toggle visibility
    commentsSection.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        await loadComments(postId);
    }
}

async function loadComments(postId) {
    const commentsList = document.getElementById(`comments-list-${postId}`);
    const comments = backend.getComments(postId);
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 20px;">No comments yet</p>';
        return;
    }
    
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
        const user = backend.getUserById(comment.userId);
        if (!user) return;
        
        const timeAgo = getTimeAgo(new Date(comment.createdAt));
        
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-avatar" onclick="showUserProfile('${user.id}')">${user.avatar}</div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${user.name}</span>
                    <span class="comment-time">${timeAgo}</span>
                </div>
                <div class="comment-text">${comment.content}</div>
                <div class="comment-actions">
                    <span class="comment-action" onclick="likeComment('${postId}', '${comment.id}')">
                        <i class="far fa-heart"></i> Like
                    </span>
                    <span class="comment-action" onclick="showReplyInput('${postId}', '${comment.id}')">
                        <i class="far fa-comment"></i> Reply
                    </span>
                </div>
                ${comment.replies && comment.replies.length > 0 ? `
                    <div class="comment-replies" style="margin-top: 10px; padding-left: 20px; border-left: 2px solid rgba(255,255,255,0.1);">
                        ${comment.replies.map(reply => {
                            const replyUser = backend.getUserById(reply.userId);
                            const replyTime = getTimeAgo(new Date(reply.createdAt));
                            return `
                                <div class="comment-item" style="background: rgba(255,255,255,0.05); margin: 8px 0;">
                                    <div class="comment-avatar" style="width: 25px; height: 25px; font-size: 12px;">${replyUser?.avatar || '?'}</div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <span class="comment-author">${replyUser?.name || 'User'}</span>
                                            <span class="comment-time">${replyTime}</span>
                                        </div>
                                        <div class="comment-text">${reply.content}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : ''}
                <div class="reply-input" id="reply-input-${postId}-${comment.id}" style="display: none; margin-top: 10px;">
                    <input type="text" placeholder="Write a reply..." 
                           onkeypress="if(event.key === 'Enter') postReply('${postId}', '${comment.id}')">
                    <button class="action-btn" style="margin-top: 5px; padding: 8px 15px;" 
                            onclick="postReply('${postId}', '${comment.id}')">Reply</button>
                </div>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

async function postComment(postId) {
    if (!currentUser) {
        showToast('Please sign in to comment', 'error');
        showLogin();
        return;
    }
    
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();
    
    if (!content) {
        showToast('Please write a comment', 'error');
        return;
    }
    
    try {
        const result = await backend.addComment(postId, currentUser.id, content);
        
        if (result.success) {
            showToast('Comment added!', 'success');
            input.value = '';
            
            // Update comment count
            const postElement = document.querySelector(`[data-post-id="${postId}"]`);
            const commentCountElement = postElement.querySelector('.comment-count');
            const comments = backend.getComments(postId);
            commentCountElement.textContent = comments.length;
            
            // Reload comments
            await loadComments(postId);
        }
    } catch (error) {
        console.error('Error posting comment:', error);
        showToast('Failed to post comment', 'error');
    }
}

function focusComment(postId) {
    if (!currentUser) {
        showToast('Please sign in to comment', 'error');
        showLogin();
        return;
    }
    
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.style.display = 'block';
    const input = document.getElementById(`comment-input-${postId}`);
    input.focus();
    
    // Load comments if not loaded
    const commentsList = document.getElementById(`comments-list-${postId}`);
    if (commentsList.children.length === 0) {
        loadComments(postId);
    }
}

function showReplyInput(postId, commentId) {
    const replyInput = document.getElementById(`reply-input-${postId}-${commentId}`);
    replyInput.style.display = replyInput.style.display === 'none' ? 'block' : 'none';
}

async function postReply(postId, commentId) {
    if (!currentUser) {
        showToast('Please sign in to reply', 'error');
        return;
    }
    
    const replyInput = document.getElementById(`reply-input-${postId}-${commentId}`);
    const input = replyInput.querySelector('input');
    const content = input.value.trim();
    
    if (!content) {
        showToast('Please write a reply', 'error');
        return;
    }
    
    try {
        const result = await backend.addReply(commentId, postId, currentUser.id, content);
        
        if (result.success) {
            showToast('Reply added!', 'success');
            input.value = '';
            replyInput.style.display = 'none';
            
            // Reload comments
            await loadComments(postId);
        }
    } catch (error) {
        console.error('Error posting reply:', error);
        showToast('Failed to post reply', 'error');
    }
}

// =========== FOLLOW SYSTEM ===========
async function toggleFollow(event, userId) {
    event.stopPropagation();
    
    if (!currentUser) {
        showToast('Please sign in to follow users', 'error');
        showLogin();
        return;
    }
    
    try {
        const result = await backend.followUser(currentUser.id, userId);
        
        if (result.success) {
            const button = event.target;
            button.textContent = result.followed ? 'Following' : 'Follow';
            button.style.background = result.followed ? 
                'linear-gradient(135deg, #667eea, #764ba2)' : 
                'rgba(255, 255, 255, 0.1)';
            
            showToast(result.message, 'success');
            
            // Update community data
            await loadCommunityData();
        }
    } catch (error) {
        console.error('Error following user:', error);
        showToast('Failed to follow user', 'error');
    }
}

// =========== USER PROFILES ===========
function showUserProfile(userId) {
    const user = backend.getUserById(userId);
    if (!user) return;
    
    const userPosts = backend.getPostsByUser(userId);
    const isFollowing = currentUser ? backend.isFollowing(currentUser.id, userId) : false;
    
    dom.profileModal.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">
                <i class="fas fa-user"></i>
                User Profile
            </h2>
            <button class="close-modal" onclick="closeModal('profileModal')">×</button>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="profile-avatar-large">${user.avatar}</div>
            <h2 style="margin: 15px 0 5px; color: #333;">${user.name}</h2>
            <p style="color: #666; margin-bottom: 15px;">
                <i class="fas fa-paw"></i> Pet: ${user.petName || 'Not specified'}
            </p>
            
            ${user.bio ? `<p style="color: #666; margin-bottom: 20px;">${user.bio}</p>` : ''}
            
            <div style="display: flex; justify-content: center; gap: 30px; margin: 20px 0;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #667eea;">${user.postCount || 0}</div>
                    <div style="font-size: 14px; color: #666;">Posts</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #667eea;">${user.followers || 0}</div>
                    <div style="font-size: 14px; color: #666;">Followers</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #667eea;">${user.following || 0}</div>
                    <div style="font-size: 14px; color: #666;">Following</div>
                </div>
            </div>
            
            ${currentUser && currentUser.id !== userId ? `
                <button class="auth-btn" onclick="toggleFollowProfile('${userId}', this)" 
                        style="margin: 20px auto; display: block;">
                    <i class="fas fa-${isFollowing ? 'user-check' : 'user-plus'}"></i>
                    ${isFollowing ? 'Following' : 'Follow'}
                </button>
            ` : ''}
        </div>
        
        <div>
            <h3 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid rgba(0,0,0,0.1); padding-bottom: 10px;">
                <i class="fas fa-newspaper"></i> Recent Posts
            </h3>
            
            ${userPosts.length > 0 ? 
                userPosts.slice(0, 5).map(post => `
                    <div style="background: rgba(102, 126, 234, 0.05); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="color: #333; margin-bottom: 8px;">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</div>
                        <div style="font-size: 12px; color: #666;">
                            <i class="far fa-clock"></i> ${getTimeAgo(new Date(post.createdAt))} • 
                            <i class="fas fa-heart" style="color: #ff6b6b;"></i> ${post.likes} • 
                            <i class="fas fa-comment" style="color: #667eea;"></i> ${post.comments}
                        </div>
                    </div>
                `).join('') : 
                '<p style="text-align: center; color: #666; padding: 20px;">No posts yet</p>'
            }
        </div>
    `;
    
    showModal('profileModal');
}

async function toggleFollowProfile(userId, button) {
    if (!currentUser) return;
    
    try {
        const result = await backend.followUser(currentUser.id, userId);
        
        if (result.success) {
            const icon = button.querySelector('i');
            button.innerHTML = `
                <i class="fas fa-${result.followed ? 'user-check' : 'user-plus'}"></i>
                ${result.followed ? 'Following' : 'Follow'}
            `;
            showToast(result.message, 'success');
            
            // Update profile stats
            showUserProfile(userId);
            await loadCommunityData();
        }
    } catch (error) {
        console.error('Error following user:', error);
        showToast('Failed to follow user', 'error');
    }
}

// =========== EMOJI PICKER ===========
function showEmojiPicker() {
    const emojiGrid = document.getElementById('emojiGrid');
    emojiGrid.innerHTML = '';
    
    // Emoji categories
    const emojis = {
        all: ['😀', '😂', '🥰', '😎', '😍', '🤩', '😜', '🤗', '😊', '😇', '🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹', '🐾', '🥩', '🍖', '🥕', '🍎', '🌿', '🌳', '🌸', '🌞', '🌈'],
        animals: ['🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹', '🐾', '🦮', '🐕', '🐈', '🐇', '🐁', '🦔'],
        faces: ['😀', '😂', '🥰', '😎', '😍', '🤩', '😜', '🤗', '😊', '😇', '😉', '😋', '😘', '😚', '🤪', '😝'],
        food: ['🥩', '🍖', '🥕', '🍎', '🍗', '🥓', '🥚', '🍪', '🍩', '🥛', '🍼', '🍎', '🍌', '🍇'],
        nature: ['🌿', '🌳', '🌸', '🌞', '🌈', '☀️', '🌧️', '❄️', '🌊', '🏞️', '🌻', '🌺', '🍃']
    };
    
    // Display all emojis initially
    emojis.all.forEach(emoji => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.textContent = emoji;
        emojiItem.onclick = () => insertEmoji(emoji);
        emojiGrid.appendChild(emojiItem);
    });
    
    showModal('emojiModal');
}

function showEmojiCategory(category) {
    const emojiGrid = document.getElementById('emojiGrid');
    const categoryBtns = document.querySelectorAll('.emoji-category-btn');
    
    // Update active button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Emoji categories (same as above)
    const emojis = {
        all: ['😀', '😂', '🥰', '😎', '😍', '🤩', '😜', '🤗', '😊', '😇', '🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹', '🐾', '🥩', '🍖', '🥕', '🍎', '🌿', '🌳', '🌸', '🌞', '🌈'],
        animals: ['🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹', '🐾', '🦮', '🐕', '🐈', '🐇', '🐁', '🦔'],
        faces: ['😀', '😂', '🥰', '😎', '😍', '🤩', '😜', '🤗', '😊', '😇', '😉', '😋', '😘', '😚', '🤪', '😝'],
        food: ['🥩', '🍖', '🥕', '🍎', '🍗', '🥓', '🥚', '🍪', '🍩', '🥛', '🍼', '🍎', '🍌', '🍇'],
        nature: ['🌿', '🌳', '🌸', '🌞', '🌈', '☀️', '🌧️', '❄️', '🌊', '🏞️', '🌻', '🌺', '🍃']
    };
    
    emojiGrid.innerHTML = '';
    emojis[category].forEach(emoji => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.textContent = emoji;
        emojiItem.onclick = () => insertEmoji(emoji);
        emojiGrid.appendChild(emojiItem);
    });
}

function insertEmoji(emoji) {
    const textarea = dom.postContent;
    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    
    textarea.value = text.substring(0, cursorPos) + emoji + text.substring(cursorPos);
    textarea.focus();
    textarea.selectionStart = cursorPos + emoji.length;
    textarea.selectionEnd = cursorPos + emoji.length;
    
    // Update character count
    updateCharCount();
    
    closeModal('emojiModal');
}

// =========== UTILITY FUNCTIONS ===========
function updateCharCount() {
    const count = dom.postContent.value.length;
    dom.charCount.textContent = count;
    
    if (count > 450) {
        dom.charCount.style.color = '#ff6b6b';
    } else if (count > 400) {
        dom.charCount.style.color = '#feca57';
    } else {
        dom.charCount.style.color = 'white';
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + 'y ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + 'mo ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + 'd ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + 'h ago';
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + 'm ago';
    
    return Math.floor(seconds) + 's ago';
}

function formatPostContent(content) {
    // Convert URLs to links
    let formatted = content.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="color: #667eea; text-decoration: underline;">$1</a>'
    );
    
    // Convert hashtags
    formatted = formatted.replace(
        /#(\w+)/g,
        '<span style="color: #764ba2; font-weight: bold;" onclick="searchByTag(\'#$1\')">#$1</span>'
    );
    
    return formatted;
}

function searchByTag(tag) {
    const input = dom.postContent;
    input.value = input.value + ' ' + tag;
    input.focus();
    updateCharCount();
}

function addLocation() {
    if (navigator.geolocation) {
        showToast('Getting your location...', 'info');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                showToast('Location added!', 'success');
                // In a real app, you would reverse geocode to get location name
            },
            () => {
                showToast('Unable to get location', 'error');
            }
        );
    } else {
        showToast('Geolocation not supported', 'error');
    }
}

function addTag() {
    const tag = prompt('Enter a tag (without #):');
    if (tag) {
        const input = dom.postContent;
        input.value = input.value + ' #' + tag.trim().replace(/#/g, '');
        input.focus();
        updateCharCount();
    }
}

function sharePost(postId) {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (!postElement) return;
    
    const postContent = postElement.querySelector('.post-content').textContent;
    const user = postElement.querySelector('.post-user-info h3').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: 'Check out this post on PetCare Community',
            text: `${user}: ${postContent.substring(0, 100)}...`,
            url: window.location.href + '?post=' + postId
        }).then(() => {
            // Update share count
            const sharesElement = postElement.querySelector('.post-stats .stat:nth-child(3) span');
            let shares = parseInt(sharesElement.textContent) || 0;
            sharesElement.textContent = shares + 1;
            
            showToast('Post shared successfully!', 'success');
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${user}: ${postContent}\n\n${window.location.href}?post=${postId}`);
        showToast('Link copied to clipboard!', 'success');
    }
}

function openMediaViewer(url, type) {
    // In a real app, you would open a modal with the media
    window.open(url, '_blank');
}

function updateCommunityData() {
    if (currentUser) {
        loadCommunityData();
    }
}

function showToast(message, type = 'info') {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    dom.toastMessage.textContent = message;
    dom.toast.className = `toast ${type}`;
    dom.toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span id="toastMessage">${message}</span>
    `;
    
    dom.toast.classList.add('show');
    
    setTimeout(() => {
        dom.toast.classList.remove('show');
    }, 3000);
}

function showLoading() {
    dom.loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    dom.loadingOverlay.style.display = 'none';
}

// =========== EVENT LISTENERS SETUP ===========
function setupEventListeners() {
    // Navigation
    dom.loginBtn.addEventListener('click', () => showModal('loginModal'));
    dom.logoutBtn.addEventListener('click', handleLogout);
    
    // Post content character count
    dom.postContent.addEventListener('input', updateCharCount);
    
    // Enter key to submit post (Ctrl+Enter)
    dom.postContent.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            createPost();
        }
    });
    
    // Close modals on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('loginModal');
            closeModal('registerModal');
            closeModal('emojiModal');
            closeModal('profileModal');
        }
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === dom.loginModal) closeModal('loginModal');
        if (e.target === dom.registerModal) closeModal('registerModal');
        if (e.target === dom.emojiModal) closeModal('emojiModal');
        if (e.target === dom.profileModal) closeModal('profileModal');
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function(e) {
            const password = e.target.value;
            const strengthMeter = document.querySelector('.strength-meter');
            const strengthLabel = document.querySelector('.strength-label');
            
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            strengthMeter.className = 'strength-meter';
            if (password.length === 0) {
                strengthLabel.textContent = '';
            } else if (strength <= 1) {
                strengthMeter.classList.add('weak');
                strengthLabel.textContent = 'Weak';
                strengthLabel.style.color = '#ff6b6b';
            } else if (strength <= 2) {
                strengthMeter.classList.add('medium');
                strengthLabel.textContent = 'Medium';
                strengthLabel.style.color = '#feca57';
            } else {
                strengthMeter.classList.add('strong');
                strengthLabel.textContent = 'Strong';
                strengthLabel.style.color = '#51cf66';
            }
        });
    }
}

// =========== HELPER MODAL FUNCTIONS ===========
function showForgotPassword() {
    alert('Forgot password feature coming soon!\n\nFor now, you can use these test accounts:\n\njohn@example.com / password123\njane@example.com / password123\nmike@example.com / password123');
}

function showTerms() {
    alert('TERMS OF SERVICE\n\nWelcome to PetCare Community!\n\n1. Be respectful to all members\n2. No spam or self-promotion\n3. Keep content pet-related\n4. Report inappropriate content\n5. Have fun and help each other!\n\nBy using our service, you agree to these terms.');
}

function showPrivacy() {
    alert('PRIVACY POLICY\n\nYour privacy is important to us:\n\n1. We store your data securely\n2. We never sell your information\n3. You control your data\n4. We use encryption\n5. You can delete your account anytime\n\nQuestions? Contact us at privacy@petcare.com');
}

// Initialize the app
window.addEventListener('load', initializeApp);