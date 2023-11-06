const commentFormHandler = async(event) => {
    event.preventDefault();

    // grab comment and blogpost_id
    const comment = document.querySelector('.comment-input').value.trim();
    const blogpostId = event.target.getAttribute('blogpost-id');

    // if comment
    if(comment) {
        // fetch 
        const response = await fetch(`/api/blogpost/${blogpostId}`, {
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok){
            document.location.replace(`/blogpost/${blogpostId}`);
        } else {
            alert('comment failed');
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);