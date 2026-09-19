// ========================================
// 🌈 CUTIE MEDIA - JAVASCRIPT
// ========================================


// ========================================
// ❤️ LIKE POST
// ========================================

function likePost(button) {

    const count = button.querySelector(".like-count");

    if (!count) return;

    let likes = parseInt(count.innerText) || 0;

    if (button.classList.contains("liked")) {

        likes--;

        button.classList.remove("liked");

        button.innerHTML =
            "❤️ Like <span class='like-count'>" + likes + "</span>";

    } else {

        likes++;

        button.classList.add("liked");

        button.innerHTML =
            "💖 Liked <span class='like-count'>" + likes + "</span>";
    }
}


// ========================================
// 💬 SHOW COMMENT
// ========================================

function showCommentBox(button) {

    const post = button.closest(".social-post");

    if (!post) return;

    const input = post.querySelector(".comment-input");

    if (input) {
        input.focus();
    }
}


// ========================================
// 💬 SEND COMMENT
// ========================================

function sendComment(button) {

    const post = button.closest(".social-post");

    if (!post) return;

    const input = post.querySelector(".comment-input");

    if (!input) return;

    const text = input.value.trim();

    if (text === "") return;

    let commentsBox = post.querySelector(".comments-box");

    if (!commentsBox) {

        commentsBox = document.createElement("div");

        commentsBox.className = "comments-box";

        post.appendChild(commentsBox);
    }

    const savedAccount =
        localStorage.getItem("cutieAccount");

    let account = {
        name: "User",
        username: "username"
    };

    if (savedAccount) {

        try {
            account = JSON.parse(savedAccount);
        } catch (error) {
            console.log("Account error");
        }
    }

    const photo =
        localStorage.getItem("cutieProfilePhoto") ||
        "cutie-media-icon.png";

    const comment = document.createElement("div");

    comment.className = "comment-item";

    comment.innerHTML = `
        <img src="${photo}"
             class="comment-photo"
             alt="Profile">

        <div class="comment-content">

            <strong>${account.name}</strong>

            <small>@${account.username}</small>

            <p>${text}</p>

        </div>
    `;

    commentsBox.appendChild(comment);

    input.value = "";
}


// ========================================
// 📤 SHARE POST
// ========================================

function sharePost(button) {

    const post = button.closest(".social-post");

    if (!post) return;

    const textElement =
        post.querySelector(".post-text");

    const text =
        textElement
            ? textElement.innerText
            : "Check out this post on Cutie Media!";

    if (navigator.share) {

        navigator.share({
            title: "Cutie Media",
            text: text
        }).catch(function () {});

    } else {

        alert("📤 Share: " + text);
    }
}


// ========================================
// 📝 CREATE POST
// ========================================

function createPost() {

    const postText =
        document.getElementById("postText");

    const postPhoto =
        document.getElementById("postPhoto");

    const posts =
        document.getElementById("posts");

    if (!postText || !posts) return;

    const text =
        postText.value.trim();

    const photoFile =
        postPhoto
            ? postPhoto.files[0]
            : null;

    if (text === "" && !photoFile) {

        alert("Please write something or choose a photo!");

        return;
    }

    const savedAccount =
        localStorage.getItem("cutieAccount");

    let account = {
        name: "User",
        username: "username"
    };

    if (savedAccount) {

        try {
            account = JSON.parse(savedAccount);
        } catch (error) {
            console.log("Account error");
        }
    }

    const profilePhoto =
        localStorage.getItem("cutieProfilePhoto") ||
        "cutie-media-icon.png";

    const post =
        document.createElement("article");

    post.className = "social-post";

    post.innerHTML = `

        <div class="post-header">

            <img src="${profilePhoto}" alt="Profile">

            <div>

                <strong>👤 ${account.name}</strong>

                <small>
                    @${account.username} · Just now
                </small>

            </div>

            <span class="more">•••</span>

        </div>

        ${
            text !== ""
            ? `<p class="post-text">${text}</p>`
            : ""
        }

        <div class="post-photo-container"></div>

        <div class="post-actions">

            <button onclick="likePost(this)">
                ❤️ Like
                <span class="like-count">0</span>
            </button>

            <button onclick="showCommentBox(this)">
                💬 Comment
            </button>

            <button onclick="sharePost(this)">
                📤 Share
            </button>

        </div>

        <div class="comment-input-box">

            <img
                src="${profilePhoto}"
                class="comment-input-photo"
                alt="Profile">

            <input
                type="text"
                class="comment-input"
                placeholder="Write a comment...">

            <button onclick="sendComment(this)">
                ➤
            </button>

        </div>
    `;

    posts.prepend(post);

    if (photoFile) {

        const imageURL =
            URL.createObjectURL(photoFile);

        const image =
            document.createElement("img");

        image.src = imageURL;

        image.className = "post-photo";

        const container =
            post.querySelector(".post-photo-container");

        if (container) {
            container.appendChild(image);
        }
    }

    postText.value = "";

    if (postPhoto) {
        postPhoto.value = "";
    }
}


