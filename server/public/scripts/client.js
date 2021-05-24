console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    //click listeners
    
    //create a click listener that will add user input with the 'Add Joke' button
    $('#addJokeButton').on('click', addJoke)


    //call on function to show jokes upon document loading
    getDemJokes();



}

//create a global object that will include the person, the question, and the punchline
const theJoker = {

};

//create a function that will add a joke when the user clicks the 'Add Joke' button
function addJoke () {
    //testing the click listener
    console.log('Jokes on Jokes');
    //need to take in user input
    theJoker.whoseJoke = $('#whoseJokeIn').val(),
    theJoker.jokeQuestion = $('#questionIn').val(),
    theJoker.punchLine = $('#punchlineIn').val(),
    //test that it took in the input
    console.log(theJoker);

    //need to POST the user input to the server
    $.ajax({
        url: '/jokes',
        method: 'POST',
        data: theJoker
    }).then(response => {
        console.log(response);
    })
    getDemJokes();
}

//need to create a GET request to recieve the stored data on the server
function getDemJokes () {
//need to create an AJAX request
$.ajax({
    url: '/jokes',
    method: 'GET'
}).then(response => {
    //log the reponse to make sure it has been received
    console.log('Display jokes', response);
    //create a loop to loop through the array and append each joke object onto the DOM
    for (let joke of response) {
        //need to empty the DOM
        // $('#outputDiv').empty();
        //need to append items
        $('#outputDiv').append(`<ul>
        <li>Person: ${joke.whoseJoke}</li>
        <li>Question: ${joke.jokeQuestion}</li>
        <li>Zinger:${joke.punchLine}</li>
        `)
    }
})
}