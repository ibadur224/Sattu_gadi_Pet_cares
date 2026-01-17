// =========== LOCAL STORAGE BACKEND SYSTEM ===========
class CommunityBackend {
    constructor() {
        this.USERS_KEY = 'petcare_community_users_v3';
        this.POSTS_KEY = 'petcare_community_posts_v3';
        this.LIKES_KEY = 'petcare_community_likes_v3';
        this.COMMENTS_KEY = 'petcare_community_comments_v3';
        this.CURRENT_USER_KEY = 'petcare_current_user';
        this.MEDIA_KEY = 'petcare_community_media_v3';
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
                    postCount: 3,
                    likeCount: 15
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
                    postCount: 4,
                    likeCount: 20
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
                    postCount: 5,
                    likeCount: 30
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
                        url: '../resourses/dog.png',
                        filename: 'dog.png'
                    },
                    likes: 12,
                    comments: 3,
                    tags: ['#HappyPet', '#DogLife'],
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    userId: users[1].id,
                    content: 'Whiskers learned a new trick today! So proud of my clever kitty! 😺 #CatTraining #SmartCat',
                    media: {
                        type: 'image',
                        url: '../resourses/cat.png',
                        filename: 'cat.png'
                    },
                    likes: 15,
                    comments: 5,
                    tags: ['#CatTraining', '#SmartCat'],
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    userId: users[2].id,
                    content: 'Training tips for a hyperactive puppy? Max just won\'t sit still! Any advice is appreciated. 🐶 #TrainingTips #Help',
                    media: null,
                    likes: 8,
                    comments: 7,
                    tags: ['#TrainingTips', '#Help'],
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    userId: users[0].id,
                    content: 'Check out this cute bunny photo I found! Makes me want to get a rabbit too! 🐰 #CuteAnimals #Rabbit',
                    media: {
                        type: 'image',
                        url: '../resourses/rabbit.png',
                        filename: 'rabbit.png'
                    },
                    likes: 18,
                    comments: 6,
                    tags: ['#CuteAnimals', '#Rabbit'],
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    userId: users[1].id,
                    content: 'What\'s your pet\'s favorite treat? Looking for new recommendations! 🍖 #PetFood #Recommendations',
                    media: null,
                    likes: 10,
                    comments: 8,
                    tags: ['#PetFood', '#Recommendations'],
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
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
        if (!localStorage.getItem(this.MEDIA_KEY)) {
            localStorage.setItem(this.MEDIA_KEY, JSON.stringify({}));
        }
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // =========== USER MANAGEMENT ===========
    async authenticateUser(email, password) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        // Update user status
        user.isOnline = true;
        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);
        
        // Store current user (without password)
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        
        return { 
            success: true, 
            message: 'Login successful',
            user: userWithoutPassword
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
            likeCount: 0
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
    async createPost(userId, content, media = null, tags = []) {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        
        const newPost = {
            id: this.generateId(),
            userId,
            content,
            media,
            likes: 0,
            comments: 0,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
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
    
    getPosts(limit = 10, offset = 0) {
        let posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        // Sort by newest first
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return posts.slice(offset, offset + limit);
    }
    
    getTotalPosts() {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        return posts.length;
    }
    
    getTotalLikes() {
        const posts = JSON.parse(localStorage.getItem(this.POSTS_KEY) || '[]');
        return posts.reduce((total, post) => total + (post.likes || 0), 0);
    }
    
    getTotalUsers() {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        return users.length;
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
            createdAt: new Date().toISOString()
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
    
    getComments(postId) {
        const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '{}');
        const postKey = `post_${postId}`;
        return comments[postKey] || [];
    }
    
    // =========== MEDIA HANDLING ===========
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                reject(new Error('Please select an image file'));
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                reject(new Error('Image must be less than 5MB'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const mediaId = this.generateId();
                const timestamp = Date.now();
                const filename = `user_${timestamp}_${file.name}`;
                
                // In a real app, you would upload to server
                // For demo, we'll store in localStorage as data URL
                const mediaData = {
                    id: mediaId,
                    type: 'image',
                    data: e.target.result,
                    filename: filename,
                    originalName: file.name,
                    size: file.size,
                    uploadedAt: new Date().toISOString(),
                    userId: this.getCurrentUser()?.id
                };
                
                // Store in media storage
                const mediaStorage = JSON.parse(localStorage.getItem(this.MEDIA_KEY) || '{}');
                mediaStorage[mediaId] = mediaData;
                localStorage.setItem(this.MEDIA_KEY, JSON.stringify(mediaStorage));
                
                resolve({
                    success: true,
                    mediaId,
                    url: e.target.result, // Data URL for immediate display
                    filename: filename,
                    path: `user_post_photos/${filename}` // Simulated path
                });
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read image file'));
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // =========== HELPER METHODS ===========
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
let currentPage = 0;
const postsPerPage = 5;
let isLoading = false;
let selectedImage = null;

// =========== DOM ELEMENTS ===========
const dom = {
    // Navigation
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Welcome Card
    welcomeCard: document.getElementById('welcomeCard'),
    memberCount: document.getElementById('memberCount'),
    postCount: document.getElementById('postCount'),
    likeCount: document.getElementById('likeCount'),
    
    // Create Post
    createPostSection: document.getElementById('createPostSection'),
    currentUserAvatar: document.getElementById('currentUserAvatar'),
    currentUserName: document.getElementById('currentUserName'),
    postContent: document.getElementById('postContent'),
    mediaPreview: document.getElementById('mediaPreview'),
    imagePreview: document.getElementById('imagePreview'),
    previewImage: document.getElementById('previewImage'),
    charCount: document.getElementById('charCount'),
    
    // Login Prompt
    loginPrompt: document.getElementById('loginPrompt'),
    
    // Posts Feed
    postsFeed: document.getElementById('postsFeed'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    
    // Modals
    emojiModal: document.getElementById('emojiModal'),
    
    // Loading
    loadingOverlay: document.getElementById('loadingOverlay'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// =========== INITIALIZATION ===========
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    showLoading();
    
    // Check authentication
    await checkAuthStatus();
    
    // Load initial data
    await loadCommunityStats();
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
        dom.logoutBtn.style.display = 'flex';
        dom.createPostSection.style.display = 'block';
        dom.loginPrompt.style.display = 'none';
        
        // Update user info in create post
        dom.currentUserAvatar.textContent = currentUser.avatar;
        dom.currentUserName.textContent = `What's on your mind, ${currentUser.name.split(' ')[0]}?`;
        
        // Update current user as online
        backend.updateUserProfile(currentUser.id, { isOnline: true });
    } else {
        // User is not logged in
        dom.logoutBtn.style.display = 'none';
        dom.createPostSection.style.display = 'none';
        dom.loginPrompt.style.display = 'block';
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        backend.logout();
        showToast('Logged out successfully', 'success');
        checkAuthStatus();
        loadCommunityStats();
        loadPosts();
    }
}

// =========== COMMUNITY FUNCTIONS ===========
async function loadCommunityStats() {
    try {
        dom.memberCount.textContent = backend.getTotalUsers();
        dom.postCount.textContent = backend.getTotalPosts();
        dom.likeCount.textContent = backend.getTotalLikes();
    } catch (error) {
        console.error('Error loading community stats:', error);
    }
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
        const newPosts = backend.getPosts(postsPerPage, currentPage * postsPerPage);
        
        if (newPosts.length > 0) {
            renderPosts(newPosts, !reset);
            currentPage++;
        }
        
        // Show/hide load more button
        const allPosts = backend.getPosts(1000, 0);
        dom.loadMoreContainer.style.display = 
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
                    <button class="auth-prompt-btn" onclick="window.location.href='../auth/sign_in.html'" style="margin: 20px auto;">
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
            dom.postsFeed.appendChild(postElement);
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
        mediaHtml = `
            <div class="post-media">
                <img src="${post.media.url}" alt="Post image" 
                     onclick="openImageModal('${post.media.url}')">
            </div>
        `;
    }
    
    // Tags HTML
    let tagsHtml = '';
    if (post.tags && post.tags.length > 0) {
        tagsHtml = `
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="post-tag" onclick="addTagToInput('${tag}')">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    postElement.innerHTML = `
        <div class="post-header">
            <div class="user-avatar-small">${user.avatar}</div>
            <div class="post-user-info">
                <h3>${user.name}</h3>
                <div class="post-time">
                    <i class="far fa-clock"></i> ${timeAgo}
                </div>
            </div>
        </div>
        
        <div class="post-content">${formatPostContent(post.content)}</div>
        
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
        </div>
        
        <div class="post-actions-buttons">
            <button class="action-btn ${hasLiked ? 'liked' : ''}" 
                    onclick="likePost('${post.id}', this.parentElement.parentElement.querySelector('.stat'))"
                    ${!currentUser ? 'disabled' : ''}>
                <i class="fas fa-heart"></i> ${hasLiked ? 'Liked' : 'Like'}
            </button>
            <button class="action-btn" onclick="focusComment('${post.id}')"
                    ${!currentUser ? 'disabled' : ''}>
                <i class="fas fa-comment"></i> Comment
            </button>
            <button class="action-btn" onclick="sharePost('${post.id}')">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
        
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            <div class="comment-input">
                <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." 
                       onkeypress="if(event.key === 'Enter') postComment('${post.id}')"
                       ${!currentUser ? 'disabled placeholder="Sign in to comment"' : ''}>
                <button class="action-btn" onclick="postComment('${post.id}')"
                        ${!currentUser ? 'disabled' : ''}>Post</button>
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
        window.location.href = '../auth/sign_in.html';
        return;
    }
    
    const content = dom.postContent.value.trim();
    if (!content && !selectedImage) {
        showToast('Please write something or add a photo to post', 'error');
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
        if (selectedImage) {
            // In a real app, you would upload to server here
            // For demo, we'll simulate upload
            media = {
                type: 'image',
                url: selectedImage.url || '../resourses/user_post_photos/default.png',
                filename: selectedImage.filename || 'user_upload.png'
            };
        }
        
        const result = await backend.createPost(
            currentUser.id,
            content,
            media,
            tags
        );
        
        if (result.success) {
            showToast('Post created successfully!', 'success');
            
            // Reset form
            dom.postContent.value = '';
            dom.charCount.textContent = '0';
            dom.charCount.className = 'char-count';
            removeMedia();
            
            // Reload posts
            await loadPosts(true);
            await loadCommunityStats();
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
    if (!currentUser) {
        showToast('Please sign in to upload photos', 'error');
        window.location.href = '../auth/sign_in.html';
        return;
    }
    
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
        const result = await backend.uploadImage(file);
        
        if (result.success) {
            selectedImage = {
                url: result.url,
                filename: result.filename,
                path: result.path
            };
            
            dom.previewImage.src = result.url;
            dom.imagePreview.style.display = 'block';
            showToast('Photo added successfully', 'success');
            
            // Save to localStorage for persistence
            const uploads = JSON.parse(localStorage.getItem('user_uploads') || '[]');
            uploads.push({
                id: backend.generateId(),
                userId: currentUser.id,
                filename: result.filename,
                url: result.url,
                uploadedAt: new Date().toISOString()
            });
            localStorage.setItem('user_uploads', JSON.stringify(uploads));
        }
    } catch (error) {
        showToast(error.message || 'Failed to upload photo', 'error');
        console.error('Image upload error:', error);
    } finally {
        hideLoading();
        event.target.value = '';
    }
}

function removeMedia() {
    selectedImage = null;
    dom.imagePreview.style.display = 'none';
    dom.previewImage.src = '';
}

// =========== LIKE SYSTEM ===========
async function likePost(postId, statElement) {
    if (!currentUser) {
        showToast('Please sign in to like posts', 'error');
        window.location.href = '../auth/sign_in.html';
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
            
            // Update community stats
            loadCommunityStats();
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
            <div class="comment-avatar">${user.avatar}</div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${user.name}</span>
                    <span class="comment-time">${timeAgo}</span>
                </div>
                <div class="comment-text">${comment.content}</div>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

async function postComment(postId) {
    if (!currentUser) {
        showToast('Please sign in to comment', 'error');
        window.location.href = '../auth/sign_in.html';
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
        window.location.href = '../auth/sign_in.html';
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

// =========== UTILITY FUNCTIONS ===========
function updateCharCount() {
    const count = dom.postContent.value.length;
    dom.charCount.textContent = count;
    
    if (count > 450) {
        dom.charCount.className = 'char-count warning';
    } else {
        dom.charCount.className = 'char-count';
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
        '<a href="$1" target="_blank" style="color: #ffd700; text-decoration: underline;">$1</a>'
    );
    
    // Convert hashtags
    formatted = formatted.replace(
        /#(\w+)/g,
        '<span style="color: #ff6b6b; font-weight: bold;">#$1</span>'
    );
    
    return formatted;
}

function addTagToInput(tag) {
    const input = dom.postContent;
    input.value = input.value + ' ' + tag;
    input.focus();
    updateCharCount();
}

function addHashtag() {
    if (!currentUser) {
        showToast('Please sign in to add tags', 'error');
        window.location.href = '../auth/sign_in.html';
        return;
    }
    
    const tag = prompt('Enter a tag (without #):');
    if (tag) {
        const input = dom.postContent;
        input.value = input.value + ' #' + tag.trim().replace(/#/g, '');
        input.focus();
        updateCharCount();
    }
}

function addEmoji() {
    if (!currentUser) {
        showToast('Please sign in to add emojis', 'error');
        window.location.href = '../auth/sign_in.html';
        return;
    }
    
    showEmojiPicker();
}

function showEmojiPicker() {
    const emojiGrid = document.getElementById('emojiGrid');
    emojiGrid.innerHTML = '';
    
    const emojis = ['😀', '😂', '🥰', '😎', '😍', '🤩', '😜', '🤗', '😊', '😇',
                   '🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹', '🐾',
                   '🥩', '🍖', '🥕', '🍎', '🍗', '🥓', '🥚',
                   '🌿', '🌳', '🌸', '🌞', '🌈', '☀️', '🌧️'];
    
    emojis.forEach(emoji => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.textContent = emoji;
        emojiItem.onclick = () => insertEmoji(emoji);
        emojiGrid.appendChild(emojiItem);
    });
    
    showModal('emojiModal');
}

function insertEmoji(emoji) {
    const textarea = dom.postContent;
    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    
    textarea.value = text.substring(0, cursorPos) + emoji + text.substring(cursorPos);
    textarea.focus();
    textarea.selectionStart = cursorPos + emoji.length;
    textarea.selectionEnd = cursorPos + emoji.length;
    
    updateCharCount();
    closeModal('emojiModal');
}

function sharePost(postId) {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (!postElement) return;
    
    const postContent = postElement.querySelector('.post-content').textContent;
    const user = postElement.querySelector('.post-user-info h3').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: 'Check out this post on Pet Community',
            text: `${user}: ${postContent.substring(0, 100)}...`,
            url: window.location.href + '?post=' + postId
        }).then(() => {
            showToast('Post shared successfully!', 'success');
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${user}: ${postContent}\n\n${window.location.href}?post=${postId}`);
        showToast('Link copied to clipboard!', 'success');
    }
}

function openImageModal(imageUrl) {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.onclick = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; background: transparent; box-shadow: none;">
            <button class="close-modal" style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.5); color: white;">×</button>
            <img src="${imageUrl}" alt="Full size" style="width: 100%; max-height: 80vh; object-fit: contain; border-radius: 10px;">
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// =========== TOAST & LOADING ===========
function showToast(message, type = 'info') {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
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
            closeModal('emojiModal');
        }
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal('emojiModal');
        }
    });
}

// Initialize the app

window.addEventListener('load', initializeApp);
