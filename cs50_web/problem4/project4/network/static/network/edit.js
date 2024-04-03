function edit(id) {
    document.querySelector(`#post-view-${id}`).style.display = "none";
    document.querySelector(`#edit-view-${id}`).style.display = "block";

    const edit_post = document.querySelector(`#edit-post-${id}`)
    const save_btn = document.querySelector(`#save-post-${id}`)

    save_btn.addEventListener('click', () => {

        new_post = edit_post.value;
        fetch(`/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post: new_post
            })
          })

        document.querySelector(`#post-${id}`).innerHTML = new_post;
        document.querySelector(`#post-view-${id}`).style.display = "block";
        document.querySelector(`#edit-view-${id}`).style.display = "none";
    })
}

async function like(id) {

    await fetch(`/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            likes: 'liked'
        })
    });

    fetch(`/edit/${id}`)
    .then(response => response.json())
    .then(post => {

        document.querySelector(`#like-count-${id}`).innerHTML = post.like_count;
    })
}
