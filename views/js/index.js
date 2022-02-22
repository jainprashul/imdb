function addVote(id) {
    fetch(`/api/movies/${id}/upvote`).then(response => {
        location.reload();
    }).catch(err => {
        console.log(err);
    });
    
}

function removeVote(id) {
    fetch(`/api/movies/${id}/downvote`).then(response => {
        location.reload();
    }).catch(err => {
        console.log(err);
    });
}

