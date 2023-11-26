const blogpostFormHandler = async(event) => {
    event.preventDefault();
    
    // get data
    const title = document.querySelector('#newpost-title').value.trim();
    const content = document.querySelector('#newpost-content').value.trim();

    console.log(title);
    console.log(content);

    // fetch
    if(title && content) {
        const response = await fetch('/api/blogpost', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('post failed');
        }
    }
};

document.querySelector('#newpost-form').addEventListener('submit', blogpostFormHandler);

// const editpostFromHandler = async(event) => {
//     event.preventDefault();
// }

// document.querySelector('.edit-button').addEventListener('click', () => {
//     const editForm = document.querySelector('#editpost-form');

//     if(editForm.style.display === 'none'){
//         editForm.style.display = 'block'
//     } 
//     else {
//         editForm.style.display = 'none'
//     }
// })