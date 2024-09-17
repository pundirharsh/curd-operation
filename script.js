let usersArray = [];
const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;

    // Create a new user object
    const user = {
        name,
        number,
        email,
        password,
        gender
    };

    // Check if we're editing or creating a new user
    const userId = form.getAttribute('data-id');
    if (userId) {
        // Update user
        updateUser(userId, user);
    } else {
        // Add new user to array
        usersArray.push(user);
    }

    // Reset form and refresh user list
    form.reset();
    form.removeAttribute('data-id');
    loadUsers();
});

// Load users and display in the list
function loadUsers() {
    userList.innerHTML = ''; // Clear the list

    usersArray.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${user.name} (${user.email}, ${user.number}, ${user.gender})
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        `;
        userList.appendChild(li);
    });
}

// Edit user: fill the form with the user's details
function editUser(index) {
    const user = usersArray[index];
    document.getElementById('name').value = user.name;
    document.getElementById('number').value = user.number;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
    document.getElementById('gender').value = user.gender;

    form.setAttribute('data-id', index); // Set the index for the user being edited
}

// Update the user at the specified index
function updateUser(index, updatedUser) {
    usersArray[index] = updatedUser; // Replace user at the specified index with updated data
}

// Delete user at the specified index
function deleteUser(index) {
    usersArray.splice(index, 1); // Remove the user from the array
    loadUsers(); // Reload the list
}