// ========================================
// 🎬 REELS
// ========================================

function uploadReel() {

    const fileInput =
        document.getElementById("reelVideo");

    const container =
        document.getElementById("reelsContainer");

    if (!fileInput || !container) return;

    if (fileInput.files.length === 0) {

        alert("Please choose a video first!");

        return;
    }

    const file =
        fileInput.files[0];

    const videoURL =
        URL.createObjectURL(file);

    const video =
        document.createElement("video");

    video.src = videoURL;

    video.controls = true;

    video.style.width = "300px";

    video.style.maxWidth = "100%";

    video.style.borderRadius = "15px";

    video.style.margin = "10px";

    const emptyMessage =
        container.querySelector("p");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    container.appendChild(video);

    fileInput.value = "";

    alert("🎉 Reel uploaded!");
}


// ========================================
// 💬 CHAT
// ========================================

let currentChatUser = "";

function openChat(username) {

    username = username.trim();

    if (username === "") {

        alert("Please enter a username.");

        return;
    }

    currentChatUser = username;

    const chatWith =
        document.getElementById("chatWith");

    if (chatWith) {

        chatWith.innerText =
            "💬 Chat with @" + username;
    }

    loadMessages();
}


function loadMessages() {

    const messages =
        document.getElementById("messages");

    if (!messages) return;

    messages.innerHTML = "";

    const key =
        "chat_" + currentChatUser;

    const savedMessages =
        JSON.parse(localStorage.getItem(key)) || [];

    savedMessages.forEach(function(message) {

        const p =
            document.createElement("p");

        p.innerText =
            "You: " + message;

        messages.appendChild(p);
    });
}


function sendMessage() {

    const input =
        document.getElementById("messageInput");

    if (!input) return;

    if (currentChatUser === "") {

        alert("Select a user first.");

        return;
    }

    const message =
        input.value.trim();

    if (message === "") return;

    const key =
        "chat_" + currentChatUser;

    const messages =
        JSON.parse(localStorage.getItem(key)) || [];

    messages.push(message);

    localStorage.setItem(
        key,
        JSON.stringify(messages)
    );

    input.value = "";

    loadMessages();
}


// ========================================
// 🛒 SHOPPING CART
// ========================================

let cart = [];

function addToCart(product, price) {

    let item =
        cart.find(function(item) {

            return item.product === product;

        });

    if (item) {

        item.quantity++;

    } else {

        cart.push({

            product: product,

            price: price,

            quantity: 1

        });
    }

    updateCart();
    const cartCount =
    document.getElementById("cartCount");

if (cartCount) {
    cartCount.innerText =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
}

    alert(
        "🛒 " + product + " added to cart!"
    );
}


function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;
    const cartCount =
    document.getElementById("cartCount");

if (cartCount) {
    cartCount.innerText =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
}

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        total +=
            item.price * item.quantity;

        const div =
            document.createElement("div");

        div.innerHTML = `

            🛍️ ${item.product}

            - ₹${item.price * item.quantity}

            <br>

            <button onclick="changeQuantity(${index}, -1)">
                −
            </button>

            ${item.quantity}

            <button onclick="changeQuantity(${index}, 1)">
                +
            </button>

            <button onclick="removeItem(${index})">
                🗑️
            </button>

            <hr>
        `;

        cartItems.appendChild(div);
    });

    if (cart.length === 0) {

        cartItems.innerText =
            "Cart is empty.";
    }

    cartTotal.innerText =
        "Total: ₹" + total;
}


function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }

    updateCart();
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


function showCart() {

    const cartBox =
        document.getElementById("cartBox");

    if (cartBox) {

        cartBox.scrollIntoView({
            behavior: "smooth"
        });
    }

    updateCart();
}


// ========================================
// 🛍️ OLD ORDER FUNCTION
// ========================================

function placeOrder() {

    const product =
        document.getElementById("product");

    const quantity =
        document.getElementById("quantity");

    if (!product || !quantity) return;

    const selectedProduct =
        product.value;

    const selectedQuantity =
        quantity.value;

    if (selectedQuantity < 1) {

        alert("Please choose a valid quantity.");

        return;
    }

    alert(
        "🎉 Order placed successfully!\n\n" +
        "Product: " +
        selectedProduct +
        "\nQuantity: " +
        selectedQuantity
    );
}


