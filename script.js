// This is AI to stop console.logs
if (window.location.hostname !== 'localhost' && window.location.hhostname !== '127.0.0.1') {
    console.log = function() {};
}
