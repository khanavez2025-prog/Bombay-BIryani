document
.getElementById("bookingForm")
.addEventListener("submit", function(e){

e.preventDefault();

let name =
document.getElementById("name").value;

let phone =
document.getElementById("phone").value;

let eventType =
document.getElementById("event").value;

let guests =
document.getElementById("guests").value;

let message =
document.getElementById("message").value;

let whatsappMessage =
`New Booking

Name: ${name}
Phone: ${phone}
Event: ${eventType}
Guests: ${guests}

Details:
${message}`;

window.open(
`https://wa.me/917304650214?text=${encodeURIComponent(whatsappMessage)}`,
"_blank"
);

});