// ========================================
// 👤 PROFILE - EDIT
// ========================================

function openEditProfile() {

    const box =
        document.getElementById("editProfileBox");

    if (!box) {

        alert("Edit Profile box was not found.");

        return;
    }

    const profileName =
        document.getElementById("profileName");

    const editName =
        document.getElementById("editName");

    if (profileName && editName) {

        editName.value =
            profileName.innerText
                .replace("👤 ", "")
                .replace("👸 ", "");
    }

    box.style.display = "block";
}


function closeEditProfile() {

    const box =
        document.getElementById("editProfileBox");

    if (box) {

        box.style.display = "none";
    }
}


function saveProfile() {

    const editName =
        document.getElementById("editName");

    const editBio =
        document.getElementById("editBio");

    const profileName =
        document.getElementById("profileName");

    if (!editName || !profileName) return;

    const newName =
        editName.value.trim();

    if (newName === "") {

        alert("Please enter your name!");

        return;
    }

    profileName.innerText =
        "👤 " + newName;

    const savedAccount =
        localStorage.getItem("cutieAccount");

    if (savedAccount) {

        try {

            const account =
                JSON.parse(savedAccount);

            account.name =
                newName;

            if (editBio) {

                account.bio =
                    editBio.value.trim();
            }

            localStorage.setItem(
                "cutieAccount",
                JSON.stringify(account)
            );

        } catch (error) {

            console.log("Profile save error");
        }
    }

    closeEditProfile();

    alert("✨ Profile updated!");
}


// ========================================
// 📷 CHANGE PROFILE PICTURE
// ========================================

function changeProfilePicture(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload =
        function(event) {

            const imageData =
                event.target.result;

            localStorage.setItem(
                "cutieProfilePhoto",
                imageData
            );

            const profilePicture =
                document.getElementById("profilePicture");

            if (profilePicture) {

                profilePicture.src =
                    imageData;
            }

            const photos =
                document.querySelectorAll(
                    ".social-home .post-header img, .create-top img"
                );

            photos.forEach(function(image) {

                image.src = imageData;
            });
        };

    reader.readAsDataURL(file);
}


// ========================================
// 🌈 LOAD ACCOUNT
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedAccount =
            localStorage.getItem("cutieAccount");

        if (!savedAccount) return;

        let account;

        try {

            account =
                JSON.parse(savedAccount);

        } catch (error) {

            console.log("Account data error");

            return;
        }


        // PROFILE

        const profileTitle =
            document.getElementById("profileTitle");

        const profileName =
            document.getElementById("profileName");

        const profileUsername =
            document.getElementById("profileUsername");


        if (profileTitle) {

            profileTitle.innerText =
                "👋 Welcome " +
                account.name +
                "!";
        }


        if (profileName) {

            profileName.innerText =
                "👤 " +
                account.name;
        }


        if (profileUsername) {

            profileUsername.innerText =
                "@" +
                account.username;
        }


        // PROFILE PHOTO

        const savedPhoto =
            localStorage.getItem(
                "cutieProfilePhoto"
            );

        const profilePicture =
            document.getElementById(
                "profilePicture"
            );


        if (savedPhoto && profilePicture) {

            profilePicture.src =
                savedPhoto;
        }


        // UPDATE HOME PHOTOS

        if (savedPhoto) {

            const homePhotos =
                document.querySelectorAll(
                    ".social-home .post-header img, .create-top img"
                );

            homePhotos.forEach(function(image) {

                image.src = savedPhoto;
            });
        }


        // HOME WELCOME

        const homeWelcome =
            document.getElementById(
                "homeWelcome"
            );

        const homeWelcomeUsername =
            document.getElementById(
                "homeWelcomeUsername"
            );


        if (homeWelcome) {

            homeWelcome.innerText =
                "👋 Welcome, " +
                account.name +
                "!";
        }


        if (homeWelcomeUsername) {

            homeWelcomeUsername.innerText =
                "@" +
                account.username;
        }

    }
);
// ⚡ BUY NOW

function buyNow(product, price) {

    alert(
        "⚡ Buy Now\n\n" +
        "Product: " + product +
        "\nPrice: ₹" + price +
        "\n\n✅ Ready to place order!"
    );
}
function showNotifications() {
    alert(
        "🔔 Notifications\n\n" +
        "💗 Someone liked your post.\n" +
        "💬 You received a comment.\n" +
        "📩 You received a message.\n" +
        "🛍️ Your order was updated."
    );
}